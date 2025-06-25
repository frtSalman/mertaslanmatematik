import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../slices/authSlice";

import toast from "react-hot-toast";

export default function useResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      dispatch(setMessage(data.message));
      toast.success(
        "Parola güncelleme başarılı, giriş sayfasına yönlendiriliyorsunuz..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    throwOnError: false,
  });
}
