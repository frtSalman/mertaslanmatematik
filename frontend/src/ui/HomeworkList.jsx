import useFetchHomeworks from "../hooks/useFetchHomeworks";
import Spinner from "./Spinner";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaSort } from "react-icons/fa";

import useDeleteHomework from "../hooks/useDeleteHomework";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import {
  closeModal,
  openEdit,
  openModal,
  openSort,
} from "../slices/timeTableHomeworkSlice";
import { useState } from "react";
import StudentSort from "./StudentSort";
import HomeworkStatusBadge from "./HomeworkStatusBagde";
import HomeworkSort from "./HomeworkSort";
import DateSort from "./DateSort";
import DeadlineSort from "./DeadlineSort";
import UpdateHomework from "./UpdateHomework";

function HomeworkList({ user }) {
  const [studentSort, setStudentSort] = useState(false);
  const [homeworkSort, setHomeworkSort] = useState(false);
  const [dateSort, setDateSort] = useState(false);
  const [deadLineSort, setDeadLineSort] = useState(false);
  const [homework, setHomework] = useState({});
  const [sortedData, setSortedData] = useState();

  const { isModalOn, isShowSort, isEditOn } = useSelector(
    (state) => state.timeTableHomework
  );
  const dispatch = useDispatch();

  const { data: allHomeworks, isPending } = useFetchHomeworks();

  const { mutate: deleteHomework, isPending: isDeleting } = useDeleteHomework();

  if (isPending) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <Spinner />
      </div>
    );
  }

  function handleDelete(id) {
    deleteHomework(id);
  }

  function handleSort({
    names = [],
    homeworks = [],
    dates = [],
    deadLines = [],
  }) {
    const fData = [];

    if (names.length > 0) {
      allHomeworks.map((row) => {
        if (names.includes(row.student.name)) {
          fData.push(row);
        }
      });

      setSortedData(fData);
    }

    if (homeworks.length > 0) {
      allHomeworks.map((row) => {
        if (homeworks.includes(row.homeworkContent.title)) {
          fData.push(row);
        }
      });

      setSortedData(fData);
    }

    if (dates.length > 0) {
      allHomeworks.map((row) => {
        if (dates.includes(row.created_at)) {
          fData.push(row);
        }
      });

      setSortedData(fData);
    }

    if (deadLines.length > 0) {
      allHomeworks.map((row) => {
        if (deadLines.includes(row.homeworkDeadline)) {
          fData.push(row);
        }
      });

      setSortedData(fData);
    }

    dispatch(closeModal());
  }

  return (
    <div className="max-h-[510px] overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-lg shadow-lg border border-gray-100 w-fit m-auto">
      {/* Table Header */}

      {isModalOn && isShowSort && (
        <Modal type="sort">
          {studentSort && (
            <StudentSort data={allHomeworks} onSort={handleSort} />
          )}
          {homeworkSort && (
            <HomeworkSort data={allHomeworks} onSort={handleSort} />
          )}
          {dateSort && <DateSort data={allHomeworks} onSort={handleSort} />}
          {deadLineSort && (
            <DeadlineSort data={allHomeworks} onSort={handleSort} />
          )}
        </Modal>
      )}

      {isModalOn && isEditOn && (
        <Modal type="updateHomework">
          <div className="max-h-[70vh] overflow-y-auto">
            {" "}
            <UpdateHomework data={homework} />
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-[50px_repeat(6,_minmax(100px,1fr))] bg-gray-50 backdrop-blur-sm sticky top-0 text-lg">
        <div
          key="no"
          className="p-3 font-semibold text-center text-gray-700 border-b border-gray-200 text-md"
        >
          No
        </div>
        <div
          key="student"
          className="flex flex-row items-start justify-between gap-3 p-3 font-semibold text-gray-700 border-b border-gray-200"
        >
          <span className="m-auto">Öğrenci</span>
          {user.role === "teacher" && (
            <button
              className="my-1"
              onClick={() => {
                dispatch(openModal());
                dispatch(openSort());
                setHomeworkSort(false);
                setDateSort(false);
                setDeadLineSort(false);
                setStudentSort(true);
              }}
            >
              <FaSort />
            </button>
          )}
        </div>
        <div
          key="homework"
          className="flex flex-row items-start justify-between gap-3 p-3 font-semibold text-center text-gray-700 border-b border-gray-200 "
        >
          <span className="m-auto">Ödev</span>
          <button
            className="my-1"
            onClick={() => {
              dispatch(openModal());
              dispatch(openSort());
              setStudentSort(false);
              setDateSort(false);
              setDeadLineSort(false);
              setHomeworkSort(true);
            }}
          >
            <FaSort />
          </button>
        </div>
        <div
          key="given-date"
          className="flex flex-row items-start justify-between gap-3 p-3 font-semibold text-center text-gray-700 border-b border-gray-200 "
        >
          <span className="m-auto">Veriliş Tarihi</span>
          <button
            className="my-1"
            onClick={() => {
              dispatch(openModal());
              dispatch(openSort());
              setStudentSort(false);
              setHomeworkSort(false);
              setDeadLineSort(false);
              setDateSort(true);
            }}
          >
            <FaSort />
          </button>
        </div>
        <div
          key="due-date"
          className="flex flex-row items-start justify-between gap-3 p-3 font-semibold text-center text-gray-700 border-b border-gray-200 "
        >
          <span className="m-auto">Teslim Tarihi</span>
          <button
            className="my-1"
            onClick={() => {
              dispatch(openModal());
              dispatch(openSort());
              setStudentSort(false);
              setHomeworkSort(false);
              setDateSort(false);
              setDeadLineSort(true);
            }}
          >
            <FaSort />
          </button>
        </div>
        {/* <div
          key="documents"
          className="p-3 font-semibold text-center text-gray-700 border-b border-gray-200"
        >
          Dokümanlar
        </div>
        <div
          key="photos"
          className="p-3 font-semibold text-center text-gray-700 border-b border-gray-200"
        >
          Fotoğraflar
        </div> */}
        <div
          key="status"
          className="p-3 font-semibold text-center text-gray-700 border-b border-gray-200"
        >
          Durum
        </div>
        <div
          key="actions"
          className="p-3 font-semibold text-center text-gray-700 border-b border-gray-200"
        >
          İşlemler
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {(sortedData || allHomeworks).map((homework, i) => (
          <div
            key={i}
            className={`grid grid-cols-[50px_repeat(6,_minmax(100px,1fr))]  ${
              homework.homeworkStatus ? "bg-green-50" : "bg-orange-50"
            }  transition-colors`}
          >
            {/* Number */}
            <div className="flex items-center justify-center p-2 text-gray-600">
              <span className="font-medium text-gray-900 ">{i + 1}</span>
            </div>

            {/* Student Name */}
            <div className="flex items-center justify-center p-2">
              <span className="font-medium text-gray-900 ">
                {homework.student.name}
              </span>
            </div>

            {/* Homework Content */}
            <div className="flex items-center p-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <span className="leading-snug text-gray-700 line-clamp-2">
                {homework.homeworkContent.title}
              </span>
            </div>

            {/* Dates */}
            {[homework.createdAt, homework.homeworkDeadline].map(
              (date, idx) => (
                <div key={idx} className="flex items-center justify-center p-2">
                  <span className="text-gray-600 ">
                    {new Date(date).toLocaleDateString()}
                  </span>
                </div>
              )
            )}

            {/* Documents */}
            {/* <div className="flex items-center justify-center p-2">
              <span className="text-blue-600 cursor-pointer hover:text-blue-800">
                {homework.homeworkFilePath && "View Document →"}
              </span>
            </div> */}

            {/* Photos */}
            {/* <div className="flex items-center justify-center p-2">
              <span className="text-blue-600 cursor-pointer hover:text-blue-800">
                {homework.homeworkPicPaths && "View Photos →"}
              </span>
            </div> */}

            {/* Status */}
            <div className="flex items-center justify-center p-2">
              <HomeworkStatusBadge homework={homework} />
            </div>

            {/* Actions */}
            <div
              className="flex items-center justify-center p-2 space-x-2"
              key={i}
            >
              <button
                className="p-1 transition rounded-md group hover:bg-blue-500"
                onClick={() => {
                  dispatch(openModal());
                  dispatch(openEdit());
                  setHomework(homework);
                }}
              >
                <MdEdit className="text-blue-500 transition group-hover:text-white" />
              </button>

              <button
                className="p-1 transition rounded-md group hover:bg-red-400"
                onClick={() => handleDelete(homework.id)}
              >
                <RiDeleteBin6Line className="text-red-500 transition group-hover:text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeworkList;
