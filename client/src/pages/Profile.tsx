import { Navigate, useParams } from "react-router-dom"
import { trpc } from "../utils/trpc"
import { ImSpinner11 } from "react-icons/im"
import QuizList from "../components/quiz/QuizList"

const Profile = () => {
  const { username } = useParams()

  const user = trpc.user.getUser.useQuery({ username: username! })

  if (user.isLoading) return <ImSpinner11 className="animate-spin h-16 w-16" />

  if (!user.data) {
    return <Navigate to="/not-found" />
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{username}</h1>
      <h1 className="text-xl font-medium">Profile</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg">My Quizzes</h1>
        <QuizList username={username} />
      </div>
    </div>
  )
}

export default Profile
