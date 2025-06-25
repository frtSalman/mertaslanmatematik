import { useQuery } from "@tanstack/react-query";
import { fetchTimeTable } from "../services/apıTimeTable.js";
import { useSelector } from "react-redux";

function useFetchTimetable() {
  const { user } = useSelector((state) => state.auth);
  return useQuery({
    queryKey: ["timetables"],
    queryFn: async () => {
      const response = await fetchTimeTable({
        role: user.role,
        userId: user.id,
      });
      return response;
    },
  });
}

export default useFetchTimetable;
