import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Navbar = () => {
  const { user } = useAuth()

  return (
    <div className="bg-neutral-100 py-4 px-8 border-b-2 border-neutral-200">
      <div className="flex justify-between">
        <Link className="text-xl font-bold hover:scale-105" to="/">
          QuizYourself
        </Link>
        {!user && (
          <div className="flex gap-4">
            <Link to="/signup" className="btn_blue p-1">
              Sign up
            </Link>
            <Link to="/login" className="btn_blue p-1">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
