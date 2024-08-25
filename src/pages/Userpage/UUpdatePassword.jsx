import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UHeader from "./UHeader";
function UUpdatePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const id = useSelector((state) => state.user.id);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8000/api/userChangePassword/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success("New Password Created");
      setSuccess(data.detail);
      setError(null);
      navigate("/userlogin");
    } else {
      setError(data);
      setSuccess(null);
    }
  };

  return (
    <div>
      <UHeader />
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl text-blue-600 font-bold mb-4 ">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-lg outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-lg outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-lg outline-none"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4">
              {error.new_password || error.old_password}
            </div>
          )}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UUpdatePassword;
