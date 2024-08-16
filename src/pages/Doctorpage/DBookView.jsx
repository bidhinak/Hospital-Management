import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DHeader from "./DHeader";

function DBookView() {
  const { id } = useParams();
  const [book, setbook] = useState([]);
  const [views, setViews] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorschedulestatus/${id}`,
          {}
        );
        if (data.length == 1) {
          setbook(data);
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
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

      </div>
      ) : book.length == 1 ? (
        <span>
          {book.map((b) => (
            <span
              key={b.id}
              className="flex gap-2 justify-center items-center mt-3"
            >
              <h1 className="text-2xl text-green-500">View Booking Details</h1>
              <button
                className="text-md bg-green-400 w-[8%]  p-2  cursor-pointer   text-white rounded-lg "
                onClick={() => view(b.user)}
              >
                Click Here
              </button>
            </span>
          ))}
        </span>
      ) : (
        <div className="text-center  pt-52">
          <h1 className="text-4xl font-semibold text-red-500">
            You have no bookings in this schedule!.
          </h1>
          <p className="text-gray-600 text-2xl">Check later.</p>
        </div>
      )}

      {views ? (
        isVisible && (
            <div className="flex flex-col gap-4 bg-gray-400 p-5 mt-2 rounded-lg text-center w-[50%] mx-auto">
            <div className="flex items-center gap-3">
              <label className="w-1/3 text-right" htmlFor="patientName">PATIENT NAME:</label>
              <input
                className="flex-grow rounded-md shadow-xl text-xl p-2"
                type="text"
                name="patientName"
                value={views.username}
                id="patientName"
                readOnly
              />
            </div>
          
            <div className="flex items-center gap-3">
              <label className="w-1/3 text-right" htmlFor="mobile">MOBILE:</label>
              <input
                className="flex-grow rounded-md shadow-xl text-lg p-2"
                type="text"
                name="mobile"
                value={views.mobile}
                id="mobile"
                readOnly
              />
            </div>
          
            <div className="flex items-center gap-3">
              <label className="w-1/3 text-right" htmlFor="email">EMAIL:</label>
              <input
                className="flex-grow rounded-md shadow-xl text-lg p-2"
                type="text"
                name="email"
                value={views.email}
                id="email"
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
          
        )
      ) : (
        <h1></h1>
      )}
      
    </div>
  );
}

export default DBookView;
