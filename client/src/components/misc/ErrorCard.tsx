type ErrorCardProps = {
  error: string
}

const ErrorCard = ({ error }: ErrorCardProps) => {
  return (
    <p className="bg-red-400 text-white p-1 text-center text-sm rounded-sm">
      {error}
    </p>
  )
}

export default ErrorCard
