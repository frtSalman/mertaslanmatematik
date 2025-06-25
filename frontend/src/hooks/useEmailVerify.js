import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function useEmailVerify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      dispatch(setAuth(data.user));
      navigate("/");
    },
  });
}
