import { useForm } from "react-hook-form";
import useAddDailyScedule from "../hooks/useAddDailyScedule";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/timeTableHomeworkSlice";
import toast from "react-hot-toast";
import { FaPlusCircle } from "react-icons/fa";

function AddSchedule({ day }) {
  const { pickedStudentForProgram } = useSelector(
    (state) => state.timeTableHomework
  );

  const { user } = useSelector((state) => state.auth);

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

  const { errors } = formState;

  const { mutate: addMutate, isPending: isAddPending } = useAddDailyScedule();

  function onSubmit(data) {
    const scheduleData = {
      ...data,
      day,
      studentId: pickedStudentForProgram[0]?.id,
      teacherId: user.id,
    };
    handleClose();
    addMutate(scheduleData);
    reset();
  }

  function onError(error) {
    toast.error(error.message);
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="px-4"
    >
      <div className="grid grid-cols-[auto_1fr] gap-5">
        <label
          htmlFor="gun"
          className="flex justify-between gap-2 font-semibold"
        >
          <span>Gün</span>
          <span>&#58;</span>
        </label>
        <div id="gun">
          <span>{day}</span>
        </div>
        <label
          htmlFor="program_title"
          className="flex justify-between gap-2 font-semibold"
        >
          <span>Program Başlık</span>
          <span>&#58;</span>
        </label>
        <div id="program_title" className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              className="bg-white border-2 border-gray-200 shadow-md"
              id="program_title"
              name="program_title"
              {...register("program_title", {
                required: "Program başlığını giriniz.",
              })}
            />
          </div>
          {errors?.name?.message && (
            <span className="font-semibold text-red-600">
              {errors?.name?.message}
            </span>
          )}
        </div>
        <label
          htmlFor="program_content"
          className="flex justify-between gap-2 font-semibold"
        >
          <span>Program</span>
          <span>&#58;</span>
        </label>
        <div id="program_content" className="flex flex-col gap-2">
          <div>
            <textarea
              className="bg-white border-2 border-gray-200 shadow-md"
              id="program_content"
              name="program_content"
              cols={22.5}
              {...register("program_content", {
                required: "Programı giriniz.",
              })}
            ></textarea>
          </div>
          {errors?.name?.message && (
            <span className="font-semibold text-red-600">
              {errors?.name?.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="flex items-center justify-center transition bg-orange-100 rounded-full w-15 h-15 hover:bg-orange-200 float-end"
          type="submit"
        >
          <FaPlusCircle size={30} className="text-orange-500" />
        </button>
      </div>
    </form>
  );
}

export default AddSchedule;
