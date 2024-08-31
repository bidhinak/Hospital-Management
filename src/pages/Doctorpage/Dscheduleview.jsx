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
  const [loading, setLoading] = useState(false);
  const [popupVisibleId, setPopupVisibleId] = useState(null);
  const [reportedSchedules, setReportedSchedules] = useState([]);
  const [statusData, setStatusData] = useState({
    date: "",
    time: "",
    fee: "",
    schedule_id: "",
    doc_id: id,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (schedule) => {
    setStatusData({
      date: schedule.date,
      time: formatTimeTo12Hour(schedule.time),
      fee: schedule.fee,
      schedule_id: schedule.id,
      doc_id: id,
    });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const togglePopup = (id) => {
    setPopupVisibleId(id);
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorscheduleget/${id}`
        );
        if (data) {
          setSchedule(data.reverse());
        }
      } catch (error) {
        toast.error("Failed to load schedules");
      } finally {
        setLoading(false);
      }
    };

    const fetchReportedSchedules = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/docreportget/${id}`
        );
        if (data) {
          setReportedSchedules(data.map((report) => report.schedule_id));
        }
      } catch (error) {
        toast.error("Failed to load reported schedules");
      }
    };

    fetchSchedule();
    fetchReportedSchedules();
  }, [id]);

  const deleteschedule = async (scheduleId) => {
    try {
      setLoading(true);
      const { status } = await axios.delete(
        `http://127.0.0.1:8000/api/docscheduledelete/${scheduleId}/`
      );
      if (status === 204) {
        setSchedule((prev) => prev.filter((x) => x.id !== scheduleId));
        toast.success("Schedule deleted successfully");
      } else {
        toast.error("Failed to delete schedule");
      }
    } catch (error) {
      toast.error("Error occurred while deleting");
    } finally {
      setLoading(false);
    }
  };

  const done = async () => {
    try {
      setLoading(true);
      const { status } = await axios.post(
        `http://127.0.0.1:8000/api/docreportadd/${statusData.schedule_id}/`,
        statusData
      );

      if (status === 208) {
        closePopup();
      } else {
        setReportedSchedules((prev) => [...prev, statusData.schedule_id]);
        toast.success("Report added successfully");
      }
    } catch (error) {
      toast.error("Failed to add report");
    } finally {
      setLoading(false);
    }
  };

  const formatTimeTo12Hour = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DHeader />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto mx-4 sm:mx-6 md:mx-20 my-8 rounded-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Fee
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr
                  className="bg-white border-b text-white dark:bg-gray-800 dark:border-gray-700"
                  key={s.id}
                >
                  <td className="px-6 py-4">{s.date}</td>
                  <td className="px-6 py-4">{formatTimeTo12Hour(s.time)}</td>
                  <td className="px-6 py-4">{s.fee}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white transition"
                      onClick={() => navigate(`/dbookview/${s.id}`)}
                      aria-label="Check Booking"
                    >
                      CHECK
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {reportedSchedules.includes(s.id) ? (
                      <button
                        className="bg-gray-500 p-2 rounded-md text-white transition"
                        disabled
                      >
                        Reported
                      </button>
                    ) : (
                      <button
                        onClick={() => openPopup(s)}
                        className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white transition"
                        aria-label="Change Status"
                      >
                        STATUS
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white transition"
                      onClick={() => togglePopup(s.id)}
                      aria-label="Delete Schedule"
                    >
                      DELETE
                    </button>
                    {popupVisibleId === s.id && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
                        <div className="p-6 rounded-lg bg-gray-800 shadow-lg max-w-sm w-full">
                          <h2 className="text-2xl font-semibold mb-4">
                            Delete the Schedule?
                          </h2>
                          <div className="flex justify-between">
                            <button
                              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                              onClick={() => togglePopup(null)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition"
                              onClick={() => deleteschedule(s.id)}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isPopupOpen && (
        <div className="absolute z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Schedule completed?
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={statusData.date}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  value={statusData.time}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fee
                </label>
                <input
                  type="text"
                  name="fee"
                  value={statusData.fee}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    done(), closePopup();
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closePopup}
                >
                  No
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dscheduleview;
