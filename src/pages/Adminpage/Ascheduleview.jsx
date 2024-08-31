import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Adminpage from "./Adminpage";

function Ascheduleview() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorscheduleget/${id}`
        );
        if (data) {
          setList(data);
        }
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const formatTimeTo12Hour = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`);
    if (!isNaN(date.getTime())) {
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }
    return "Invalid time";
  };

  return (
    <div className=" ">
      <Adminpage />
      {loading ? (
        <div className="flex justify-center items-center ">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      ) : list.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {list.map((l) => (
            <div
              key={l.id}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-gray-800"
            >
              <div className="w-full flex flex-col items-center">
                <label className="text-lg font-semibold text-blue-600">
                  DATE
                </label>
                <h1 className="text-xl font-medium mt-1">{l.date}</h1>
              </div>
              <div className="w-full flex flex-col items-center mt-4">
                <label className="text-lg font-semibold text-blue-600">
                  TIME
                </label>
                <h1 className="text-xl font-medium mt-1">
                  {formatTimeTo12Hour(l.time)}
                </h1>
              </div>
              <div className="w-full flex flex-col items-center mt-4">
                <label className="text-lg font-semibold text-blue-600">
                  FEE
                </label>
                <h1 className="text-xl font-medium mt-1">{l.fee}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center pt-52">
          <h1 className="text-3xl font-semibold text-blue-500">
            No schedules added yet.
          </h1>
        </div>
      )}
    </div>
  );
}

export default Ascheduleview;
