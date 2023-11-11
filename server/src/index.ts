import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import session from "express-session"
import * as trpcExpress from "@trpc/server/adapters/express"

import { corsOptions } from "../src/config/corsOptions"
import { createTRPCContext } from "./trpc/trpc"
import { appRouter } from "./trpc/routers/appRouter"

dotenv.config()

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === "production"

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      httpOnly: true,
      secure: isProduction,
    },
  })
)

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
