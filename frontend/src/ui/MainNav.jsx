import { GrSchedule } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoAnalyticsOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { useSelector } from "react-redux";

function MainNav() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="md:m-auto">
      <ul className="flex flex-wrap gap-1 overflow-x-auto md:py-2 md:flex-col md:gap-3 md:overflow-visible justify-evenly">
        <li className="flex-shrink-0">
          <NavLink
            to="time-table"
            className={({ isActive }) =>
              `flex items-center gap-1 p-2 rounded text-sm md:text-base md:gap-3 md:p-4
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <GrSchedule />
            Çalışma Programı
          </NavLink>
        </li>

        {user?.role === "teacher" && (
          <li className="flex-shrink-0">
            <NavLink
              to="homework-tracking"
              className={({ isActive }) =>
                `flex items-center gap-1 p-2 rounded text-sm md:text-base md:gap-3 md:p-4
               ${isActive ? "bg-white" : "hover:bg-white"}`
              }
            >
              <AiOutlineSchedule />
              Ödev Takip
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1 p-2 rounded text-sm md:text-base md:gap-3 md:p-4
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <IoAnalyticsOutline />
            Analiz
          </NavLink>
        </li>

        <li className="flex-shrink-0">
          <NavLink
            to="question-bank"
            className={({ isActive }) =>
              `flex items-center gap-1 p-2 rounded text-sm md:text-base md:gap-3 md:p-4
               ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            <BsBank />
            Soru Bankası
          </NavLink>
        </li>

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
