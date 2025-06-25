import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../services/apiQuestions";
import { useSelector } from "react-redux";

export default function useFetchUnsolvedQuestions() {
  const { user } = useSelector((state) => state.auth);
  const { selectStudent } = useSelector((state) => state.timeTableHomework);

  let studentId;
  if (selectStudent) {
    studentId = selectStudent[0]?.id || null;
  }

  return useQuery({
    queryKey: ["unsolvedQuestions", studentId],
    queryFn: async () => {
      const res = await getQuestions({ user, studentId });
      return res || [];
    },
  });
}
