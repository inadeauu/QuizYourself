import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

type InputProps = {
  label?: string
  password?: boolean
  error: string | null
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = ({ label, error, password = false, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  props.type = password ? (showPassword ? "text" : "password") : props.type

  return (
    <div className="flex flex-col gap-1">
      {props.id && label && (
        <label htmlFor={props.id} className="text-md">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          className={`border-2 outline-none rounded-sm px-[2px] w-full ${
            error
              ? "border-red-400 focus:border-red-700"
              : "border-black focus:border-blue-500"
          }`}
          {...props}
        />
        {password && (
          <div
            className="flex items-center justify-center"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEye size="28px" />
            ) : (
              <AiOutlineEyeInvisible size="28px" />
            )}
          </div>
        )}
      </div>
      <p className="text-red-500 text-xs">{error && error}</p>
    </div>
  )
}

export default Input
