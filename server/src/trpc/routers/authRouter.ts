import prisma from "../../prisma/prisma"
import { publicProcedure, router } from "../trpc"
import z from "zod"

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(5, "Username must be at least 5 characters long.")
          .max(12, "Username must be less than 12 characters long.")
          .refine(async (value) => {
            const username = await prisma.user.findUnique({
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
    .mutation((opts) => {}),
})
