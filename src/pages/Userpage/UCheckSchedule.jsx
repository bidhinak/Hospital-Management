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
  const [reportedSchedules, setReportedSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorscheduleget/${id}`
        );
        if (data) {
          setList(data);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchReportedSchedules = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/userbookget`
        );
        if (data) {
          setReportedSchedules(data.map((report) => report.schedule));
        }
      } catch (error) {
        toast.error("Failed to load reported schedules");
      }
    };

    fetchReportedSchedules();

    fetchData();
  }, [id]);

  const book = async () => {
    try {
      const { status } = await axios.post(
        `http://127.0.0.1:8000/api/userbook/${selectedScheduleId}/`,
        { user: userid, schedule: selectedScheduleId, status: 1 }
      );
      if (status === 208) {
        toast.error("Sorry! This schedule is already booked.");
      } else {
        setReportedSchedules((prev) => [...prev, selectedScheduleId]);
        toast.success(
          "Your schedule is booked!Check Schedule for more details"
        );
      }
    } catch (error) {
      console.error("Error booking schedule:", error);
    }
    togglePopup();
  };

  const formatTimeTo12Hour = (timeString) => {
    const date = new Date(timeString);
    if (!isNaN(date.getTime())) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }

    const timeParts = timeString.split(":");
    if (timeParts.length >= 2) {
      let hours = parseInt(timeParts[0], 10);
      let minutes = parseInt(timeParts[1], 10);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }

    return "Invalid time";
  };

  const togglePopup = (scheduleId = null) => {
    setSelectedScheduleId(scheduleId);
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UHeader />
      {loading ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : list.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          {list.map((l) => (
            <div
              key={l.id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">Date</h3>
                <p className="text-lg text-gray-700 mb-4">{l.date}</p>

                <h3 className="text-xl font-semibold mb-2">Time</h3>
                <p className="text-lg text-gray-700 mb-4">
                  {formatTimeTo12Hour(l.time)}
                </p>

                <h3 className="text-xl font-semibold mb-2">Fee</h3>
                <p className="text-lg text-gray-700">{l.fee}</p>
              </div>
              {reportedSchedules.includes(l.id) ? (
                <button
                  className="bg-gray-500 p-2 rounded-md text-white transition"
                  disabled
                >
                  Already booked
                </button>
              ) : (
                <button
                  className="mt-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => togglePopup(l.id)}
                >
                  Book
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[70vh]">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            No schedules added yet.
          </h1>
          <p className="text-lg text-gray-700">
            Kindly check other doctors or visit later.
          </p>
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Are you sure?</h2>
            <div className="flex justify-evenly">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                onClick={togglePopup}
              >
                Close
              </button>
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={book}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UCheckSchedule;
