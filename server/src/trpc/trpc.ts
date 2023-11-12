import { TRPCError, initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import type { Request, Response } from "express"
import superjson from "superjson"
import { ZodError } from "zod"
import prisma from "../prisma/prisma"

type CreateContextOptions = {
  req: Request
  session: Express.Request["session"]
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    req: opts.req,
    session: opts.session,
    prisma,
  }
}

export const createTRPCContext = async (
  opts: trpcExpress.CreateExpressContextOptions
) => {
  const { req, res } = opts

  return createInnerTRPCContext({
    req,
    session: req.session,
  })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const router = t.router

export const publicProcedure = t.procedure

const checkUserAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, userId: ctx.session.userId },
    },
  })
})

export const protectedProcedure = t.procedure.use(checkUserAuth)
