import { router } from "../trpc"
import { authRouter } from "./authRouter"
import { quizRouter } from "./quizRouter"

export const appRouter = router({
  auth: authRouter,
  quiz: quizRouter,
})

export type AppRouter = typeof appRouter
