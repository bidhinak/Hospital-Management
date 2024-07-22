import { useNavigate } from "react-router";
import Adminpage from "./Adminpage";

function ADashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Adminpage />
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-row gap-2 self-center">
          <button
            className="bg-gray-500 p-4 rounded-md"
            onClick={() => navigate("/anotadd")}
          >
            notification add
          </button>

          <button
            className="bg-gray-500 p-4 rounded-md"
            onClick={() => navigate("/anotview")}
          >
            notification view
          </button>
        </div>
        <div className="flex flex-row gap-2 self-center">
          <button
            className="bg-gray-500 p-4 rounded-md"
            onClick={() => navigate("/viewdoctors")}
          >
            view doctors
          </button>
        </div>
        <div className="flex flex-row gap-2 self-center">
          <button
            className="bg-gray-500 p-4 rounded-md"
            onClick={() => navigate("/ascheduleview")}
          >
            schedule view
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default ADashboard;
