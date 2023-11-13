import moment from "moment"
import { trpc } from "../../utils/trpc"
import { ImSpinner11 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

type QuizCardProps = {
  quizId: string
}

const QuizCard = ({ quizId }: QuizCardProps) => {
  const quiz = trpc.quiz.getQuizInfo.useQuery({ quizId })

  const navigate = useNavigate()

  if (!quiz.data) return <ImSpinner11 className="animate-spin h-16 w-16" />

  return (
    <div
      className="border-2 border-black w-fit hover:border-blue-400 hover:cursor-pointer"
      onClick={() => navigate(`/quiz/${quiz.data.title}/${quizId}`)}
    >
      <div className="flex flex-col gap-2 p-4 w-[200px] h-[150px]">
        <div className="flex flex-col">
          <span className="font-semibold line-clamp-1 break-all">
            {quiz.data.title}
          </span>
          <span className="text-xs text-neutral-600">
            Created {moment(quiz.data.created_at).fromNow()}
          </span>
        </div>
        <span className="text-sm line-clamp-2">{quiz.data.description}</span>
        <span className="text-sm text-neutral-600">
          {quiz.data.questionCount} questions
        </span>
      </div>
    </div>
  )
}

export default QuizCard
