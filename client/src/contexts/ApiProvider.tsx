import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { trpc } from "../utils/trpc"
import superjson from "superjson"

type TrpcProviderProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
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
