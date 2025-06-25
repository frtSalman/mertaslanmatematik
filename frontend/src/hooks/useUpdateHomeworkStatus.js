import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHomeworkStatus } from "../services/apıHomeworks";
import toast from "react-hot-toast";

export default function useUpdateHomeworkStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomeworkStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["homeworks"],
      });
      toast.success("Tebrikler verilen ödevi tamamladınız. 💪🏻");
    },
  });
}
