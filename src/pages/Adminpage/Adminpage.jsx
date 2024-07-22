import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";
const navItems = [
  { page: "HOME", link: "/adashboard" },
  { page: "ABOUT US", link: "/facilities" },
  { page: "PROFILE", link: "" },
  
];
function Adminpage() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {username}= useSelector(state=>state.user)
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
      <h1>hi {username}</h1>
    
    </div>
  )
}

export default Adminpage
