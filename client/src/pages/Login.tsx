import React, { useState } from "react"
import Input from "../components/misc/Input"
import { trpc } from "../utils/trpc"
import ErrorCard from "../components/misc/ErrorCard"
import { Link, useNavigate } from "react-router-dom"

type fieldErrors = {
  username: string | null
  password: string | null
}

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<fieldErrors>({
    username: null,
    password: null,
  })
  const [error, setError] = useState("")

  const utils = trpc.useUtils()

  const navigate = useNavigate()

  const login = trpc.auth.login.useMutation({
    onSuccess: () => {
      setFieldErrors({ username: null, password: null })
      setError("")
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

      setError(error.message)
    },
  })

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    login.mutate({ username, password })
  }

  return (
    <div className="flex flex-col gap-2 mt-8">
      <div className="flex flex-col gap-2 border-2 border-black p-4 w-[350px]">
        <h1 className="text-xl font-medium">Log In</h1>
        {error && <ErrorCard error={error} />}
        <form className="flex flex-col gap-2" onSubmit={(e) => submitLogin(e)}>
          <Input
            name="username"
            id="username"
            label="Username"
            type="text"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            password={true}
            required
          />
          <button
            type="submit"
            className="btn_blue mx-auto px-3 py-1 mt-2"
            disabled={login.isLoading}
          >
            Submit
          </button>
        </form>
      </div>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Login
