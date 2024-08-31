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
        setNot(data.reverse());
      } catch (error) {
        // Handle error
      }
    })();
  }, []);

  const formatTimeTo12Hour = (timeString) => {
    const date = new Date(timeString);
    if (!isNaN(date.getTime())) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }

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

    return "Invalid time";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-500">
      <DHeader />
      <div className="overflow-x-auto mx-4 md:mx-20 my-8 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {notification.map((not) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                key={not.id}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(not.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTimeTo12Hour(not.Time)}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {not.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DNotview;
