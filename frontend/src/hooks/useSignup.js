import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      dispatch(setAuth(data.user));
      navigate("/verify-email");
    },
    throwOnError: false,
  });
}
