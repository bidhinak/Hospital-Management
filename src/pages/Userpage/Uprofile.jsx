import { useSelector } from "react-redux";
import UHeader from "./UHeader";

function Uprofile() {
    const { username } = useSelector((state) => state.user);
    const { email } = useSelector((state) => state.user);
    const { mobile } = useSelector((state) => state.user);
  return (
    <div>
      
      <UHeader />
      <div className=" text-center flex flex-col gap-4 mt-2">
        <label>NAME</label>
        <h1>{username}</h1>
        <label>EMAIL</label>
        <h1>{email}</h1>
        <label>PHONE NO</label>
        <h1>{mobile}</h1>
       
      </div>
    </div>
  )
}

export default Uprofile
