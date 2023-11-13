import { router } from "../trpc"
import { authRouter } from "./authRouter"
import { quizRouter } from "./quizRouter"
import { userRouter } from "./userRouter"

export const appRouter = router({
  auth: authRouter,
  quiz: quizRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
