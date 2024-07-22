import axios from "axios";
import { useEffect, useState } from "react";

function Ascheduleview() {
    const [schedule,setSchedule]=useState("");
    useEffect(()=>{
        (async()=>{
          const {data}=await axios.get("http://127.0.0.1:8000/api/doctorscheduleadd");
          if (data) {
            setSchedule(data)
          }else{
            console.log(Error);
          }
        })();
    },[])
  return (
    <div>
      <div>
        <h1>{schedule.date}</h1>
        <h1>{schedule.time}</h1>
        <h1>{schedule.fee}</h1>
      </div>
    </div>
  )
}

export default Ascheduleview
