import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "../../../server/src/trpc/routers/appRouter"

export const trpc = createTRPCReact<AppRouter>()
