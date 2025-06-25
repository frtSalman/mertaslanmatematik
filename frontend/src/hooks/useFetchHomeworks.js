import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchHomeworks } from "../services/apıHomeworks";

export default function useFetchHomeworks() {
  const { user } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["homeworks"],
    queryFn: async () => {
      const res = await fetchHomeworks(user.role, user.id);
      return res || [];
    },
  });
}
