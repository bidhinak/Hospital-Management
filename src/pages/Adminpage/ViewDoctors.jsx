import axios from "axios";
import { useEffect, useState } from "react";
import Adminpage from "./Adminpage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ViewDoctors() {
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
        toast.success("Doctor removed from the list successfully");
      } else {
        toast.error("Failed to remove the doctor");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPopupVisibleId(null);
    }
  };

  const addToList = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/doctordetailsget/${id}`
      );
      if (response.status === 208) {
        toast.error("You have already added this doctor");
      } else {
        navigate(`/aaddtolist/${id}`);
      }
    } catch (error) {
      console.log("Error adding to list:", error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/doctordetails"
        );
        setProfile(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Adminpage />
      <h1 className="font-serif text-center underline text-purple-700 text-2xl">
        View and Add Doctors
      </h1>
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

      </div>
      ) : (
        <div className="relative  overflow-x-auto mx-10 my-8 rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-purple-600 dark:text-white">
              <tr>
                <th scope="col" className="px-10 py-3">Name</th>
                <th scope="col" className="px-10 py-3">Department</th>
                <th scope="col" className="px-10 py-3">Mobile</th>
                <th scope="col" className="px-10 py-3">Email</th>
                <th scope="col" className="px-10 py-3">Qualification</th>
                <th scope="col" className="px-10 py-3">Photo</th>
                <th scope="col" className="px-10 py-3">Add to the List</th>
                <th scope="col" className="px-10 py-3">Delete from List</th>
              </tr>
            </thead>
            {profile.map((pro) => (
              <tbody
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={pro.id}
              >
                <td className="px-10 py-3">{pro.username}</td>
                <td className="px-10 py-3">{pro.department}</td>
                <td className="px-10 py-3">{pro.mobile}</td>
                <td className="px-10 py-3">{pro.email}</td>
                <td className="px-10 py-3">{pro.qualification}</td>
                <td className="px-8 py-3">
                  <img
                    className="size-20 object-contain rounded-md"
                    src={`http://127.0.0.1:8000${pro.photo}`}
                    alt="Doctor"
                  />
                </td>
                <td className="px-10 py-3">
                  <button
                    className="text-white bg-green-600 rounded-lg p-2"
                    onClick={() => addToList(pro.id)}
                  >
                    ADD
                  </button>
                </td>
                <td className="px-10 py-3">
                  <button
                    className="text-white bg-red-600 p-2 rounded-lg"
                    onClick={() => togglePopup(pro.id)}
                  >
                    DELETE
                  </button>
                </td>
                {popupVisibleId === pro.id && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl mb-4">Are you sure?</h2>
                      <div className="flex flex-row gap-10 justify-evenly pb-3 text-white text-xl">
                        <button
                          className="bg-gray-500 p-2 rounded-lg"
                          onClick={() => togglePopup(null)}
                        >
                          CLOSE
                        </button>
                        <button
                          className="bg-red-700 p-2 rounded-lg"
                          onClick={() => deletePost(pro.id)}
                        >
                          YES
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDoctors;
