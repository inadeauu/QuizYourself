import { Answer } from "../../contexts/QuizProvider"

type QuizQuestionProps = {
  question: string
  questionNum: number
  answers: Answer[]
  quizAnswers: number[]
  setQuizAnswers: React.Dispatch<React.SetStateAction<number[][]>>
  submittedQuiz: boolean
}

const QuizQuestion = ({
  question,
  questionNum,
  answers,
  quizAnswers,
  setQuizAnswers,
  submittedQuiz,
}: QuizQuestionProps) => {
  const questionCorrect = quizAnswers.every((ans) => answers[ans].correct)

  return (
    <div
      className={`border-2 border-black p-4 ${
        submittedQuiz
          ? questionCorrect
            ? "border-green-500"
            : "border-red-500"
          : "border-black"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-lg font-medium">
          Question #{questionNum + 1}{" "}
          {submittedQuiz && (
            <span
              className={`float-right ${
                questionCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {questionCorrect ? "Correct" : "Incorrect"}
            </span>
          )}
        </span>
        <span>{question}</span>
        <hr className="my-2 h-[2px] bg-black" />
      </div>
      <div className="flex flex-col gap-4">
        {answers.map((a, i) => (
          <div
            key={i}
            className={`flex p-1 ${
              submittedQuiz &&
              (answers[i].correct ? "bg-green-500" : "bg-red-400")
            }`}
          >
            <div>
              <input
                id={`answer-${questionNum}-${i}`}
                type="checkbox"
                className="mr-2 hover:cursor-pointer"
                value={i}
                disabled={submittedQuiz}
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
