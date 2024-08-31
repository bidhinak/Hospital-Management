/* eslint-disable no-empty */
import { useEffect, useState, useRef } from "react";
import UHeader from "./UHeader";
import axios from "axios";
import { useSelector } from "react-redux";

function UBookedSchedule() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const [views, setViews] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const id = useSelector((state) => state.user.id);
  const printRef = useRef();

  const handleClose = () => {
    setIsVisible(false);
    setViews(null);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;

    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/userschedulestatus/${id}`
        );
        if (data.length > 0) {
          setStatus(data);
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const view = async (scheduleId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/userscheduleview/${scheduleId}`
      );
      setViews(data);
      setIsVisible(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UHeader />
      <h1 className="text-2xl text-green-500 font-semibold mt-2  text-center">
        View Booked Schedules
      </h1>

      {loading ? (
        <div className="flex justify-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : status.length > 0 ? (
        <div className="ml-5">
          <h1 className="font-semibold text-xl">
            Select your Bookings to see Schedules
          </h1>
          <select
            className="text-md bg-green-700 outline-none hover:bg-green-500 px-4 py-2 cursor-pointer text-white rounded-2xl"
            onChange={(e) => view(e.target.value)}
          >
            <option value="" selected  disabled >
              Select
            </option>
            {status.map((s, index) => (
              <option key={s.id} value={s.schedule}>
                Booking {index + 1}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="text-center pt-52">
          <h1 className="text-4xl font-semibold text-red-500">
            You have not booked any schedule Yet!
          </h1>
          <p className="text-gray-600 text-2xl">Start Booking.</p>
        </div>
      )}

      {isVisible && views && (
        <div
          ref={printRef}
          className="bg-gray-400 p-5 m-2 rounded-lg text-center mx-auto w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <label className="w-1/3 text-right">DOCTOR NAME:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-xl p-2"
              type="text"
              value={views.doctor_name}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="w-1/3 text-right">DATE:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-lg p-2"
              type="date"
              value={views.date}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="w-1/3 text-right">TIME:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-lg p-2"
              type="time"
              value={views.time}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="w-1/3 text-right">FEE:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-lg p-2"
              type="text"
              value={views.fee}
              readOnly
            />
          </div>
          <span className="flex gap-2 place-content-center">
            <button
              onClick={handleClose}
              className="bg-red-500 p-2 w-[20%] self-center text-white rounded-xl mt-4"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="bg-gray-900 p-2 w-[20%] self-center text-white rounded-xl mt-4"
            >
              Print
            </button>
          </span>
          <p className="text-sm font-mono mt-3 ">
            *Print this before reaching doctor
          </p>
        </div>
      )}
    </div>
  );
}

export default UBookedSchedule;
