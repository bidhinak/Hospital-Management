/* eslint-disable no-empty */
import axios from "axios";
import Adminpage from "./Adminpage";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function AUserBookings() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/userbookingsget/${id}`
        );
        setBook(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const view = async (scheduleId) => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/userbookingview/${scheduleId}`
      );

      if (data) {
        setBookings(data);
      }

      setIsVisible(true);
    } catch (error) {
    }
  };

  return (
    <div>
      <Adminpage />

      {loading ? (
        <div className="flex justify-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : book.length > 0 ? (
        
        <div className="ml-5">
        <h1 className="font-semibold text-xl">
          Select to see the Bookings 
        </h1>
        <select
          className="text-md bg-green-700 outline-none hover:bg-green-500 px-4 py-2 cursor-pointer text-white rounded-2xl"
          onChange={(e) => view(e.target.value)}
        >
          <option  disabled selected>
            Select
          </option>
          {book.map((s, index) => (
            <option key={s.id} value={s.schedule}>
              Booking {index + 1}
            </option>
          ))}
        </select>
      </div>
      ) : (
        <div className="text-center pt-52">
          <h1 className="text-4xl font-semibold text-red-500">
            This user have no bookings!.
          </h1>
          <p className="text-gray-600 text-2xl">Check later.</p>
        </div>
      )}

      {isVisible && (
        <div>
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex flex-col gap-4  bg-gray-400 p-5 mt-2 rounded-lg text-center w-full sm:w-[50%] md:w-[70%] lg:w-[50%] mx-auto"
            >
              <div className="flex flex-col md:flex-row items-center gap-3">
                <label className=" w-full md:w-1/3 text-center">DOCTOR NAME</label>
                <input
                  className="w-full md:flex-grow rounded-md text-center shadow-xl text-xl p-2"
                  type="text"
                  name="doctorname"
                  value={b.doctor_name}
                  readOnly
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <label className="w-full md:w-1/3 text-center">DATE</label>
                <input
                  className="w-full md:flex-grow text-center rounded-md shadow-xl text-xl p-2"
                  type="date"
                  name="date"
                  value={b.date}
                  readOnly
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <label className="w-full md:w-1/3 text-center">TIME</label>
                <input
                  className="w-full md:flex-grow text-center rounded-md shadow-xl text-xl p-2"
                  type="time"
                  name="time"
                  value={b.time}
                  readOnly
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <label className="w-full md:w-1/3 text-center">FEE</label>
                <input
                  className="w-full md:flex-grow text-center rounded-md shadow-xl text-xl p-2"
                  type="text"
                  name="fee"
                  value={b.fee}
                  readOnly
                />
              </div>
              <button
                onClick={handleClose}
                className="bg-red-500 p-2 w-full md:w-[20%] self-center text-white rounded-xl mt-4"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AUserBookings;
