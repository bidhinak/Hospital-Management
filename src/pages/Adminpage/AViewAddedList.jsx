import axios from "axios";
import { useEffect, useState } from "react";
import Adminpage from "./Adminpage";
import { useNavigate } from "react-router";

function AViewAddedList() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/admindoctoradd"
        );
        if (data) {
          setSchedule(data);
        } else {
          console.log(Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false);
      }
    })();
  }, []);
  return (
    <div>
      <Adminpage />
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

      </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {schedule.map((s) => (
            <div
              key={s.id}
              className="shadow-lg shadow-gray-700 rounded-lg p-4 bg-white"
            >
              <h1 className="text-xl font-semibold">{s.name}</h1>
              <h1 className="font-serif text-gray-600">{s.department}</h1>
              <img
                className="rounded-md w-full h-48 object-contain mt-2"
                src={`http://127.0.0.1:8000${s.photo}`}
                alt="no image"
              />
              <p
                className="text-red-500 text-center hover:underline cursor-pointer mt-4"
                onClick={() => navigate(`/ascheduleview/${s.details}`)}
              >
                View Schedules
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AViewAddedList;
