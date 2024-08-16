import { useSelector } from "react-redux";
import DHeader from "./DHeader";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

function Dprofileview() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const { username, email, mobile, department, qualification, photo } =
    useSelector((state) => state.user);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const deleteaccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/docaccountdelete/${id}`
      );
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/docprofileupdate/${id}/`,

      );
      if (response.status == 205) {
        console.log(response);
        toast.success("ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DHeader />
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-center">Update </h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile
                </label>
                <input
                  type="mobile"
                  placeholder="Enter your Mobile"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="Enter your Department"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Qualification
                </label>
                <input
                  type="text"
                  placeholder="Enter your Qualification"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-row justify-evenly">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => update(id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 pl-6 mx-auto mt-2">
        <div className="ml-2  flex flex-col gap-2 w-[50%] text-center place-items-center self-center">
          <img
            className="p-4 rounded-full border object-contain"
            src={`http://127.0.0.1:8000${photo}`}
            alt="no image"
          />
          <button
            onClick={openPopup}
            className="bg-green-800 rounded-xl w-auto py-2 px-2 text-white"
          >
            Update Your Profile
          </button>
          <button
            onClick={()=>navigate("/docupdatepassword")}
            className="bg-blue-800 rounded-xl w-auto py-2 px-2 text-white"
          >
            Change Your Password
          </button>
        </div>

        <div className="flex flex-col gap-10 mt-3">
          <div className="flex items-center gap-3">
            <label className="font-bold w-1/3 font-serif text-left ">
              NAME
            </label>
            <input
              className="shadow-lg outline-none shadow-gray-600 p-3  w-[60%] rounded-lg"
              type="text"
              value={username}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold w-1/3 font-serif text-left">
              EMAIL
            </label>
            <input
              className="shadow-lg outline-none shadow-gray-600 p-3 w-[60%] rounded-lg"
              type="email"
              value={email}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold w-1/3 font-serif text-left">
              MOBILE
            </label>
            <input
              className="shadow-lg outline-none shadow-gray-600 p-3 w-[60%] rounded-lg"
              type="text"
              value={mobile}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold w-1/3 font-serif text-left ">
              DEPARTMENT
            </label>
            <input
              className="shadow-lg outline-none shadow-gray-600 p-3 w-[60%] rounded-lg"
              type="text"
              value={department}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold w-1/3 font-serif text-left">
              QUALIFICATION
            </label>
            <input
              className="shadow-lg outline-none shadow-gray-600 p-3 w-[60%] rounded-lg"
              type="text"
              value={qualification}
              readOnly
            />
          </div>
          <button
            onClick={togglePopup}
            className="bg-red-800 rounded-xl w-auto mx-auto py-2 px-2 text-white"
          >
            Delete Your Account
          </button>
          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
              <div className="bbg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl mb-4 text-red-700 text-center">
                  Are you sure?
                </h2>
                <p className="text-red-400 font-serif">
                  Deleting will Clear all Your Data
                </p>
                <span className="flex flex-row gap-10 pt-2 pb-3 justify-evenly text-white text-xl">
                  <button onClick={togglePopup}>CLOSE</button>
                  <button onClick={() => deleteaccount(id)}>YES</button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dprofileview;
