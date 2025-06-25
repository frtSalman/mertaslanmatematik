import toast from "react-hot-toast";
import { deleteDailySchedule } from "../services/apıTimeTable.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteDailySchedule() {
  const qN = useQueryClient();

  return useMutation({
    mutationFn: deleteDailySchedule,
    onSuccess: () => {
      qN.invalidateQueries({ queryKey: ["timetables"] });
      toast.success("Silme işlemi başarılı.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useDeleteDailySchedule;
