import { useMutation } from "@tanstack/react-query";

export default function useDeleteUnsolvedQuestion() {
  return useMutation({ mutationFn: async () => {}, onSuccess: () => {} });
}
