import { useNavigate, useParams } from "react-router";
import Adminpage from "./Adminpage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AAddToLIst() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [list, setList] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctordetailsget/${id}`
        );
        if (data) {
          setList(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const add = async (e) => {
    e.preventDefault();
    try {
      const { status } = await axios.post(
        "http://127.0.0.1:8000/api/admindoctoradd",
        {
          details: id,
          name: list.username,
          department: list.department,
          photo: list.photo,
          mobile: list.mobile,
          qualification: list.qualification,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (status) {
        toast.success("New doctor added to list");
        navigate("/viewdoctors");
      } else {
        toast.error("Doctor not added");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Adminpage />
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl text-center font-semibold  text-green-500 mb-6">
          Add Doctor to the List
        </h1>
        {loading ? (
          <div className="flex justify-center items-center space-x-2 pt-40">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
        ) : (
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <form onSubmit={add} key={list.id} className="text-center">
              <img
                className="w-full h-60 object-contain rounded-md mb-4"
                src={`http://127.0.0.1:8000/${list.photo}`}
                alt="Doctor"
              />
              <h1 className="text-xl text-gray-700 font-bold mb-2">
                {list.username}
              </h1>
              <h1 className="text-lg text-gray-500 mb-2">{list.mobile}</h1>
              <h1 className="text-lg text-gray-600 mb-2">{list.department}</h1>
              <h1 className="text-lg text-gray-700 mb-4">{list.qualification}</h1>
              <button
                className="w-full bg-green-500 text-white rounded-md p-3 font-semibold hover:bg-green-600 transition duration-300"
                type="submit"
              >
                ADD
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AAddToLIst;
