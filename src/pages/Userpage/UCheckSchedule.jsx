import { useEffect, useState } from "react";
import UHeader from "./UHeader";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function UCheckSchedule() {
  const { id } = useParams();
  const userid = useSelector((state) => state.user.id);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorscheduleget/${id}`
        );
        if (data) {
          setList(data);
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const book = async () => {
    try {
      const { status } = await axios.post(
        `http://127.0.0.1:8000/api/userbook/${selectedScheduleId}/`,
        { user: userid, schedule: selectedScheduleId, status: 1 }
      );
      if (status === 208) {
        toast.error("Sorry! This Schedule is already booked");
      } else {
        toast.success("Your Schedule is booked! Kindly reach in time.");
      }
    } catch (error) {
      console.log(error);
    }
    togglePopup(); 
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

    console.error("Invalid time string:", timeString);
    return "Invalid time";
  };

  const togglePopup = (scheduleId = null) => {
    setSelectedScheduleId(scheduleId);
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div>
      <UHeader />
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : list.length !== 0 ? (
        <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-10 p-3 gap-3">
          {list.map((l) => (
            <div
              key={l.id}
              className="flex flex-col gap-3 bg-red-300 p-3 w-auto rounded-md"
            >
              <label className="text-lg font-semibold">DATE</label>
              <h1 className="text-center text-lg shadow-lg px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {l.date}
              </h1>

              <label className="text-lg font-semibold">TIME</label>
              <h1 className="text-center text-lg shadow-lg px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {formatTimeTo12Hour(l.time)}
              </h1>

              <label className="text-lg font-semibold">FEE</label>
              <h1 className="text-center text-lg shadow-lg px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {l.fee}
              </h1>

              <button
                className="bg-green-700 p-2 rounded-md text-white"
                onClick={() => togglePopup(l.id)} 
              >
                BOOK
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center pt-52">
          <h1 className="text-4xl font-bold text-blue-500">
            No schedules Added yet.
          </h1>
          <p className="text-xl font-semibold text-gray-700">
            Kindly check other doctors or visit later.
          </p>
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15">
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Are you sure?</h2>
            <div className="flex flex-row gap-10 justify-evenly pb-3 text-white text-xl">
              <button
                className="bg-gray-500 p-2 rounded-lg"
                onClick={togglePopup}
              >
                CLOSE
              </button>
              <button
                className="bg-red-700 p-3 rounded-lg"
                onClick={book} 
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UCheckSchedule;
