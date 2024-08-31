import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UHeader from "./UHeader";

function UDocprofile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/userdoctorprofileget/${id}`
        );
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <UHeader />
      {loading ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : profile ? (
        <div className="flex flex-col items-center p-6 md:p-8 lg:p-10">
          <h1 className="text-3xl font-semibold text-purple-800 mb-6">
            Details and Schedule of Dr. {profile.name}
          </h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
            <div className="flex flex-col md:flex-row">
              <img
                className="w-full md:w-1/2 h-[40%] object-fill"
                src={`http://127.0.0.1:8000/${profile.photo}`}
                alt={`Dr. ${profile.name}`}
              />
              <div className="p-6 flex flex-col justify-center w-full md:w-1/2">
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700">
                    Mobile
                  </label>
                  <p className="text-lg text-gray-900 mt-1">{profile.mobile}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700">
                    Department
                  </label>
                  <p className="text-lg text-gray-900 mt-1">{profile.department}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-gray-700">
                    Qualification
                  </label>
                  <p className="text-lg text-gray-900 mt-1">{profile.qualification}</p>
                </div>
                <button
                  className="mt-6 py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
                  onClick={() => navigate(`/ucheckschedule/${profile.details}`)}
                >
                  Check Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[70vh]">
          <p className="text-xl text-gray-600">Profile not found.</p>
        </div>
      )}
    </div>
  );
}

export default UDocprofile;
