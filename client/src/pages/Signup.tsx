import { useState } from "react"
import { trpc } from "../utils/trpc"
import Input from "../components/Input"

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

  const signup = trpc.auth.signup.useMutation({
    onSuccess: () => {
      setFieldErrors({ username: null, password: null })
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

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signup.mutate({ username, password })
  }

  return (
    <div className="flex flex-col gap-2 border-2 border-black p-4 w-[350px]">
      <h1 className="text-xl font-medium">Sign Up</h1>
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
          className="btn_blue mx-auto px-2 py-1 mt-2"
          disabled={signup.isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup