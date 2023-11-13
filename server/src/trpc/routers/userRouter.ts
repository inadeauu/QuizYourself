import prisma from "../../../prisma/prisma"
import { publicProcedure, router } from "../trpc"
import z from "zod"

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ username: z.string().min(1, "Username required.") }))
    .query(async (opts) => {
      const user = await prisma.app_user.findUnique({
        where: { username: opts.input.username },
        select: {
          id: true,
          username: true,
          created_at: true,
        },
      })

      return user
    }),
})
