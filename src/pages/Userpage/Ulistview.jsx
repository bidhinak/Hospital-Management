import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Ulistview() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/admindoctoradd"
        );
        console.log(data);
        setList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <div>
        <h1>Here are our Docotrs and Departments</h1>
        <div className="flex flex-row gap-2 p-2">
          {list.map((l) => (
            <div className="border-black border w-[20%] p-3 " key={l.id}>
              <h1>{l.name}</h1>
              <h2>{l.department}</h2>
              <img src={`http://127.0.0.1:8000${l.photo}`} alt="no image" />
              <p
                className="cursor-pointer "
                onClick={() => navigate(`udoctorprofile/${l.id}`)}
              >
                check for schedule
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ulistview;
