import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import CreateQuiz from "./pages/CreateQuiz"
import ProtectedRoute from "./pages/ProtectedRoute"

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create-quiz" element={<CreateQuiz />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
