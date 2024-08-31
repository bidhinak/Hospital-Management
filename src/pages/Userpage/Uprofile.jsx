/* eslint-disable no-empty */
import { useDispatch, useSelector } from "react-redux";
import UHeader from "./UHeader";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { updateUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

function Uprofile() {
  const { id, username, email, mobile } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    username: username,
    email: email,
    mobile: mobile,
  });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const deleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/useraccountdelete/${id}`
      );
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {}
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("email", profileData.email);
      formData.append("mobile", profileData.mobile);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/userprofileupdate/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setProfileData(response.data);

        dispatch(
          updateUser({
            id: response.data.id,
            username: response.data.username,
            mobile: response.data.mobile,
            email: response.data.email,
            department: response.data.department,
            qualification: response.data.qualification,
            photo: response.data.photo,
          })
        );
        toast.success("Profile updated successfully");
        closePopup();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UHeader />
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Update Profile
            </h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={profileData.mobile}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white  shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-purple-500 text-center mb-6">
            Profile of {username}
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={openPopup}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-user-pen mr-2"></i> Update Your Profile
            </button>
            <button
              onClick={() => navigate("/userupdatepassword")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-pencil mr-2"></i> Change Your Password
            </button>
          </div>
          <div className="space-y-4 p-3 ml-16 mr-3">
            <div className="flex items-center  justify-between">
              <label className="text-xl  font-semibold text-gray-700">Name</label>
              <input
                className="outline-none rounded-lg p-2 text-center w-3/4 shadow-md bg-gray-50"
                type="text"
                value={username}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xl font-semibold text-gray-700">Mobile</label>
              <input
                className="outline-none rounded-lg p-2 text-center w-3/4 shadow-md bg-gray-50"
                type="text"
                value={mobile}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xl font-semibold text-gray-700">Email</label>
              <input
                className="outline-none rounded-lg p-2 text-center w-3/4 shadow-md bg-gray-50"
                type="text"
                value={email}
                readOnly
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={togglePopup}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-user-slash mr-2"></i> Delete Your Account
            </button>
          </div>

          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-red-700 mb-4 text-center">
                  Are you sure?
                </h2>
                <p className="text-gray-700 text-center mb-6">
                  Deleting your account will remove all your data permanently.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={togglePopup}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => deleteAccount(id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Uprofile;
