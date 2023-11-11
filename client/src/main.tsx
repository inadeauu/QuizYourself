import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import ApiProvider from "./contexts/ApiProvider.tsx"
import AuthProvider from "./contexts/AuthProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  </React.StrictMode>
)
