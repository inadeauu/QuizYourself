import { useState } from "react"
import { trpc } from "../utils/trpc"
import Input from "../components/misc/Input"
import { Link, useNavigate } from "react-router-dom"

type fieldErrors = {
  username: string | null
  password: string | null
}

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<fieldErrors>({
    username: null,
    password: null,
  })

  const utils = trpc.useUtils()

  const navigate = useNavigate()

  const signup = trpc.auth.signup.useMutation({
    onSuccess: () => {
      setFieldErrors({ username: null, password: null })
      utils.auth.getAuthedUser.invalidate()
      navigate("/")
    },
    onError: (error) => {
      const fieldErrors = error.data?.zodError?.fieldErrors

      if (fieldErrors) {
        setFieldErrors({
          username: fieldErrors["username"]?.[0] ?? null,
          password: fieldErrors["password"]?.[0] ?? null,
        })
      }
    },
  })

  const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signup.mutate({ username, password })
  }

  return (
    <div className="flex flex-col gap-2 mt-8 w-fit mx-auto">
      <div className="flex flex-col gap-2 border-2 border-black p-4 w-[350px]">
        <h1 className="text-xl font-medium">Sign Up</h1>
        <form className="flex flex-col gap-2" onSubmit={(e) => submitSignup(e)}>
          <Input
            name="username"
            id="username"
            label="Username"
            type="text"
            classes="px-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={fieldErrors.username}
            required
          />
          <Input
            name="password"
            id="password"
            label="Password"
            type="password"
            classes="px-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            password={true}
            required
          />
          <button
            type="submit"
            className="btn_blue mx-auto px-3 py-1 mt-2"
            disabled={signup.isLoading}
          >
            Submit
          </button>
        </form>
      </div>
      <p className="text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 font-semibold hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}

export default Signup
