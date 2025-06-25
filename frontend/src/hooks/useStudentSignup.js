import { useMutation } from "@tanstack/react-query";
import { studentSignup } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function useStudentSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: studentSignup,
    onSuccess: (data) => {
      dispatch(setAuth(data.user));
      navigate("/");
    },
    throwOnError: false,
  });
}
