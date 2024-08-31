import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";
import { useState } from "react";

function DHeader() {
  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstLetter = username.charAt(0);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);
  const [visibleHome, setVisibleHome] = useState(false);
  const [visibleNotification, setVisibleNotification] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);

  const showHome = () => setVisibleHome(true);
  const hideHome = () => setVisibleHome(false);

  const showNotification = () => setVisibleNotification(true);
  const hideNotification = () => setVisibleNotification(false);
  const showReport = () => setVisibleReport(true);
  const hideReport = () => setVisibleReport(false);

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-6 bg-gradient-to-r from-blue-700 to-purple-500 text-white shadow-lg">
        <div className="relative inline-block">
          <h1 className="tracking-wider">HOSPITAL MANAGEMENT</h1>
        </div>
        <ul className=" flex-row gap-8 inline-flex ">
          {visibleHome ? (
            <span onMouseLeave={hideHome}>
              <li
                onClick={() => navigate("/ddashboard")}
                className=" cursor-pointer"
              >
                HOME
              </li>
            </span>
          ) : (
            <span onMouseOver={showHome}>
              <i className="fa-solid shadow-sm fa-house-user text-2xl cursor-pointer"></i>
            </span>
          )}
          {visibleReport ? (
            <span onMouseLeave={hideReport}>
              <li
                onClick={() => navigate("/dreport")}
                className=" cursor-pointer"
              >
                REPORT
              </li>
            </span>
          ) : (
            <span onMouseOver={showReport}>
              <i className="fa-regular fa-rectangle-list text-2xl cursor-pointer"></i>
            </span>
          )}

          {visibleNotification ? (
            <span onMouseLeave={hideNotification}>
              <li
                onClick={() => navigate("/notification")}
                className=" cursor-pointer relative"
              >
                NOTIFICATION
              </li>
            </span>
          ) : (
            <span onMouseOver={showNotification}>
              <i className="fa-solid fa-bell cursor-pointer text-2xl"></i>
            </span>
          )}

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-semibold shadow-md hover:bg-red-600"
            >
              {firstLetter}
            </button>

            {dropdown && (
              <ul className="absolute z-20 right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                <li onClick={() => navigate("/dprofileview")}>
                  <a className="block  px-4 py-2  text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <span className="flex  justify-between">
                      PROFILE
                      <i className="fa-solid fa-user-doctor"></i>
                    </span>
                  </a>
                </li>
                <li
                  onClick={() => {
                    dispatch(updateUser(initialState));
                    navigate("/");
                  }}
                >
                  <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <span className="flex justify-between">
                      LOGOUT
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default DHeader;
