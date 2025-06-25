import { GrSchedule } from "react-icons/gr";
import { HiHome } from "react-icons/hi";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { BsBank } from "react-icons/bs";
import { useSelector } from "react-redux";

function MainNav() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mt-[15vh] ml-4 ">
      <ul className="flex flex-col gap-3">
        {/* <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-[5px]
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <HiHome />
            Home
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="time-table"
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-[5px]
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <GrSchedule />
            Çalışma Programı
          </NavLink>
        </li>

        <li>
          <NavLink
            to="question-bank"
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-[5px]
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <BsBank />
            Soru Bankası
          </NavLink>
        </li>

        {user?.role === "teacher" && (
          <li>
            <NavLink
              to="homework-tracking"
              className={({ isActive }) =>
                `flex items-center gap-3 p-4 rounded-[5px]
               ${isActive ? "bg-white" : "hover:bg-white"}`
              }
            >
              <AiOutlineSchedule />
              Ödev Takip
            </NavLink>
          </li>
        )}
        {/* <li>
          <NavLink
            to="students"
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-[5px]
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <PiStudentFill />
            Öğrenciler
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default MainNav;
