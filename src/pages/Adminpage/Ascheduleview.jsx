import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Adminpage from "./Adminpage";

function Ascheduleview() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctorscheduleget/${id}`
        );
        if (data) {
          setList(data);
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false);
      }
    })();
  }, [id]);

  return (
    <div>
      <Adminpage />
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

      </div>
      ) : list.length !== 0 ? (
        <div className="flex flex-row gap-5 p-2 ">
          {list.map((l) => (
            <div
              key={l.id}
              className="flex flex-col gap-3 bg-red-300 p-3 rounded-md "
            >
              <label className="text-lg font-semibold">DATE</label>

              <h1 className="text-center  text-lg shadow-lg  px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {l.date}
              </h1>
              <label className="text-lg font-semibold">TIME</label>

              <h1 className="text-center text-lg shadow-lg  px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {l.time}
              </h1>
              <label className="text-lg font-semibold">FEE</label>

              <h1 className="text-center text-lg shadow-lg  px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {l.fee}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center pt-52">
          <h1 className="text-4xl font-semibold text-blue-500">
            No schedules Added yet.
          </h1>
        </div>
      )}
    </div>
  );
}

export default Ascheduleview;
