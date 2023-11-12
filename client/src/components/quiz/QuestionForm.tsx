import { useContext, useState } from "react"
import Textarea from "../misc/Textarea"
import { QuizContext } from "../../contexts/QuizProvider"
import { HiXMark } from "react-icons/hi2"

type QuestionFormProps = {
  questionNum: number
}

const QuestionForm = ({ questionNum }: QuestionFormProps) => {
  const { questions, setQuestions, deleteQuestion } = useContext(QuizContext)

  const question = questions[questionNum]

  const [error, setError] = useState("")

  const maxQuestionLength = 500

  return (
    <div className="p-4 border-2 border-black rounded-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="question" className="text-lg">
            Question #{questionNum + 1}
          </label>
          <button
            className="btn_red p-1"
            onClick={() => deleteQuestion(questionNum)}
          >
            <HiXMark size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <Textarea
            value={question}
            onChange={(e) => {
              if (e.target.value.length > maxQuestionLength) {
                setError("Question is too long.")
              } else if (e.target.value.length <= 0) {
                setError("Please input a question.")
              } else if (
                e.target.value.length > 0 &&
                e.target.value.length <= maxQuestionLength &&
                error
              ) {
                setError("")
              }

              setQuestions((prev) =>
                prev.map((q, i) => {
                  if (i == questionNum) {
                    return e.target.value
                  } else {
                    return q
                  }
                })
              )
            }}
            name="question"
            id="question"
            classes="p-1 resize-none"
            placeholder="Input a question..."
            resize={true}
            initialHeight={75}
            maxLength={maxQuestionLength}
            showCounter={true}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionForm
