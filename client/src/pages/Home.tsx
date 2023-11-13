import { useNavigate } from "react-router-dom"
import QuizCard from "../components/quiz/QuizCard"
import { useAuth } from "../hooks/useAuth"

const Home = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-fit">
        <h1 className="text-xl font-medium">Quizzes</h1>
        {user && (
          <button
            className="btn_orange px-3 py-1 text-sm"
            onClick={() => navigate("/create-quiz")}
          >
            Create a quiz
          </button>
        )}
      </div>
      <QuizCard quizId="25c1b183-49e3-4861-8c18-e08fa05cd647" />
    </div>
  )
}

export default Home
