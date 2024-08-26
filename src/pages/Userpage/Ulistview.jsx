import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Ulistview() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/admindoctoradd"
        );
        setList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    })();
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-lg p-4 font-semibold">
          Here are our Doctors and Departments
        </h1>
        {loading ? (
          <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

        </div>
        ) : (
          <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
            {list.map((l) => (
              <div
                className="outline-none border-gray-400 shadow-xl rounded-lg border p-3"
                key={l.id}
              >
                <h1 className="font-bold text-lg">{l.name}</h1>
                <h2 className="font-serif">{l.department}</h2>
                <img
                  className="w-full h-56 object-contain rounded-md "
                  src={`http://127.0.0.1:8000${l.photo}`}
                  alt={`Photo of Dr. ${l.name}`}
                />
                <p
                  className="cursor-pointer hover:underline font-medium text-xl text-red-500 mt-4 hover:text-red-700"
                  onClick={() => navigate(`/udocprofile/${l.id}`)}
                >
                  Schedule View
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ulistview;
