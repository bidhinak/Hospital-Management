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
      <div className="flex flex-row justify-between p-8 bg-gradient-to-t from-blue-200 bg-blue-700 text-white">
        <h1 className="shadow-md rounded-md p-2">HOSPITAL MANAGEMENT</h1>

        <ul className="flex flex-row gap-5 ">
        {visibleHome ? (
              <span onMouseLeave={hideHome}>
                <li
                  className="cursor-pointer  "
                  onClick={() => navigate("/adashboard")}
                >
                  HOME
                </li>
              </span>
            ) : (
              <span onMouseOver={showHome}>
                <i className="fa-solid shadow-md fa-house-user text-2xl cursor-pointer"></i>
              </span>
            )}
          <div className="relative group dropdown-menu-wrapper">
            <button
              onClick={toggleDropdown}
              className="bg-red-500 shadow-md rounded-full cursor-pointer px-3 py-1  hover:text-gray-900"
            >
              {firstLetter}
            </button>
            {dropdown && (
              <ul className="absolute z-20 right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
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
