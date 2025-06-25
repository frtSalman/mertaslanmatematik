import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "../services/apiStudents";
import { useSelector } from "react-redux";

function useFetchStudents() {
  const { user } = useSelector((state) => state.auth);
  const teacherId = user?.role === "teacher" && user.id;
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetchStudents(teacherId);
      return res.students;
    },
  });
}

export default useFetchStudents;
