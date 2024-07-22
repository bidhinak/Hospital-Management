/* eslint-disable react/jsx-key */

import { NavLink, useNavigate } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const navItems = [
  { page: "HOME", link: "/udashboard" },
  { page: "ABOUT US", link: "/facilities" },
  { page: "PROFILE", link: "/uprofile" },
];

function UHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

 
  return (
    <div>
      <div className="flex flex-row justify-between p-8 bg-blue-400 text-white">
        <h1>HOSPITAL MANAGEMENT</h1>
        <li className="list-none">
          <input
            type="search"
            name="search"
            placeholder="search doctors or departments..."
            className=" bg-white text-black rounded-3xl px-3 py-1.5 w-96 p-2 outline-none"
          />
        </li>

        <ul className="flex flex-row gap-4 ">
          {navItems.map((ele) => (
            <NavLink to={ele.link} key={ele.link}>
              <li>{ele.page}</li>
            </NavLink>
          ))}
          <li
            className="cursor-pointer"
            onClick={() =>
              dispatch(updateUser(initialState), navigate("/"))
            }
          >
            LOGOUT
          </li>
        </ul>
      </div>

      
    </div>
  );
}

export default UHeader;
