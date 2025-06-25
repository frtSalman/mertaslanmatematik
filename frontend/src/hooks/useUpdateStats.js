import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStats } from "../services/apiStats";
import toast from "react-hot-toast";

export default function useUpdateStats() {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: updateStats,
    onSuccess: () => {
      qC.invalidateQueries({
        queryKey: ["stats"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
