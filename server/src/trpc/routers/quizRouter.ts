import prisma from "../../prisma/prisma"
import { protectedProcedure, publicProcedure, router } from "../trpc"
import z from "zod"
import { Answer, Quiz } from "@prisma/client"

const answerSchema = z.object({
  body: z
    .string()
    .min(1, "Answers must be at least 1 character long.")
    .max(500, "Answers must be less than 500 characters long."),
  correct: z.boolean(),
})

export const quizRouter = router({
  createQuiz: protectedProcedure
    .input(
      z
        .object({
          title: z
            .string()
            .min(1, "Title must be at least 1 character long.")
            .max(75, "Title must be less than 75 characters long."),
          description: z
            .string()
            .max(200, "Description must be less than 200 characters long."),
          questions: z
            .string()
            .min(1, "Questions must be at least 1 character long.")
            .max(500, "Questions must be less than 500 characters long.")
            .array()
            .min(1, "Quiz must have at least 1 question.")
            .max(20, "Quiz must not have more than 20 questions."),
          answers: z
            .array(answerSchema)
            .min(1, "Questions must have at least one answer.")
            .max(8, "Questions must not have more than 8 answers.")
            .array()
            .min(1, "Quiz must have at least 1 question.")
            .max(20, "Quiz must not have more than 20 questions."),
        })
        .refine(
          (schema) => schema.questions.length === schema.answers.length,
          "Questions and answers arrays must be the same length."
        )
        .refine(
          (schema) =>
            !schema.answers.some((array) =>
              array.every((element) => !element.correct)
            ),
          "Questions must have at least one correct answer."
        )
    )
    .mutation(async (opts) => {
      const quiz = await prisma.quiz.create({
        data: {
          title: opts.input.title,
          description: opts.input.description,
        },
      })

      opts.input.questions.forEach(async (q, i) => {
        const question = await prisma.question.create({
          data: {
            body: q,
            quizId: quiz.id,
            index: i,
          },
        })

        opts.input.answers[i].forEach(async (a, j) => {
          await prisma.answer.create({
            data: {
              quizId: quiz.id,
              questionId: question.id,
              body: a.body,
              correct: a.correct,
              index: j,
            },
          })
        })
      })
    }),
  getQuiz: publicProcedure
    .input(z.object({ quizId: z.string().min(1, "Quiz ID required.") }))
    .query(async (opts) => {
      const quizInfo = await getQuizInfo(opts.input.quizId)

      const questions = await prisma.question.findMany({
        where: { quizId: opts.input.quizId },
        orderBy: {
          index: "asc",
        },
      })

      if (!questions.length) {
        return null
      }

      const answers: Answer[][] = []

      for (const q of questions) {
        const q_answers = await prisma.answer.findMany({
          where: { questionId: q.id },
          orderBy: {
            index: "asc",
          },
        })

        answers.push(q_answers)
      }

      return {
        quizInfo,
        questions,
        answers,
      }
    }),
  getQuizInfo: publicProcedure
    .input(z.object({ quizId: z.string().min(1, "Quiz ID required.") }))
    .query(async (opts) => {
      const quizInfo = await getQuizInfo(opts.input.quizId)

      return quizInfo
    }),
  getQuizzes: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async (opts) => {
      const limit = opts.input.limit ?? 5

      const quizzes = await prisma.quiz.findMany({
        take: limit + 1,
        cursor: opts.input.cursor ? { id: opts.input.cursor } : undefined,
        orderBy: {
          created_at: "desc",
        },
      })

      let nextCursor = undefined

      if (quizzes.length > limit) {
        const nextQuiz = quizzes.pop()
        nextCursor = { id: nextQuiz!.id }
      }

      return {
        quizzes,
        nextCursor,
      }
    }),
})

const getQuizInfo = async (quizId: string) => {
  type QuizInfo = ({
    questionCount: number
  } & Quiz)[]

  const quizInfo: QuizInfo =
    await prisma.$queryRaw`SELECT a.*, CAST(COUNT(b.id) as INT) AS "questionCount" FROM "Quiz" a LEFT JOIN "Question" b on (b."quizId" = a.id) WHERE a.id = ${quizId} GROUP BY b."quizId", a.id`

  return quizInfo[0]
}
