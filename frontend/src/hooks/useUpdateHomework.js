import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHomework } from "../services/apıHomeworks";
import toast from "react-hot-toast";

export default function useUpdateHomework() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomework,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["homeworks"],
      });
      toast.success("Ödevi güncellediniz. 💪🏻");
    },
  });
}
