import { useNavigate, useParams } from "react-router";
import Adminpage from "./Adminpage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AAddToLIst() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [list, setList] = useState("");
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/doctordetailsget/${id}`
      );
      if (data) {
        setList(data);
      } else {
        console.log(data.error);
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
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (status) {
        console.log(status);
        toast.success("added");
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
      <div>
        <form onSubmit={add} key={list.id}>
          {/* <img src={`http://127.0.0.1:8000/${list.photo}`} alt="" /> */}
          console.log({list.photo});
          <input type="image" />{list.photo}
          <h1>{list.username}</h1>
          <h1>{list.department}</h1>
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
}

export default AAddToLIst;
