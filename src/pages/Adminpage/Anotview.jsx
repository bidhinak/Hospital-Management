import axios from "axios";
import { useEffect, useState } from "react";
import Adminpage from "./Adminpage";
import { toast } from "react-toastify";

function Anotview() {
  const [notification, setNot] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/Notificationdetails"
        );
        setNot(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications");
      } finally {
        setloading(false);
      }
    })();
  }, []);

  const deletenot = async (id) => {
    try {
      const { status } = await axios.delete(
        `http://127.0.0.1:8000/api/Notificationdelete/${id}`
      );
      if (status === 204) {
        setNot((prev) => prev.filter((x) => x.id !== id));
        toast.success("Notification deleted successfully");
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("An error occurred while deleting the notification");
    }
  };

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
      <Adminpage />
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

      </div>
      ) : (
        <div className="relative overflow-x-auto mx-20 my-8 rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-blue-500 dark:text-white">
              <tr>
                <th scope="col" className="px-10 py-3">
                  Date
                </th>
                <th scope="col" className="px-10 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {notification.map((not) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={not.id}
                >
                  <td className="px-10 py-3">
                    {new Date(not.date).toLocaleDateString()}
                  </td>
                  <td className="px-10 py-3">{formatTimeTo12Hour(not.Time)}</td>
                  <td className="px-10 py-3">{not.description}</td>
                  <td className="px-10 py-3">
                    <button
                      className="bg-red-600 p-1 rounded-lg text-white"
                      onClick={() => deletenot(not.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Anotview;
