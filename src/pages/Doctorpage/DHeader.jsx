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

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div>
      <div className="flex flex-row justify-between bg-gradient-to-t from-blue-300 p-8 bg-blue-700 text-white">
        <h1 className="text-black">HOSPITAL MANAGEMENT</h1>

        <ul className="flex flex-row gap-8 ">
          <li
            onClick={() => navigate("/ddashboard")}
            className="hover:text-gray-300 cursor-pointer"
          >
            HOME
          </li>

          <li
            onClick={() => navigate("/notification")}
            className="hover:text-gray-300 cursor-pointer"
          >
            NOTIFICATION
          </li>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-red-500 rounded-full cursor-pointer px-3 py-1 hover:text-gray-900"
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
