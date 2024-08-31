import axios from "axios";
import { useEffect, useState } from "react";
import Adminpage from "./Adminpage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ViewUsers() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupVisibleId, setPopupVisibleId] = useState(null);

  const togglePopup = (id) => {
    setPopupVisibleId(id);
  };

  const deletePost = async (id) => {
    try {
      const { status } = await axios.delete(
        `http://127.0.0.1:8000/api/doctordetailsdelete/${id}`
      );
      if (status === 204) {
        setProfile((prev) => prev.filter((x) => x.id !== id));
        toast.success("User removed successfully");
      } else {
        toast.error("Failed to remove the user");
      }
    } catch (error) {
      toast.error("An error occurred while removing the user");
    } finally {
      setPopupVisibleId(null);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/userdetails");
        setProfile(data.reverse());
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Adminpage />
      <h1 className="font-serif text-center text-yellow-700 text-3xl my-6">
        View Users
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mr-1"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mr-1"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      ) : (
        <div className="relative overflow-x-auto mx-4 md:mx-20 my-8 rounded-md shadow-lg bg-white dark:bg-gray-900">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs text-gray-100 uppercase bg-yellow-600 dark:bg-yellow-700">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Mobile</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Bookings</th>
                <th scope="col" className="px-6 py-3 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {profile.map((pro) => (
                <tr
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out"
                  key={pro.id}
                >
                  <td className="px-6 py-3">{pro.username}</td>
                  <td className="px-6 py-3">{pro.mobile}</td>
                  <td className="px-6 py-3">{pro.email}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded-lg shadow-md transition-all duration-200 ease-in-out"
                      onClick={() => navigate(`/auserbookings/${pro.id}`)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg shadow-md transition-all duration-200 ease-in-out"
                      onClick={() => togglePopup(pro.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {popupVisibleId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">Are you sure?</h2>
            <div className="flex justify-evenly">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
                onClick={() => togglePopup(null)}
              >
                Close
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
                onClick={() => deletePost(popupVisibleId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewUsers;
