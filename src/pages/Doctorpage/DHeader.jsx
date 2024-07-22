import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";

const navItems = [
    { page: "HOME", link: "/ddashboard" },
    { page: "ABOUT US", link: "/facilities" },
    { page: "PROFILE", link: "/dprofileview" },
    {page: "NOTIFICATION", link: "/notification" },
    
  ];
function DHeader() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  return (
    <div>
      <div className="flex flex-row justify-between p-8 bg-blue-400 text-white">
      <h1 className="text-black">HOSPITAL MANAGEMENT</h1>

        <ul className="flex flex-row gap-5 ">
          {navItems.map((ele) => (
            <NavLink to={ele.link} key={ele.link}>
              <li>{ele.page}</li>
            </NavLink>
          ))}
          <li className="cursor-pointer" onClick={()=>dispatch(updateUser(initialState),navigate("/"))}>LOGOUT</li>
        </ul>
      </div>
    </div>
  )
}

export default DHeader
