import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHomework } from "../services/apıHomeworks";
import toast from "react-hot-toast";

function useDeleteHomework() {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: deleteHomework,
    onSuccess: () => {
      qC.invalidateQueries([{ queryKey: "homeworks" }]);
      toast.success("Ödev başarılı bir şekilde silindi.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useDeleteHomework;
