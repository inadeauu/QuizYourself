import { useContext, useState } from "react"
import Textarea from "../misc/Textarea"
import { QuizContext } from "../../contexts/QuizProvider"
import { HiXMark } from "react-icons/hi2"

type AnswerFormProps = {
  questionNum: number
  answerNum: number
}

const AnswerForm = ({ questionNum, answerNum }: AnswerFormProps) => {
  const { answers, setAnswers, deleteAnswer } = useContext(QuizContext)

  const [error, setError] = useState("")

  const answer = answers[questionNum][answerNum]

  const maxAnswerLength = 500

  const flipAnswerCorrect = () => {
    setAnswers((prev) =>
      prev.map((ansArr, i) => {
        if (i == questionNum) {
          return ansArr.map((ans, j) => {
            if (j == answerNum) {
              return { ...ans, correct: !ans.correct }
            } else {
              return ans
            }
          })
        } else {
          return ansArr
        }
      })
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor="question" className="text-lg">
          Answer #{answerNum + 1}
        </label>
        <div className="flex gap-4">
          <button
            className={`text-sm px-2 ${
              answer.correct ? "btn_green" : "btn_red"
            }`}
            onClick={() => flipAnswerCorrect()}
          >
            {answer.correct ? "Correct" : "Incorrect"}
          </button>
          <button
            className="btn_red p-1"
            onClick={() => deleteAnswer(answerNum, questionNum)}
          >
            <HiXMark size={18} />
          </button>
        </div>
      </div>
      <Textarea
        value={answer.body}
        onChange={(e) => {
          if (e.target.value.length > maxAnswerLength) {
            setError("Answer is too long.")
          } else if (e.target.value.length <= 0) {
            setError("Please input an answer.")
          } else if (
            e.target.value.length > 0 &&
            e.target.value.length <= maxAnswerLength &&
            error
          ) {
            setError("")
          }

          setAnswers((prev) =>
            prev.map((ansArr, i) => {
              if (i === questionNum) {
                return ansArr.map((ans, j) => {
                  if (j === answerNum) {
                    return { ...ans, body: e.target.value }
                  } else {
                    return ans
                  }
                })
              } else {
                return ansArr
              }
            })
          )
        }}
        name="question"
        id="question"
        classes="p-1 resize-none"
        placeholder="Input an answer..."
        resize={true}
        initialHeight={50}
        maxLength={maxAnswerLength}
        showCounter={true}
        error={error}
      />
    </div>
  )
}

export default AnswerForm
