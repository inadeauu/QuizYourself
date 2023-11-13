import { useLayoutEffect, useRef } from "react"

type TextareaProps = {
  initialHeight?: number
  resize?: boolean
  classes?: string
  error?: string | null
  maxLength?: number
  showCounter?: boolean
  label?: string
  minLength?: number
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const Textarea = ({
  initialHeight = 100,
  resize = false,
  classes,
  error = null,
  maxLength = 100,
  showCounter = false,
  label,
  minLength = 1,
  ...props
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  props.value = "" + (props.value || "")

  useLayoutEffect(() => {
    const updateQuestionInputHeight = () => {
      if (!textareaRef.current || !resize) return
      textareaRef.current.style.height = `${initialHeight}px`
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    updateQuestionInputHeight()
  }, [props.value, initialHeight, resize])

  return (
    <div>
      {props.id && label && (
        <label htmlFor={props.id} className="text-md">
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        className={`${classes} border-2 outline-none rounded-sm w-full ${
          error
            ? "border-red-400 focus:border-red-700"
            : "border-black focus:border-blue-500"
        }`}
        {...props}
      />
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

export default Textarea
