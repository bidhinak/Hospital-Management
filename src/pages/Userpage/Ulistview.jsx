import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Ulistview() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/admindoctoradd"
        );
        setList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Our Doctors and Departments
      </h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((item) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              key={item.id}
            >
              <img
                className="w-full  object-fill h-60"
                src={`http://127.0.0.1:8000${item.photo}`}
                alt={`Photo of Dr. ${item.name}`}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.department}</p>
                <button
                  className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => navigate(`/udocprofile/${item.id}`)}
                >
                  View Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ulistview;
