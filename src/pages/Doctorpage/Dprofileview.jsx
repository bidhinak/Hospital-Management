/* eslint-disable no-empty */
import { useDispatch, useSelector } from "react-redux";
import DHeader from "./DHeader";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/slices/userSlice";

function Dprofileview() {
  const { username, email, mobile, department, qualification, photo } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const [show, setShow] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const [profileData, setProfileData] = useState({
    username: username,
    email: email,
    mobile: mobile,
    department: department,
    qualification: qualification,
  });

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

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: files ? photo : value,
    }));
    if (files) {
      setPhotoFile(files[0]);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/docaccountdelete/${id}`
      );
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {}
  };
  const save = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", photoFile);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/docprofilephotoupdate/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          updateUser({
            id: response.data.id,
            photo: response.data.photo,
            username: response.data.username,
            mobile: response.data.mobile,
            email: response.data.email,
            department: response.data.department,
            qualification: response.data.qualification,
          })
        );
        toast.success("Photo updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update photo");
    }
  };
  const save2 = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/docprofilephotoupdate2/${id}/`,
        {
          photo: `/media/doctors/${photoFile.name}`,
          name: profileData.username,
          department: profileData.department,
          details_id: profileData.id,
          mobile: profileData.mobile,
          qualification: profileData.qualification,

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
      }
    } catch (error) {}
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("email", profileData.email);
      formData.append("mobile", profileData.mobile);
      formData.append("department", profileData.department);
      formData.append("qualification", profileData.qualification);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/docprofileupdate/${id}/`,
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
  const updateprofile2 = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/docprofileupdate2/${id}/`,
        {
          name: profileData.username,
          department: profileData.department,
          details_id: profileData.id,
          mobile: profileData.mobile,
          qualification: profileData.qualification,

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
      }
    } catch (error) {}
  };

  return (
    <div className="bg-gray-600 min-h-screen">
      <DHeader />
      {isPopupOpen && (
        <div className=" absolute z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={profileData.qualification}
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
                  onClick={() => {
                    updateProfile(), updateprofile2();
                  }}
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
        <div className="ml-2 flex flex-col gap-2 w-[50%] text-center place-items-center self-center">
          <span className="relative">
            {show ? (
              <span className="">
                <img
                  className="p-4 rounded-full border object-contain"
                  src={`http://127.0.0.1:8000${photo}`}
                  alt="Profile"
                />
                <span className="flex gap-2  justify-evenly ">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    className="bg-green-400 p-2 rounded-lg "
                    onClick={() => {
                      save(), save2();
                    }}
                  >
                    <i className="fa-regular fa-floppy-disk"></i>
                  </button>
                  <button
                    className="bg-gray-600 p-2 rounded-lg text-white"
                    onClick={() => setShow(false)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </span>
              </span>
            ) : (
              <span className=" ">
                <img
                  className="p-4  rounded-full border object-contain"
                  src={`http://127.0.0.1:8000${photo}`}
                  alt="no image"
                />
                <i
                  onClick={() => setShow(true)}
                  className=" fa-solid fa-pencil bg-indigo-700 rounded-full p-3 absolute bottom-0  "
                ></i>
              </span>
            )}
          </span>
          <button
            onClick={openPopup}
            className="bg-green-800 rounded-xl w-auto py-2 px-2 text-white"
          >
            <i className="fa-solid fa-user-pen"></i> {""}
            Update Your Profile
          </button>
          <button
            onClick={() => navigate("/docupdatepassword")}
            className="bg-blue-800 rounded-xl w-auto py-2 px-2 text-white"
          >
            <i className="fa-solid fa-pencil"></i> Change Your Password
          </button>
        </div>

        <div className="flex flex-col  bg-gray-200 p-4 rounded-lg gap-10 mt-3">
          <div className="flex items-center gap-3">
            <label className="font-bold w-1/3 font-serif text-left">NAME</label>

            <input
              className="shadow-lg outline-none shadow-gray-600 p-3 w-[60%] rounded-lg"
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
            <label className="font-bold w-1/3 font-serif text-left">
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
            <i className="fa-solid fa-user-slash"></i> Delete Your Account
          </button>
          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
                <p className="text-lg font-semibold mb-4 text-center">
                  Are you sure?
                </p>
                <p className="text-gray-700 text-center mb-6">
                  Deleting your account will remove all your data permanently.
                </p>
                <div className="flex justify-between">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mt-4 transition-colors duration-300"
                    onClick={togglePopup}
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 transition-transform duration-300 hover:scale-105"
                    onClick={() => deleteAccount(id)}
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

export default Dprofileview;
