import { useNavigate, useParams } from "react-router";
import Adminpage from "./Adminpage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AAddToLIst() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const [list, setList] = useState("");
  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/doctordetailsget/${id}`
        );
        if (data) {
          setList(data);
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
        console.log(status);
        toast.success("New doctor added to list");
        navigate("/viewdoctors");
      } else {
        toast.error("not added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Adminpage />
      <h1 className="text-2xl text-center font-semibold underline text-green-500">
        Add Doctor to the List
      </h1>
      {loading ? (
        <div className="flex justify-center place-items-center items-center space-x-2 pt-40">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce  "></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce "></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : (
        <div className="p-3 flex justify-center">
          <form
            onSubmit={add}
            key={list.id}
            className="shadow-gray-600 shadow-xl w-[50%]  rounded-md p-3 text-center "
          >
            <img
              className="w-full h-56 object-contain rounded-md"
              src={`http://127.0.0.1:8000/${list.photo}`}
              alt="no image"
            />
            {/* console.log({list.photo}); */}
            {/* <input type="image" />{list.photo} */}
            <h1 className="text-xl text-gray-600 font-semibold ">
              {list.username}
            </h1>
            <h1 className="text-lg  font-light">{list.mobile}</h1>
            <h1 className="text-lg font-serif">{list.department}</h1>
            <h1 className="text-lg font-medium ">{list.qualification}</h1>
            <button className="bg-green-500 rounded-md p-2" type="submit">
              ADD
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AAddToLIst;
