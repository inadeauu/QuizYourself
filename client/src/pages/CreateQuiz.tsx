import { useContext } from "react"
import QuestionForm from "../components/quiz/QuestionForm"
import { Answer, QuizContext } from "../contexts/QuizProvider"

const CreateQuiz = () => {
  const { questions, answers, addQuestion } = useContext(QuizContext)

  const checkAnswerNum = (element: Answer[]) => element.length < 1
  const checkCorrectAnswer = (element: Answer[]) =>
    element.every((value) => !value.correct)
  const checkQuestionLength = (element: string) =>
    element.length <= 0 || element.length > 500
  const checkAnswerLength = (element: Answer) =>
    element.body.length <= 0 || element.body.length > 500
  const checkAllAnswerLengths = (element: Answer[]) =>
    element.some(checkAnswerLength)

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-xl font-medium">Create a Quiz</h1>
      <div>
        <p>Quiz Requirements:</p>
        <ul className="ml-8 list-disc">
          <li
            className={`${
              questions.length < 1 ? "text-red-500" : "text-green-600"
            }`}
          >
            There must be at least one question.
          </li>
          <li
            className={`${
              questions.length < 1
                ? "text-red-500"
                : answers.some(checkAnswerNum)
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Each question must have at least one possible answer.
          </li>
          <li
            className={`${
              questions.length < 1
                ? "text-red-500"
                : answers.some(checkCorrectAnswer)
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Each question must have at least one answer designated as correct.
          </li>
          <li
            className={`${
              questions.length < 1
                ? "text-red-500"
                : questions.some(checkQuestionLength) ||
                  answers.some(checkAllAnswerLengths)
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Questions and answers must be within the specified length
            boundaries.
          </li>
        </ul>
      </div>
      {questions.map((_, i) => (
        <QuestionForm key={i} questionNum={i} />
      ))}
      {questions.length < 20 && (
        <button
          onClick={() => addQuestion()}
          className="btn_orange w-fit mx-auto px-3 py-1 text-sm"
        >
          Add question
        </button>
      )}
      <button
        className="btn_blue w-fit mx-auto px-3 py-1"
        disabled={
          questions.length < 1 ||
          answers.some(checkAnswerNum) ||
          answers.some(checkCorrectAnswer) ||
          questions.some(checkQuestionLength) ||
          answers.some(checkAllAnswerLengths)
        }
      >
        Create quiz
      </button>
    </div>
  )
}

export default CreateQuiz

// questions array
// answers array, which is an array of arrays
