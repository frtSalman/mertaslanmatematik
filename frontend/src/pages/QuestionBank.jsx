import { useSelector } from "react-redux";
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import useFetchUnsolvedQuestions from "../hooks/useFetchUnsolvedQuestions";
import useUpdateUQAppearance from "../hooks/useUpdateUQAppearance";
import { useState } from "react";
import LightboxQB from "../ui/LightboxQB";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getQuestions,
  updateQuestionAppearance,
} from "../services/apiQuestions";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/uploads"
    : "api/uploads";

const QuestionCard = ({ question, updateUQA }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  /* const { mutate: updateUQA, isPending, error } = useUpdateUQAppearance(); */
  const date = new Date(question.createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleShow() {
    updateUQA({ bool: true, id: question.id });
  }

  function handleHide() {
    updateUQA({ bool: false, id: question.id });
  }

  async function handleDelete() {
    /* unsolvedQuestions dan sil */
    const response = await fetch(
      `${API_URL}/unsolved-question-url/${question.imageUrl}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    /* Bunny CDN den sil */
    console.log(data);
    try {
      await fetch(`${data.deleteUrl}`, {
        method: "DELETE",
        headers: {
          AccessKey: data.headers.AccessKey,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (user.role === "student" && !question.show) return null;

  return (
    <div className="overflow-hidden w-[280px] transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl">
      <LightboxQB
        props={{
          lightboxOpen,
          setLightboxOpen,
          pullZoneURL: question.imageUrl,
        }}
      />
      <div className="relative">
        <img
          src={question.imageUrl}
          alt={`${question.subject} question`}
          className="object-contain w-full h-[200px] p-4 hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.innerHTML = `
              <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-48 flex flex-col items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2">Image unavailable</p>
              </div>
            `;
          }}
        />
        <div className="absolute px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full top-3 right-3">
          {date}
        </div>
        {user.role === "teacher" && (
          <div className="absolute top-3 left-3">
            {question.show ? (
              <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                Görünür
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                Görünmez
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 h-[53px]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Sayfa Aralığı: {question.pages}
          </span>
          {user.role === "teacher" && (
            <div className="flex flex-row items-center gap-3">
              <button
                className="text-blue-500 transition-colors hover:text-blue-800"
                onClick={handleShow}
              >
                <ThumbsUp />
              </button>
              <button
                className="text-orange-500 transition-colors hover:text-orange-800"
                onClick={handleHide}
              >
                <ThumbsDown />
              </button>
              <button
                className="text-red-500 transition-colors hover:text-red-800"
                onClick={handleDelete}
              >
                <Trash2 />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function QuestionBank() {
  const { user } = useSelector((state) => state.auth);
  const { selectStudent } = useSelector((state) => state.timeTableHomework);

  let studentId;
  if (selectStudent) {
    studentId = selectStudent[0]?.id || null;
  }
  let updatedQuestionId;
  const qC = useQueryClient();
  const { mutate: updateUQA } = useMutation({
    mutationFn: updateQuestionAppearance,
    onSuccess: (data) => {
      updatedQuestionId = data.questionId;
      qC.invalidateQueries({
        queryKey: ["unsolvedQuestions", studentId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { data, error, isPending } = useQuery({
    queryKey: ["unsolvedQuestions", studentId],
    queryFn: async () => {
      const res = await getQuestions({ user, studentId });
      return res || [];
    },
    refetchInterval: user.role === "student" ? 10000 : false,
  });

  if (isPending)
    return (
      <div className="flex justify-center mt-12">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading questions: {error.message}
      </div>
    );
  if (!data?.questions?.length)
    return <div className="p-12 text-center">No questions available</div>;

  // Group questions by subject
  const questionsBySubject = data.questions.reduce((acc, question) => {
    const subject = question.subject || "Uncategorized";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(question);
    return acc;
  }, {});

  return (
    <div className="px-4 py-8 mx-auto">
      {Object.entries(questionsBySubject).map(([subject, questions]) => (
        <section key={subject} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{subject}</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              {questions.length} {"Soru"}
            </span>
          </div>

          <div className="flex flex-row flex-wrap gap-6">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                updateUQA={updateUQA}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default QuestionBank;
