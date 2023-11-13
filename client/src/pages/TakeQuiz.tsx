import { Navigate, useParams } from "react-router-dom"
import { trpc } from "../utils/trpc"
import { ImSpinner11 } from "react-icons/im"
import { useState } from "react"
import QuizQuestion from "../components/quiz/QuizQuestion"
import moment from "moment"

const TakeQuiz = () => {
  const [quizAnswers, setQuizAnswers] = useState<number[][]>(
    new Array(20).fill(null).map(() => new Array(0))
  )
  // const [submittedQuiz, setSubmittedQuiz] = useState(false)

  console.log(quizAnswers)

  const { id } = useParams()

  const quiz = trpc.quiz.getQuiz.useQuery({ quizId: id! })

  if (quiz.isLoading) return <ImSpinner11 className="animate-spin h-16 w-16" />

  if (!quiz.data) {
    return <Navigate to="/not-found" />
  }

  const quizInfo = quiz.data.quizInfo
  const questions = quiz.data.questions
  const answers = quiz.data.answers

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{quizInfo.title}</span>
          <span className="text-sm text-neutral-600">
            Created {moment(quizInfo.created_at).fromNow()}
          </span>
        </div>
        <span>{quizInfo.description}</span>
      </div>
      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <QuizQuestion
            key={i}
            question={q.body}
            questionNum={q.index}
            answers={answers[i]}
            setQuizAnswers={setQuizAnswers}
          />
        ))}
      </div>
      <button className="btn_blue px-3 py-1 mx-auto mt-6">Submit</button>
    </div>
  )
}

export default TakeQuiz

// array for each question, number for item chosen
