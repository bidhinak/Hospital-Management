import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";
import { useState } from "react";
const navItems = [
  { page: "HOME", link: "/adashboard" },
  // { page: "ABOUT US", link: "/facilities" },
];
function Adminpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const { username } = useSelector((state) => state.user);
  const firstLetter = username.charAt(0);

  return (
    <div>
      <div className="flex flex-row justify-between p-8 bg-gradient-to-t from-blue-200 bg-blue-700 text-white">
        <h1 className="text-black">HOSPITAL MANAGEMENT</h1>

        <ul className="flex flex-row gap-5 ">
          {navItems.map((ele) => (
            <NavLink to={ele.link} key={ele.link}>
              <li className="hover:text-gray-500 ">{ele.page}</li>
            </NavLink>
          ))}
          <div className="relative group dropdown-menu-wrapper">
            <button
              onClick={toggleDropdown}
              className="bg-red-500 rounded-full cursor-pointer px-3 py-1  hover:text-gray-900"
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
