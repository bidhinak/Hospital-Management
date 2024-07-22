import axios from "axios";
import { useEffect, useState } from "react";
import DHeader from "./DHeader";
import { useSelector } from "react-redux";

function Dscheduleview() {
  const  {username}=useSelector(state=>state.user)
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/doctorscheduleadd"
      );
      console.log(data);
      if (data) {
        setSchedule(data);
      } else {
        console.log(Error);
      }
    })();
  }, []);
  return (
    <div>
      <DHeader />
      <div>
        <h1>
          {schedule.map((s) => (
            <div key={s.id}>
             <h1>{s.user}</h1>
             {username}
              <h1>{s.date}</h1>
              <h1>{s.time}</h1>
              <h1>{s.fee}</h1>
            </div>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default Dscheduleview;
