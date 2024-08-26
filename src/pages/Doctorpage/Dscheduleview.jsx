import axios from "axios";
import { useEffect, useState } from "react";
import DHeader from "./DHeader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Dscheduleview() {
  const id = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [loading, setloading] = useState(false);
  const [popupVisibleId, setPopupVisibleId] = useState(null);

  const togglePopup = (id) => {
    setPopupVisibleId(id);
  };

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorscheduleget/${id}`,
          {}
        );
        if (data) {
          setSchedule(data);
        } else {
          console.log(Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false);
      }
    })();
  }, [id]);
  const deleteschedule = async (id) => {
    try {
      const { status } = await axios.delete(
        `http://127.0.0.1:8000/api/docscheduledelete/${id}`
      );
      if (status == 204) {
        setSchedule((prev) => prev.filter((x) => x.id !== id));
        toast.success("schedule deleted successfully");
      } else {
        toast.error("not deleted");
      }
    } catch (error) {
      console.log(error);
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
      <DHeader />
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : (
        <div className="relative overflow-x-auto  mx-20 my-8 rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-blue-500 dark:text-white">
              <tr>
                <th scope="col" className="px-10 py-3">
                  date
                </th>
                <th scope="col" className="px-10 py-3">
                  time
                </th>

                <th scope="col" className="px-6 py-3">
                  fee
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  delete
                </th>
              </tr>
            </thead>

            {schedule.map((s) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={s.id}
              >
                <td className="px-10 py-3">{s.date}</td>
                <td className="px-10 py-3">{formatTimeTo12Hour(s.time)}</td>

                <td className="px-10 py-3">{s.fee}</td>
                <td className="px-10 py-3">
                  {" "}
                  <button
                    className="bg-green-500 p-2 rounded-md text-white"
                    onClick={() => navigate(`/dbookview/${s.id}`)}
                  >
                    CHECK
                  </button>
                </td>

                <td className="px-10 py-3">
                  <button
                    className="bg-red-500 p-2 rounded-md text-white"
                    onClick={() => togglePopup(s.id)}
                  >
                    DELETE
                  </button>
                </td>
                {popupVisibleId === s.id && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className=" p-6 rounded-lg bg-white shadow-lg">
                      <h2 className="text-2xl text-black font-semibold mb-4">
                        Delete the Schedule?
                      </h2>
                      <span className="flex flex-row gap-10  pb-3 justify-evenly text-white text-xl">
                        <button
                          className="rounded-lg bg-gray-700 p-2 "
                          onClick={()=>togglePopup(null)}
                        >
                          CLOSE
                        </button>
                        <button
                          className="rounded-lg bg-red-700 px-4"
                          onClick={() => deleteschedule(s.id)}
                        >
                          YES
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default Dscheduleview;
