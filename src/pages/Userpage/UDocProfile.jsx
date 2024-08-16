import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UHeader from "./UHeader";

function UDocprofile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setprofile] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/userdoctorprofileget/${id}`
        );
        if (data) {
          setprofile(data);
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false);
      }
    })();
  }, [id]);
  return (
    <div>
      <UHeader />
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

      </div>
      ) : (
        <div className="flex flex-col gap-2 p-4  ">
          <h1 className="hover:underline text-purple-950 text-3xl font-semibold text-center ">
            Details and schedules of {profile.name}
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  content-center">
            <img
              className="w-[50%] rounded-md"
              src={`http://127.0.0.1:8000/${profile.photo}`}
              alt="no image yet."
            />
            <div className="flex flex-col gap-5">
              <label className=" text-lg font-semibold ">MOBILE</label>
              <h1 className="text-center text-lg shadow-lg w-[50%] px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {profile.mobile}
              </h1>
              <label className="text-lg font-semibold ">DEPARTMENT</label>
              <h1 className="text-center text-lg shadow-lg w-[50%] px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {profile.department}
              </h1>
              <label className="text-lg font-semibold ">QUALIFICATION</label>
              <h1 className="text-center text-lg shadow-lg w-[50%] px-3 py-1 rounded-md shadow-gray-500 font-normal">
                {profile.qualification}
              </h1>
              <p
                className="cursor-pointer font-mono bg-red-600 p-3 w-[50%] text-center rounded-lg text-white text-xl"
                onClick={() => navigate(`/ucheckschedule/${profile.details}`)}
              >
                check for schedule
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UDocprofile;
