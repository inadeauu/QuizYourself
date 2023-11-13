import { createContext, useState } from "react"

type QuizContextType = {
  questions: string[]
  answers: Answer[][]
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>
  setAnswers: React.Dispatch<React.SetStateAction<Answer[][]>>
  addQuestion: () => void
  addAnswer: (questionNum: number) => void
  deleteQuestion: (index: number) => void
  deleteAnswer: (index: number, questionNum: number) => void
}

type QuizProviderProps = {
  children: React.ReactNode
}

export type Answer = {
  body: string
  correct: boolean
}

const initAnswer: Answer = {
  body: "",
  correct: false,
}

export const QuizContext = createContext<QuizContextType>({} as QuizContextType)

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [questions, setQuestions] = useState<string[]>([""])
  const [answers, setAnswers] = useState<Answer[][]>([[initAnswer]])

  const addQuestion = () => {
    if (questions.length >= 20) return

    setQuestions((prev) => [...prev, ""])
    setAnswers((prev) => [...prev, [initAnswer]])
  }

  const addAnswer = (questionNum: number) => {
    if (answers[questionNum].length >= 8) return

    setAnswers((prev) =>
      prev.map((ansArr, i) => {
        if (i == questionNum) {
          return [...ansArr, initAnswer]
        } else {
          return ansArr
        }
      })
    )
  }

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => {
      return prev.filter((_, i) => i !== index)
    })
    setAnswers((prev) => prev.filter((_, i) => i !== index))
  }

  const deleteAnswer = (index: number, questionNum: number) => {
    setAnswers((prev) =>
      prev.map((ansArr, i) => {
        if (i === questionNum) {
          return ansArr.filter((_, j) => j !== index)
        } else {
          return ansArr
        }
      })
    )
  }

  const value: QuizContextType = {
    questions,
    answers,
    setQuestions,
    setAnswers,
    addQuestion,
    addAnswer,
    deleteQuestion,
    deleteAnswer,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizProvider
