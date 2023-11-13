import { Answer } from "../../contexts/QuizProvider"

type QuizQuestionProps = {
  question: string
  questionNum: number
  answers: Answer[]
  setQuizAnswers: React.Dispatch<React.SetStateAction<number[][]>>
}

const QuizQuestion = ({
  question,
  questionNum,
  answers,
  setQuizAnswers,
}: QuizQuestionProps) => {
  return (
    <div className="border-2 border-black p-4">
      <div className="flex flex-col">
        <span className="text-lg font-medium">Question #{questionNum + 1}</span>
        <span>{question}</span>
        <hr className="my-2 h-[2px] bg-black" />
      </div>
      <div className="flex flex-col gap-4">
        {answers.map((a, i) => (
          <div key={i} className="flex">
            <div>
              <input
                id={`answer-${questionNum}-${i}`}
                type="checkbox"
                className="mr-2 hover:cursor-pointer"
                value={i}
                onChange={(e) => {
                  setQuizAnswers((prev) =>
                    prev.map((ansArr, j) => {
                      const newArr = [...ansArr]

                      if (j === questionNum) {
                        const index = newArr.indexOf(+e.target.value)

                        if (index > -1) {
                          newArr.splice(index, 1)
                        } else {
                          newArr.push(+e.target.value)
                        }
                      }

                      return newArr
                    })
                  )
                }}
              />
            </div>
            <label
              htmlFor={`answer-${questionNum}-${i}`}
              className="text-sm break-all self-center hover:cursor-pointer"
            >
              {a.body}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizQuestion
