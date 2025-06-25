import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAuth } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setAuth, setUnAuth } from "../slices/authSlice";

export default function useCheckAuth() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: checkAuth,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      dispatch(setAuth(data.user));
    },
    onError: (error) => {
      dispatch(setUnAuth());
      console.log(error.response.data.message);
    },
  });
}
