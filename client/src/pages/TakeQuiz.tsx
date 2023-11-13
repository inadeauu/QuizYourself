import { Navigate, useNavigate, useParams } from "react-router-dom"
import { trpc } from "../utils/trpc"
import { ImSpinner11 } from "react-icons/im"
import { useState } from "react"
import QuizQuestion from "../components/quiz/QuizQuestion"
import moment from "moment"

const TakeQuiz = () => {
  const [quizAnswers, setQuizAnswers] = useState<number[][]>(
    new Array(20).fill(null).map(() => new Array(0))
  )
  const [submittedQuiz, setSubmittedQuiz] = useState(false)

  const numAnswered = quizAnswers.filter((ansArr) => ansArr.length > 0)

  const navigate = useNavigate()

  const { id } = useParams()

  const quiz = trpc.quiz.getQuiz.useQuery({ quizId: id! })

  if (quiz.isLoading) return <ImSpinner11 className="animate-spin h-16 w-16" />

  if (!quiz.data) {
    return <Navigate to="/not-found" />
  }

  const quizInfo = quiz.data.quizInfo
  const questions = quiz.data.questions
  const answers = quiz.data.answers

  const numCorrect = quizAnswers
    .filter((ansArr, i) => ansArr.every((ans) => answers[i][ans].correct))
    .filter((ansArr) => ansArr.length > 0)

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col mb-6">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{quizInfo.title}</span>
          <span className="text-xs text-neutral-600">
            Created {moment(quizInfo.created_at).fromNow()}
          </span>
        </div>
        <span className="text-sm">{quizInfo.description}</span>
        <div className="flex flex-col mt-3">
          <span className="text-sm">
            {quizInfo.questionCount} Question
            {quizInfo.questionCount !== 1 && "s"}
          </span>
          <span className="text-sm">
            Questions answered:{" "}
            <span
              className={`${
                numAnswered.length !== answers.length
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {numAnswered.length} / {questions.length}
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <QuizQuestion
            key={i}
            question={q.body}
            questionNum={q.index}
            answers={answers[i]}
            quizAnswers={quizAnswers[i]}
            setQuizAnswers={setQuizAnswers}
            submittedQuiz={submittedQuiz}
          />
        ))}
      </div>
      {!submittedQuiz ? (
        <button
          className="btn_blue px-3 py-1 mx-auto mt-6"
          disabled={numAnswered.length !== answers.length}
          onClick={() => setSubmittedQuiz((prev) => !prev)}
        >
          Submit
        </button>
      ) : (
        <div className="text-center mt-2 flex flex-col gap-4">
          {submittedQuiz && (
            <span className="mt-3">
              Results: {numCorrect.length} / {questions.length} correct
            </span>
          )}
          <button
            className="btn_blue px-3 py-1 mx-auto"
            onClick={() => navigate(0)}
          >
            Take quiz again
          </button>
        </div>
      )}
    </div>
  )
}

export default TakeQuiz
