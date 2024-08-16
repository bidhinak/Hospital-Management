import axios from "axios";
import { useEffect, useState } from "react";
import DHeader from "./DHeader";

function DNotview() {
  
        const [notification, setNot] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/Notificationdetails"
        );
        setNot(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [notification]);
  const formatTimeTo12Hour = (timeString) => {
    // Try to parse the string as a full DateTime string first
    const date = new Date(timeString);
  
    if (!isNaN(date.getTime())) {
      let hours = date.getHours(); // Use getHours() for local time
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // '0' hour should be '12'
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }
  
    // If date parsing fails, assume timeString is just HH:MM:SS
    const timeParts = timeString.split(":");
    if (timeParts.length >= 2) {
      let hours = parseInt(timeParts[0], 10);
      let minutes = parseInt(timeParts[1], 10);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }
  
    // If all else fails, return a default or error message
    console.error("Invalid time string:", timeString);
    return "Invalid time";
  };
  return (
    <div>
      <DHeader />
      <div className="relative overflow-x-auto  mx-20 my-8 rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" className="px-10 py-3" >date</th>
            <th scope="col" className="px-10 py-3" >time</th>

            <th scope="col" className="px-6 py-3">description</th>
          </tr>
          </thead>
       
          {notification.map((not) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={not.id}
            >
              <td className="px-10 py-3">{new Date(not.date).toLocaleDateString()}</td>
              <td className="px-10 py-3">{formatTimeTo12Hour(not.Time)}</td>

              <td className="px-10 py-3">{not.description}</td>
            </tr>
          ))}
        
      </table>
      </div>
    </div>
  );
   
}

export default DNotview
