import { useRef, useState } from "react"
import { AiOutlineProfile } from "react-icons/ai"
import { HiXMark } from "react-icons/hi2"
import { useAuth } from "../../hooks/useAuth"
import { CgProfile } from "react-icons/cg"
import { trpc } from "../../utils/trpc"
import { Link, useNavigate } from "react-router-dom"
import useClickOutside from "../../hooks/useClickOutside"

const ProfileDropdown = () => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const utils = trpc.useUtils()

  const navigate = useNavigate()

  useClickOutside(menuRef, () => {
    if (open) {
      setOpen(false)
    }
  })

  if (!user) return null

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.getAuthedUser.invalidate()
      navigate("/")
    },
  })

  return (
    <div ref={menuRef} className="relative">
      <div
        className="hover:cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <HiXMark size={32} className="pointer-events-none" />
        ) : (
          <AiOutlineProfile size={32} className="pointer-events-none" />
        )}
      </div>
      {open && (
        <div className="absolute bg-neutral-50 border-2 rounded-sm p-4 right-0 mt-2 w-[200px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <CgProfile size={40} className="mx-auto" />
              <p className="text-center text-lg line-clamp-1 break-all">
                {user.username}
              </p>
            </div>
            <hr className="bg-black h-[2px] my-4" />
            <div className="flex flex-col gap-2">
              <Link
                to={`/profile/${user.username}`}
                className="btn_orange py-1 px-2 text-sm"
                onClick={() => setOpen((prev) => !prev)}
              >
                Profile
              </Link>
              <Link
                to="/create-quiz"
                className="btn_orange py-1 px-2 text-sm"
                onClick={() => setOpen((prev) => !prev)}
              >
                Create a quiz
              </Link>
            </div>
            <hr className="bg-black h-[2px] my-4" />
            <button
              className="btn_blue py-1 text-sm"
              disabled={logout.isLoading}
              onClick={() => logout.mutate()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown
