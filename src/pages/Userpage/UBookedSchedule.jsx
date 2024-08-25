import { useEffect, useState } from "react";
import UHeader from "./UHeader";
import axios from "axios";
import { useSelector } from "react-redux";

function UBookedSchedule() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const [views, setViews] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const id = useSelector((state) => state.user.id);
  

  const handleClose = () => {
    setIsVisible(false);
    setViews(null);
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
          console.log(Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UHeader />
      <h1 className="text-2xl text-green-500 text-center ">
        View Booked Schedules
      </h1>

      {loading ? (
        <div className="flex justify-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : status.length > 0 ? (
        <div className="place-items-start m-1   ">
          {status.map((s) => (
            <button
              key={s.id}
              className="text-md bg-green-600 hover:bg-green-900 hover:text-xl p-2 mx-auto cursor-pointer text-white rounded-2xl"
              onClick={() => view(s.schedule)}
            >
              Booking
            </button>
          ))}
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
        <div className="bg-gray-400  p-5 m-2 rounded-lg text-center mx-auto w-full max-w-md">
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
          <button
            onClick={handleClose}
            className="bg-red-500 p-2 w-[20%] self-center text-white rounded-xl mt-4"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default UBookedSchedule;
