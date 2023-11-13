import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 items-center mt-8">
      <h1 className="text-3xl">Page not found.</h1>
      <p className="text-lg">The requested page does not exist.</p>
      <button
        className="btn_blue px-3 py-1 text-sm"
        onClick={() => navigate("/")}
      >
        Return to home
      </button>
    </div>
  )
}

export default PageNotFound
