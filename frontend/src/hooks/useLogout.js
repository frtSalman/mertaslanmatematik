import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUnAuth } from "../slices/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(setUnAuth());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
