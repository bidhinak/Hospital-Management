import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { initialState, updateUser } from "../../redux/slices/userSlice";
import { useState } from "react";

function Adminpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const { username } = useSelector((state) => state.user);
  const firstLetter = username.charAt(0);
  const [visibleHome, setVisibleHome] = useState(false);
  const showHome = () => setVisibleHome(true);
  const hideHome = () => setVisibleHome(false);

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-6 bg-gradient-to-r from-blue-700 to-purple-500 text-white shadow-lg">
        <h1 className="  tracking-wider">HOSPITAL MANAGEMENT</h1>
        <ul className="flex items-center space-x-8">
          {visibleHome ? (
            <li onMouseLeave={hideHome} onClick={() => navigate("/adashboard")}>
              <span className="text-lg font-medium cursor-pointer">HOME</span>
            </li>
          ) : (
            <span onMouseOver={showHome}>
              <i className="fa-solid fa-house-user text-2xl cursor-pointer hover:text-gray-300"></i>
            </span>
          )}
          <div className="relative group dropdown-menu-wrapper">
            <button
              onClick={toggleDropdown}
              className="bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-semibold shadow-md hover:bg-red-600"
            >
              {firstLetter}
            </button>
            {dropdown && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                <li
                  onClick={() =>
                    dispatch(updateUser(initialState), navigate("/"))
                  }
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

export default Adminpage;
