import prisma from "../../prisma/prisma"
import { protectedProcedure, publicProcedure, router } from "../trpc"
import z from "zod"
import bcrypt from "bcrypt"
import { TRPCError } from "@trpc/server"

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(5, "Username must be at least 5 characters long.")
          .max(12, "Username must be less than 12 characters long.")
          .refine(async (value) => {
            const username = await prisma.app_user.findUnique({
              where: { username: value },
            })

            if (username) return false
            return true
          }, "Username already in use."),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long.")
          .max(64, "Password must be less than 64 characters long."),
      })
    )
    .mutation(async (opts) => {
      const hash = await bcrypt.hash(opts.input.password, 10)

      const user = await prisma.app_user.create({
        data: {
          username: opts.input.username,
          password: hash,
        },
      })

      opts.ctx.session.userId = user.id
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string().min(1, "Username required."),
        password: z.string().min(1, "Password required."),
      })
    )
    .mutation(async (opts) => {
      const user = await prisma.app_user.findUnique({
        where: { username: opts.input.username },
      })

      if (
        !user ||
        !(await bcrypt.compare(opts.input.password, user.password))
      ) {
        throw new TRPCError({
          message: "Incorrect username and/or password.",
          code: "BAD_REQUEST",
        })
      }

      opts.ctx.session.userId = user.id
    }),
  logout: protectedProcedure.mutation(async (opts) => {
    opts.ctx.req.session.destroy((err) => {
      if (err) {
        throw new TRPCError({
          message: "Error logging out.",
          code: "INTERNAL_SERVER_ERROR",
        })
      }

      opts.ctx.res.clearCookie("connect.sid")
    })
  }),
  getAuthedUser: protectedProcedure.query(async (opts) => {
    const user = await prisma.app_user.findUnique({
      where: { id: opts.ctx.session.userId },
      select: {
        id: true,
        username: true,
        created_at: true,
        updated_at: true,
      },
    })

    return user
  }),
})
