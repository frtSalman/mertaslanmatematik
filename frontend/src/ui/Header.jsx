import useLogout from "../hooks/useLogout";
import { LogOut, Loader, SmilePlus, Mail, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { openInv } from "../slices/timeTableHomeworkSlice";
import { useState } from "react";
import useSendInvitataion from "../hooks/useSendInvitation";

function Header() {
  const { mutate: logout, isPending: isLoading } = useLogout();
  const { isModalOn, isInvOn } = useSelector(
    (state) => state.timeTableHomework
  );
  const { user } = useSelector((state) => state.auth);

  const {
    mutate: sendInvitation,
    isPending: isSending,
    error,
  } = useSendInvitataion();
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  function handleLogout() {
    logout();
  }

  function handleOpenModal() {
    dispatch(openInv());
  }

  function handleSendInvitation(e) {
    e.preventDefault();
    sendInvitation({ email, teacherId: user.id });
  }

  return (
    <div className="flex items-center justify-between">
      <p className="p-3 text-xl font-semibold text-gray-600">
        {user?.role === "teacher"
          ? `Merhabalar ${user?.name} Hocam 🙋‍♂️`
          : `Başarılar ${user?.name} 🙌`}
      </p>
      <div className="flex items-center justify-end p-3 ">
        {isModalOn && isInvOn && user.role === "teacher" && (
          <Modal>
            <form
              className="flex flex-row flex-wrap items-center justify-center gap-5 mt-3"
              onSubmit={handleSendInvitation}
            >
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="text-green-600 size-5" />
                </div>
                <input
                  className="w-[350px] py-2 pl-10 pr-3 text-white placeholder-gray-700 transition duration-200 bg-gray-500 border border-gray-400 rounded-lg bg-opacity-20 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Öğrencinizin email adresini giriniz"
                />
              </div>
              {error && (
                <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
                  <XCircle className="w-5 h-5 mr-2 text-red-500" />
                  <span className="font-medium text-red-700">
                    {error.message}
                  </span>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[200px] px-4 py-2 mb-6 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white"
                type="submit"
                disabled={isSending}
              >
                {isSending ? (
                  <Loader className="w-6 h-6 mx-auto animate-spin" />
                ) : (
                  "Davetiye Gönder"
                )}
              </motion.button>
            </form>
          </Modal>
        )}

        {user?.role === "teacher" && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-10 h-10 m-2 font-bold text-white transition duration-200 bg-orange-500 rounded-lg shadow-lg hover:from-orange-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white"
              type="button"
              onClick={handleOpenModal}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 mx-auto animate-spin" />
              ) : (
                <SmilePlus className="m-auto" />
              )}
            </motion.button>
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-10 h-10 m-2 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white"
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-6 h-6 mx-auto animate-spin" />
          ) : (
            <LogOut className="m-auto" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default Header;
