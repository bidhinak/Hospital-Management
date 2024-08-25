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
    } catch (error) {
      console.log(error);
    }
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
        console.log(response.data);

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
      console.log(error);
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
    <div>
      <UHeader />
      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-center">
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
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className=" text-center items-center flex flex-col  gap-5 pt-3">
        <h1 className="text-3xl  text-purple-500">Profile of {username}</h1>
        <div className="flex flex-row gap-2">
          <button
            onClick={openPopup}
            className="bg-green-800 rounded-xl w-auto py-2 px-2 text-white"
          >
            <i className="fa-solid fa-user-pen"></i> {""}
            Update Your Profile
          </button>
          <button
            onClick={() => navigate("/userupdatepassword")}
            className="bg-blue-800 rounded-xl w-auto py-2 px-2 text-white"
          >
            <i className="fa-solid fa-pencil"></i> Change Your Password
          </button>
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-left">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-semibold">NAME</label>
            <input
              className="outline-none rounded-lg p-2 text-center w-[80%] shadow-xl"
              type="text"
              value={username}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-semibold">MOBILE</label>
            <input
              className="outline-none rounded-lg p-2 text-center w-[80%] shadow-xl"
              type="text"
              value={mobile}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="text-xl font-semibold">EMAIL</label>
            <input
              className="outline-none rounded-lg p-2 text-center w-[80%] shadow-xl"
              type="text"
              value={email}
            />
          </div>
        </div>

        <button
          onClick={togglePopup}
          className="bg-red-800 rounded-xl w-auto mx-auto py-2 px-2 text-white"
        >
          <i className="fa-solid fa-user-slash"></i> Delete Your Account
        </button>
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <div className=" p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl mb-4 text-red-700 text-center">
                Are you sure?
              </h2>
              <p className="text-red-400 font-serif">
                Deleting will clear all your data.
              </p>
              <span className="flex flex-row gap-10 pt-2 pb-3 justify-evenly text-white text-xl">
                <button onClick={togglePopup}>CLOSE</button>
                <button onClick={() => deleteAccount(id)}>YES</button>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Uprofile;
