import { ImSpinner11 } from "react-icons/im"
import { trpc } from "../../utils/trpc"
import QuizCard from "./QuizCard"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

const QuizList = () => {
  const { ref, inView } = useInView()

  const quizzes = trpc.quiz.getQuizzes.useInfiniteQuery(
    { limit: 20 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor?.id }
  )

  useEffect(() => {
    if (inView && quizzes.hasNextPage) {
      quizzes.fetchNextPage()
    }
  })

  if (quizzes.isLoading)
    return <ImSpinner11 className="animate-spin h-16 w-16" />

  return (
    <div className="flex flex-wrap gap-2">
      {quizzes.data?.pages.map((page, i) =>
        page.quizzes.map((quiz, j) => (
          <QuizCard key={`quiz-${i}-${j}`} quizId={quiz.id} />
        ))
      )}
      <div ref={ref} />
    </div>
  )
}

export default QuizList
