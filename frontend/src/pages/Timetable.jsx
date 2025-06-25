import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../slices/timeTableHomeworkSlice";
import { useMemo } from "react";
import Modal from "../ui/Modal";
import DailyCors from "../ui/DailyCors";
import Spinner from "../ui/Spinner";
import Notification from "../ui/Notification";
import ShowSchedule from "../ui/ShowSchedule";
import useFetchHomeworks from "../hooks/useFetchHomeworks";

const weekDays = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

export default function Timetable() {
  const { isModalOn, isShowSchedule, selectStudent } = useSelector(
    (state) => state.timeTableHomework
  );

  const { user } = useSelector((state) => state.auth);

  const { isPending, data: homeworksData, error } = useFetchHomeworks();

  const dispatch = useDispatch();

  const studentAllProgramData = useMemo(() => {
    if (!homeworksData) return null;
    let studentPrograms;

    if (user.role === "teacher") {
      const studentId = selectStudent === null ? null : selectStudent[0]?.id;

      studentPrograms = homeworksData.map((h) => {
        if (h.studentId === studentId)
          return {
            program: h.program,
            period: h.period,
            studentId: h.studentId,
            deadline: h.homeworkDeadline,
            hStatus: h.homeworkStatus,
            hId: h.id,
            hDayNum: h.homeworkDayNum,
          };
      });
    }

    if (user.role === "student") {
      studentPrograms = homeworksData.map((h) => {
        return {
          program: h.program,
          period: h.period,
          deadline: h.homeworkDeadline,
          hStatus: h.homeworkStatus,
          hId: h.id,
          hDayNum: h.homeworkDayNum,
        };
      });
    }

    return studentPrograms || null;
  }, [homeworksData, selectStudent, user.role, user.id]); //

  if (isPending) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    dispatch(openModal());
    return (
      <Modal>
        <Notification note={error.message} />
      </Modal>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-3 p-3 mx-auto mb-4 border-l-4 border-orange-500 shadow-md w-fit bg-orange-50 rounded-2xl">
        <p className="text-xl font-semibold tracking-wide text-orange-800 uppercase">
          <span>Haftalık Çalışma Tablosu</span>
        </p>
      </div>
      <div className="flex items-start justify-center gap-3">
        <div className="flex flex-wrap justify-center gap-3">
          {isModalOn && isShowSchedule && (
            <Modal type="schedule">{isShowSchedule && <ShowSchedule />}</Modal>
          )}

          {weekDays.map((day, i) => {
            return (
              <div
                key={i}
                className="w-[160px] flex flex-col  text-xl font-semibold text-orange-800"
              >
                <div className="border-2 border-amber-300 mb-2  rounded-2xl bg-amber-100  p-3 w-[100%] flex justify-between items-center shadow-lg">
                  <span>{day}</span>
                </div>

                {studentAllProgramData.map((studentProgramData, idy) => {
                  return (
                    <div className="flex flex-col" key={idy}>
                      <div>
                        {studentProgramData?.period === "sabah" &&
                          studentProgramData?.program[`${day}`]?.map(
                            (c, idx) => {
                              return (
                                <DailyCors
                                  key={`${day}-${c.period}-${idx}-${idy}`}
                                  data={{
                                    period: c.period,
                                    title: c.title,
                                    content: c.pageRanges,
                                    day,
                                    user,
                                    ...studentProgramData,
                                    i: idx,
                                  }}
                                />
                              );
                            }
                          )}
                      </div>
                      <div>
                        {studentProgramData?.period === "ogle" &&
                          studentProgramData?.program[`${day}`]?.map(
                            (c, idx) => {
                              /*  console.log(c); */
                              return (
                                <DailyCors
                                  key={`${day}-${c.period}-${idx}-${idy}`}
                                  data={{
                                    period: c.period,
                                    title: c.title,
                                    content: c.pageRanges,
                                    day,
                                    user,
                                    ...studentProgramData,
                                    i: idx,
                                  }}
                                />
                              );
                            }
                          )}
                      </div>

                      <div>
                        {studentProgramData?.period === "aksam" &&
                          studentProgramData?.program[`${day}`]?.map(
                            (c, idx) => {
                              /*  console.log(c); */
                              return (
                                <DailyCors
                                  key={`${day}-${c.period}-${idx}-${idy}`}
                                  data={{
                                    period: c.period,
                                    title: c.title,
                                    content: c.pageRanges,
                                    day,
                                    user,
                                    ...studentProgramData,
                                    i: idx,
                                  }}
                                />
                              );
                            }
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
