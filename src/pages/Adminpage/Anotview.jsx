import axios from "axios";
import { useEffect, useState } from "react";
import Adminpage from "./Adminpage";

function Anotview() {
  const [notification, setNot] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/Notificationdetails"
        );
        setNot(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Adminpage />
      <div className="relative overflow-x-auto  mx-20 my-8 rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-10 py-3">
                date
              </th>
              <th scope="col" className="px-10 py-3">
                Time
              </th>

              <th scope="col" className="px-6 py-3">
                description
              </th>
            </tr>
          </thead>

          {notification.map((not) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={not.id}
            >
              <td className="px-10 py-3">{not.date}</td>
              <td className="px-10 py-3">{not.Time}</td>

              <td className="px-10 py-3">{not.description}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Anotview;
