import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

type InputProps = {
  label?: string
  password?: boolean
  classes?: string
  error?: string | null
  showCounter?: boolean
  maxLength?: number
  minLength?: number
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = ({
  label,
  error = null,
  classes,
  password = false,
  showCounter = false,
  maxLength = 100,
  minLength = 1,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  props.type = password ? (showPassword ? "text" : "password") : props.type
  props.value = "" + (props.value || "")

  return (
    <div className="flex flex-col gap-1">
      {props.id && label && (
        <label htmlFor={props.id} className="text-md">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          className={`${classes} border-2 outline-none rounded-sm w-full ${
            error
              ? "border-red-400 focus:border-red-700"
              : "border-black focus:border-blue-500"
          }`}
          {...props}
        />
        {password && (
          <div
            className="flex items-center justify-center hover:cursor-pointer"
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
      <div className="flex justify-between">
        <p className="text-red-500 text-xs">{error && error}</p>
        {showCounter && (
          <span
            className={`self-end text-xs font-medium ${
              props.value.length > maxLength || props.value.length < minLength
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {props.value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
