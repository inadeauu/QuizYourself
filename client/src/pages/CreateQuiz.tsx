import { useContext } from "react"
import QuestionForm from "../components/quiz/QuestionForm"
import { QuizContext } from "../contexts/QuizProvider"

const CreateQuiz = () => {
  const { questions, answers, addQuestion } = useContext(QuizContext)

  const checkAnswerNum = (element: string[]) => element.length < 1

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-xl font-medium">Create a Quiz</h1>
      {questions.map((_, i) => (
        <QuestionForm key={i} questionNum={i} />
      ))}
      <button
        onClick={() => addQuestion()}
        className="btn_orange w-fit mx-auto px-3 py-1"
      >
        Add question
      </button>
      <button
        className="btn_blue w-fit mx-auto px-3 py-1"
        disabled={questions.length < 1 || answers.some(checkAnswerNum)}
      >
        Create quiz
      </button>
    </div>
  )
}

export default CreateQuiz

// questions array
// answers array, which is an array of arrays
