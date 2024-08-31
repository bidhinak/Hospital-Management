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
          `http://127.0.0.1:8000/api/doctorschedulestatus/${id}`
        );
        if (data.length === 1) {
          setBook(data);
        }
      } catch (error) {
        // Handle error
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
      // Handle error
    }
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
      ) : book.length === 1 ? (
        <div className="flex flex-col items-center mt-8">
          {book.map((b) => (
            <div
              key={b.id}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <h1 className="text-2xl text-green-500">View Booking Details</h1>
              <button
                className="text-md bg-green-500 hover:bg-green-600 transition p-2 w-full md:w-auto cursor-pointer text-white rounded-lg"
                onClick={() => view(b.user)}
              >
                Click Here
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center pt-40">
          <h1 className="text-4xl font-semibold text-red-500">
            No one booked in this schedule!
          </h1>
          <p className="text-gray-600 text-2xl mt-4">Check back later.</p>
        </div>
      )}

      {views && isVisible && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-lg mx-auto">
          <div className="flex flex-col  md:flex-row items-center mb-4">
            <label className="w-full sm:text-left md:w-1/3  text-lg font-semibold">
              Patient Name:
            </label>
            <input
              className="flex-grow rounded-md shadow-md text-xl p-2 ml-2 bg-gray-100"
              type="text"
              name="patientName"
              value={views.username}
              readOnly
            />
          </div>

          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full sm:text-left md:w-1/3  text-lg font-semibold">
              Mobile:
            </label>
            <input
              className="flex-grow rounded-md shadow-md text-lg p-2 ml-2 bg-gray-100"
              type="text"
              name="mobile"
              value={views.mobile}
              readOnly
            />
          </div>

          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full sm:text-left md:w-1/3  text-lg font-semibold">
              Email:
            </label>
            <input
              className="flex-grow rounded-md shadow-md text-lg p-2 ml-2 bg-gray-100"
              type="text"
              name="email"
              value={views.email}
              readOnly
            />
          </div>

          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 transition p-2 text-white rounded-lg mt-4 w-full md:w-1/4 mx-auto"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default DBookView;
