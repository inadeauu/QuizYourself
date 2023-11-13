import { useContext, useState } from "react"
import QuestionForm from "../components/quiz/QuestionForm"
import { Answer, QuizContext } from "../contexts/QuizProvider"
import Input from "../components/misc/Input"
import Textarea from "../components/misc/Textarea"
import { trpc } from "../utils/trpc"
import { useNavigate } from "react-router-dom"

const CreateQuiz = () => {
  const {
    title,
    description,
    questions,
    answers,
    setTitle,
    setDescription,
    addQuestion,
  } = useContext(QuizContext)

  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")

  const maxTitleLength = 75
  const maxDescriptionLength = 200

  const navigate = useNavigate()

  const submitQuiz = trpc.quiz.createQuiz.useMutation({
    onSuccess: () => {
      navigate("/")
    },
  })

  const checkAnswerNum = (element: Answer[]) => element.length < 1
  const checkCorrectAnswer = (element: Answer[]) =>
    element.every((value) => !value.correct)
  const checkQuestionLength = (element: string) =>
    element.length <= 0 || element.length > 500
  const checkAnswerLength = (element: Answer) =>
    element.body.length <= 0 || element.body.length > 500
  const checkAllAnswerLengths = (element: Answer[]) =>
    element.some(checkAnswerLength)

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-xl font-medium">Create a Quiz</h1>
      <div>
        <p>Quiz Requirements:</p>
        <ul className="ml-8 list-disc">
          <li
            className={`${
              questions.length < 1 ? "text-red-500" : "text-green-600"
            }`}
          >
            There must be at least one question.
          </li>
          <li
            className={`${
              questions.length < 1
                ? "text-red-500"
                : answers.some(checkAnswerNum)
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Each question must have at least one possible answer.
          </li>
          <li
            className={`${
              questions.length < 1
                ? "text-red-500"
                : answers.some(checkCorrectAnswer)
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Each question must have at least one answer designated as correct.
          </li>
          <li
            className={`${
              questions.length < 1 || titleError || descriptionError
                ? "text-red-500"
                : questions.some(checkQuestionLength) ||
                  answers.some(checkAllAnswerLengths)
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            The title, description, questions, and answers must all be within
            the specified length boundaries.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 w-fit">
        <Input
          name="title"
          id="title"
          classes="px-1"
          value={title}
          onChange={(e) => {
            if (e.target.value.length > maxTitleLength) {
              setTitleError("Title is too long.")
            } else if (e.target.value.length <= 0) {
              setTitleError("Please input a title.")
            } else if (
              e.target.value.length > 0 &&
              e.target.value.length <= 200 &&
              titleError
            ) {
              setTitleError("")
            }

            setTitle(e.target.value)
          }}
          error={titleError}
          label="Title"
          showCounter={true}
          maxLength={75}
          minLength={1}
        />
        <Textarea
          name="description"
          id="description"
          classes="px-1 resize-none h-[100px]"
          value={description}
          onChange={(e) => {
            if (e.target.value.length > maxDescriptionLength) {
              setDescriptionError("Description is too long.")
            } else if (
              e.target.value.length <= maxDescriptionLength &&
              descriptionError
            ) {
              setDescriptionError("")
            }

            setDescription(e.target.value)
          }}
          error={descriptionError}
          label="Description"
          maxLength={200}
          minLength={0}
          showCounter={true}
        />
      </div>
      {questions.map((_, i) => (
        <QuestionForm key={i} questionNum={i} />
      ))}
      {questions.length < 20 && (
        <button
          onClick={() => addQuestion()}
          className="btn_orange w-fit mx-auto px-3 py-1 text-sm"
        >
          Add question
        </button>
      )}
      <button
        className="btn_blue w-fit mx-auto px-3 py-1"
        onClick={() =>
          submitQuiz.mutate({ title, description, questions, answers })
        }
        disabled={
          questions.length <= 0 ||
          title.length <= 0 ||
          title.length > maxTitleLength ||
          description.length > maxDescriptionLength ||
          answers.some(checkAnswerNum) ||
          answers.some(checkCorrectAnswer) ||
          questions.some(checkQuestionLength) ||
          answers.some(checkAllAnswerLengths) ||
          submitQuiz.isLoading
        }
      >
        Create quiz
      </button>
    </div>
  )
}

export default CreateQuiz
