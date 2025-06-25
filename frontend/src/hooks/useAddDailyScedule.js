import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDailySchedule } from "../services/apıTimeTable.js";
import toast from "react-hot-toast";

function useAddDailySchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDailySchedule,
    onSuccess: () => {
      toast.success("Ders programı başarı ile eklendi.");
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useAddDailySchedule;
