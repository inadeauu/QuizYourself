import { useRef, useState } from "react"
import { AiOutlineProfile } from "react-icons/ai"
import { HiXMark } from "react-icons/hi2"
import { Link } from "react-router-dom"
import useClickOutside from "../../hooks/useClickOutside"

const UnauthDropdown = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => {
    if (open) {
      setOpen(false)
    }
  })

  return (
    <div ref={menuRef} className="relative xs:hidden">
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
          <div className="flex flex-col gap-2">
            <Link
              to={`/signup`}
              className="btn_orange py-1 px-2 text-sm"
              onClick={() => setOpen((prev) => !prev)}
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="btn_orange py-1 px-2 text-sm"
              onClick={() => setOpen((prev) => !prev)}
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnauthDropdown
