import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestionAppearance } from "../services/apiQuestions";
import toast from "react-hot-toast";

export default function useUpdateUQAppearance() {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: updateQuestionAppearance,
    onSuccess: () => {
      qC.invalidateQueries({
        queryKey: ["unsolvedQuestions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
