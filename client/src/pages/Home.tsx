import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import QuizList from "../components/quiz/QuizList"

const Home = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-fit">
        <h1 className="text-xl font-medium">Quizzes</h1>
        {user ? (
          <button
            className="btn_orange px-3 py-1 text-sm"
            onClick={() => navigate("/create-quiz")}
          >
            Create a quiz
          </button>
        ) : (
          <span>Log in to create a quiz.</span>
        )}
      </div>
      <QuizList />
    </div>
  )
}

export default Home
