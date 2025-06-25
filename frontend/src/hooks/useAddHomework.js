import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHomework } from "../services/apıHomeworks";
import toast from "react-hot-toast";

function useAddHomework() {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: addHomework,
    onSuccess: () => {
      qC.invalidateQueries({
        queryKey: ["homeworks"],
        refetchType: "active", // Force immediate refresh
      });
      toast.success("Ödev başarılı bir şekilde eklendi.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useAddHomework;
