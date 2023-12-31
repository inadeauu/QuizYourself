import Navbar from "../components/nav/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-w-[320px]">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto overflow-x-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
