import { useNavigate } from "react-router";
import Adminpage from "./Adminpage";
import { useSelector } from "react-redux";

function ADashboard() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);

  return (
    <div>
      <Adminpage />
      <div className="p-5">
        <h1 className="font-semibold text-3xl mb-6">Hi {username}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/anotadd")}
            className="flex items-center justify-between bg-gradient-to-l from-green-600 to-green-400 cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            aria-label="Add Notification"
          >
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">NOTIFICATION</h1>
              <p className="font-serif text-white">ADD</p>
            </div>
            <i className="fa-solid fa-comment-medical text-4xl text-white"></i>
          </div>

          <div
            onClick={() => navigate("/anotview")}
            className="flex items-center justify-between bg-gradient-to-l from-sky-600 to-sky-400 cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            aria-label="View Notification"
          >
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">NOTIFICATION</h1>
              <p className="font-serif text-white">VIEW</p>
            </div>
            <i className="fa-solid fa-bell text-4xl text-white"></i>
          </div>

          <div
            onClick={() => navigate("/viewdoctors")}
            className="flex items-center justify-between bg-gradient-to-l from-purple-600 to-purple-400 cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            aria-label="View Doctors"
          >
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">DOCTORS</h1>
              <p className="font-serif text-white">VIEW</p>
            </div>
            <i className="fa-solid fa-user-doctor text-4xl text-white"></i>
          </div>

          <div
            onClick={() => navigate("/aviewaddedlist")}
            className="flex items-center justify-between bg-gradient-to-l from-orange-600 to-orange-400 cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            aria-label="View Schedule"
          >
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">SCHEDULE</h1>
              <p className="font-serif text-white">VIEW</p>
            </div>
            <i className="fa-solid fa-calendar-days text-4xl text-white"></i>
          </div>

          <div
            onClick={() => navigate("/viewusers")}
            className="flex items-center justify-between bg-gradient-to-l from-yellow-600 to-yellow-400 cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            aria-label="View Users"
          >
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">USERS</h1>
              <p className="font-serif text-white">VIEW</p>
            </div>
            <i className="fa-solid fa-users text-4xl text-white"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADashboard;
