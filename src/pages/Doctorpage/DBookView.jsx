import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DHeader from "./DHeader";

function DBookView() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [views, setViews] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setViews(null);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorschedulestatus/${id}`,
          {}
        );
        if (data.length === 1) {
          setBook(data);
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

  const view = async (id) => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/doctorscheduleview/${id}`
      );
      setViews(data);      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DHeader />
      {loading ? (
        <div className="flex justify-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : book.length === 1 ? (
        <span>
          {book.map((b) => (
            <div
              key={b.id}
              className="flex flex-col md:flex-row justify-center items-center gap-2 mt-3"
            >
              <h1 className="text-2xl text-green-500">View Booking Details</h1>
              <button
                className="text-md bg-green-400 p-2 w-full md:w-auto cursor-pointer text-white rounded-lg"
                onClick={() => view(b.user)}
              >
                Click Here
              </button>
            </div>
          ))}
        </span>
      ) : (
        <div className="text-center pt-52">
          <h1 className="text-4xl font-semibold text-red-500">
            You have no bookings in this schedule!.
          </h1>
          <p className="text-gray-600 text-2xl">Check later.</p>
        </div>
      )}

      {views && isVisible && (
        <div className="flex flex-col gap-4 bg-gray-400 p-5 mt-2 rounded-lg text-center max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <label className="w-full md:w-1/3 text-right">PATIENT NAME:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-xl p-2"
              type="text"
              name="patientName"
              value={views.username}
              readOnly
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <label className="w-full md:w-1/3 text-right">MOBILE:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-lg p-2"
              type="text"
              name="mobile"
              value={views.mobile}
              readOnly
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <label className="w-full md:w-1/3 text-right">EMAIL:</label>
            <input
              className="flex-grow rounded-md shadow-xl text-lg p-2"
              type="text"
              name="email"
              value={views.email}
              readOnly
            />
          </div>

          <button
            onClick={handleClose}
            className="bg-red-500 self-center  p-2 w-full md:w-[20%] text-white rounded-xl mt-4"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default DBookView;
