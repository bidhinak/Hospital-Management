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
  const showHome = () => setVisibleHome(true);
  const hideHome = () => setVisibleHome(false);

  const showNotification = () => setVisibleNotification(true);
  const hideNotification = () => setVisibleNotification(false);

  return (
    <div>
      <div className="flex flex-row justify-between bg-gradient-to-t from-blue-300 p-8 bg-blue-700 text-white">
        <div className="relative inline-block">
          <h1 className="shadow-md rounded-md p-2">HOSPITAL MANAGEMENT</h1>
        </div>
        <ul className="flex flex-row gap-8 ">
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
              <i className="fa-solid fa-house-user text-xl cursor-pointer"></i>
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
              <i className="fa-solid fa-bell cursor-pointer text-xl"></i>
            </span>
          )}

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gray-400 shadow-md rounded-full cursor-pointer px-3 py-1 hover:text-sky-600"
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
