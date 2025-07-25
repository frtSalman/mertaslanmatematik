import { useSelector } from "react-redux";
import AddHomework from "../ui/AddHomework";
import HomeworkList from "../ui/HomeworkList";

function HomeworkTracking() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-5 min-h-[35vh]">
      <div className="mx-auto w-fit">
        {user?.role === "teacher" && <AddHomework teacherId={user.id} />}
      </div>
      <div>
        <HomeworkList user={user} />
      </div>
    </div>
  );
}

export default HomeworkTracking;
