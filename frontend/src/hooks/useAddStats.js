import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStats } from "../services/apiStats";
import toast from "react-hot-toast";

export default function useAddStats() {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: addStats,
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
