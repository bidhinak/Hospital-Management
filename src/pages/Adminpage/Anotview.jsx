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
        setNot(data.reverse());
      } catch (error) {
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
      toast.error("An error occurred while deleting the notification");
    }
  };

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
    <div>
      <Adminpage />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mr-1"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mr-1"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      ) : (
        <div className="overflow-x-auto mx-4 md:mx-20 my-8 rounded-md shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs text-gray-100 uppercase bg-blue-600 dark:bg-blue-700">
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
                <th scope="col" className="px-6 py-3 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {notification.map((not) => (
                <tr
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
                  key={not.id}
                >
                  <td className="px-6 py-3">
                    {new Date(not.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{formatTimeTo12Hour(not.Time)}</td>
                  <td className="px-6 py-3">{not.description}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg shadow-md transition-all duration-200 ease-in-out"
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
