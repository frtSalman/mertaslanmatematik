import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../services/authAPI";
import { setAuth } from "../slices/authSlice";

export default function useLogin() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setAuth(data.user));
    },
    throwOnError: false, // Bu satır kritik önemde!
  });
}
