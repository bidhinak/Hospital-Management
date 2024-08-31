/* eslint-disable no-empty */
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
      toast.error("An error occurred while deleting the doctor");
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
      toast.error("An error occurred while adding the doctor");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/doctordetails"
        );
        setProfile(data.reverse());
      } catch (error) {
        toast.error("An error occurred while fetching doctors");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Adminpage />
      <h1 className="font-serif text-center text-purple-700 text-3xl md:text-4xl my-8">
        View and Add Doctors
      </h1>
      {loading ? (
        <div className="flex justify-center items-center space-x-2 pt-40">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : (
        <div className="relative overflow-x-auto mx-4 md:mx-10 my-8 rounded-lg shadow-md bg-white">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs text-white uppercase bg-purple-600">
              <tr>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Department</th>
                <th scope="col" className="px-4 py-3">Mobile</th>
                <th scope="col" className="px-4 py-3">Email</th>
                <th scope="col" className="px-4 py-3">Qualification</th>
                <th scope="col" className="px-4 py-3">Photo</th>
                <th scope="col" className="px-4 py-3">Add to the List</th>
                <th scope="col" className="px-4 py-3">Delete from List</th>
              </tr>
            </thead>
            <tbody>
              {profile.map((pro) => (
                <tr
                  className="border-b dark:bg-gray-800"
                  key={pro.id}
                >
                  <td className="px-4 py-3">{pro.username}</td>
                  <td className="px-4 py-3">{pro.department}</td>
                  <td className="px-4 py-3">{pro.mobile}</td>
                  <td className="px-4 py-3">{pro.email}</td>
                  <td className="px-4 py-3">{pro.qualification}</td>
                  <td className="px-4 py-3">
                    <img
                      className="w-16 h-16 object-cover rounded-md"
                      src={`http://127.0.0.1:8000${pro.photo}`}
                      alt="Doctor"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-white bg-green-600 rounded-lg px-4 py-2 hover:bg-green-700"
                      onClick={() => addToList(pro.id)}
                    >
                      ADD
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-700"
                      onClick={() => togglePopup(pro.id)}
                    >
                      DELETE
                    </button>
                  </td>
                  {popupVisibleId === pro.id && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm mx-4">
                        <h2 className="text-2xl mb-4">Remove the doctor?</h2>
                        <div className="flex justify-between gap-4">
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            onClick={() => togglePopup(null)}
                          >
                            CLOSE
                          </button>
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            onClick={() => deletePost(pro.id)}
                          >
                            YES
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDoctors;
