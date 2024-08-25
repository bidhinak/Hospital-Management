import { useNavigate } from "react-router";
import Adminpage from "./Adminpage";
import { useSelector } from "react-redux";

function ADashboard() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);


  return (
    <div>
      <Adminpage />
      <h1 className="font-semibold p-2 text-3xl">Hi {username}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 justify-center">
  <div
    onClick={() => navigate("/anotadd")}
    className="flex  items-center justify-between bg-gradient-to-l from-green-800 to-green-400 cursor-pointer p-4 w-full md:w-[80%] rounded-lg shadow-lg hover:opacity-90  transition-opacity"
    aria-label="Add Notification"
  >
    <span className="flex flex-col gap-4">
      <h1 className="text-xl text-white font-bold">NOTIFICATION</h1>
      <p className="font-serif text-white">ADD</p>
    </span>
    <span className="text-3xl text-white">
      <i className="fa-solid fa-comment-medical"></i>
    </span>
  </div>

  <div
    onClick={() => navigate("/anotview")}
    className="flex items-center justify-between bg-gradient-to-l from-sky-800 to-sky-400 cursor-pointer p-4 w-full md:w-[80%] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
    aria-label="View Notification"
  >
    <span className="flex flex-col gap-4">
      <h1 className="text-xl text-white font-bold">NOTIFICATION</h1>
      <p className="font-serif text-white">VIEW</p>
    </span>
    <span className="text-3xl text-white">
      <i className="fa-solid fa-bell"></i>
    </span>
  </div>

  <div
    onClick={() => navigate("/viewdoctors")}
    className="flex items-center justify-between bg-gradient-to-l from-purple-900 to-purple-500 cursor-pointer p-4 w-full md:w-[80%] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
    aria-label="View Doctors"
  >
    <span className="flex flex-col gap-4">
      <h1 className="text-xl text-white font-bold">DOCTORS</h1>
      <p className="font-serif text-white">VIEW</p>
    </span>
    <span className="text-3xl text-white">
      <i className="fa-solid fa-user-doctor"></i>
    </span>
  </div>

  <div
    onClick={() => navigate("/aviewaddedlist")}
    className="flex items-center justify-between bg-gradient-to-l from-orange-800 to-orange-400 cursor-pointer p-4 w-full md:w-[80%] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
    aria-label="View Schedule"
  >
    <span className="flex flex-col gap-4">
      <h1 className="text-xl text-white font-bold">SCHEDULE</h1>
      <p className="font-serif text-white">VIEW</p>
    </span>
    <span className="text-3xl text-white">
      <i className="fa-solid fa-calendar-days"></i>
    </span>
  </div>
  <div
    onClick={() => navigate("/viewusers")}
    className="flex items-center justify-between bg-gradient-to-l from-yellow-800 to-yellow-400 cursor-pointer p-4 w-full md:w-[80%] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
    aria-label="View Schedule"
  >
    <span className="flex flex-col gap-4">
      <h1 className="text-xl text-white font-bold">USERS</h1>
      <p className="font-serif text-white">VIEW</p>
    </span>
    <span className="text-3xl text-white">
    <i className="fa-solid fa-users"></i>    </span>
  </div>
</div>

    </div>
  );
}

export default ADashboard;
