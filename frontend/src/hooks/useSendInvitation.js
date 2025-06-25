import { useMutation } from "@tanstack/react-query";
import { sendInvitation } from "../services/authAPI";
import toast from "react-hot-toast";

export default function useSendInvitataion() {
  return useMutation({
    mutationFn: sendInvitation,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    throwOnError: false,
  });
}
