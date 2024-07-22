import { useSelector } from "react-redux"
import DHeader from "./DHeader"
import { useNavigate } from "react-router"

function DDashboard() {
  const navigate=useNavigate();
  const {username}=useSelector(state=>state.user)
  return (
    <div>
      <DHeader/>
      <h1>Hi {username}</h1>
      <div className="flex  gap-4 ">
      <button className="text-center rounded-md bg-gray-600 p-4" onClick={()=>navigate("/dscheduleadd")}>create schedule</button>
      <button className="text-center rounded-md bg-gray-600 p-4" onClick={()=>navigate("/dscheduleview")}>view schedule</button>
      </div>
      
    </div> 
  )
}

export default DDashboard
