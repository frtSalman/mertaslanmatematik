import { forgotPassword } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setMessage } from "../slices/authSlice";
import { useMutation } from "@tanstack/react-query";

export default function useForgotPassword() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      dispatch(setMessage(data.message));
    },
  });
}
