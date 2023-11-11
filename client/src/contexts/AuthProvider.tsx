import { createContext } from "react"
import { RouterOutput } from "./ApiProvider"
import { trpc } from "../utils/trpc"
import { ImSpinner11 } from "react-icons/im"

export type AuthContextType = {
  user?: RouterOutput["auth"]["getAuthedUser"]
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const authUser = trpc.auth.getAuthedUser.useQuery()

  const value: AuthContextType = {
    user: authUser.data,
  }

  return (
    <AuthContext.Provider value={value}>
      {authUser.isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <ImSpinner11 className="animate-spin h-32 w-32" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
