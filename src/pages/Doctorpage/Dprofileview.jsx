import { useSelector } from "react-redux";
import DHeader from "./DHeader";

function Dprofileview() {
  const { username } = useSelector((state) => state.user);
  const { email } = useSelector((state) => state.user);
  const { mobile } = useSelector((state) => state.user);
  const { department } = useSelector((state) => state.user);
  const { qualification } = useSelector((state) => state.user);
  const {photo}=useSelector((state)=>state.user);

  return (
    <div>
      <DHeader />
      <div className=" text-center flex flex-col gap-4 mt-2">
      <img className="object-contain size-56 self-center" src={`http://127.0.0.1:8000${photo}`} alt="no image" />
        <label>NAME</label>
        <h1>{username}</h1>
        <label>EMAIL</label>
        <h1>{email}</h1>
        <label>PHONE NO</label>
        <h1>{mobile}</h1>
        <label>QUALIFICATION</label>
        <h1>{qualification}</h1>
        <label>DEPARTMENT</label>
        <h1>{department}</h1>
        
      </div>
    </div>
  );
}

export default Dprofileview;
