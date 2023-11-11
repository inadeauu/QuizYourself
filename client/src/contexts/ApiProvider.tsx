import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { trpc } from "../utils/trpc"
import superjson from "superjson"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../../server/src/trpc/routers/appRouter"

type TrpcProviderProps = {
  children: React.ReactNode
}

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        })
      },
    }),
  ],
})

const ApiProvider = ({ children }: TrpcProviderProps) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default ApiProvider
