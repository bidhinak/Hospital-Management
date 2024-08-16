import { useSelector } from "react-redux";
import UHeader from "./UHeader";

function Uprofile() {
    const { username,email,mobile } = useSelector((state) => state.user);
  return (
    <div>
      
      <UHeader />
      <div className=" text-center items-center flex flex-col gap-5 pt-3">
        <h1 className="text-3xl underline text-purple-500">Profile of {username}</h1>
        <label className="text-lg font-semibold ">NAME</label>
        <h1 className="text-center text-lg shadow-lg w-[50%] px-3 py-1 rounded-md shadow-gray-500 font-normal">{username}</h1>
        <label className="text-lg font-semibold ">EMAIL</label>
        <h1 className="text-center text-lg shadow-lg w-[50%] px-3 py-1 rounded-md shadow-gray-500 font-normal">{email}</h1>
        <label className="text-lg font-semibold ">PHONE NO</label>
        <h1 className="text-center text-lg shadow-lg w-[50%] px-3 py-1 rounded-md shadow-gray-500 font-normal">{mobile}</h1>
       
      </div>
    </div>
  )
}

export default Uprofile
