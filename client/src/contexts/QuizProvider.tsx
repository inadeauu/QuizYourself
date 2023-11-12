import { createContext, useState } from "react"

type QuizContextType = {
  questions: string[]
  answers: string[][]
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>
  setAnswers: React.Dispatch<React.SetStateAction<string[][]>>
  addQuestion: () => void
  deleteQuestion: (index: number) => void
}

type QuizProviderProps = {
  children: React.ReactNode
}

export const QuizContext = createContext<QuizContextType>({} as QuizContextType)

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [questions, setQuestions] = useState<string[]>([""])
  const [answers, setAnswers] = useState<string[][]>([[""]])

  const addQuestion = () => {
    setQuestions((prev) => [...prev, ""])
    setAnswers((prev) => [...prev, [""]])
  }

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => {
      return prev.filter((_, i) => i !== index)
    })
    setAnswers((prev) => prev.filter((_, i) => i !== index))
  }

  const value: QuizContextType = {
    questions,
    answers,
    setQuestions,
    setAnswers,
    addQuestion,
    deleteQuestion,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizProvider
