import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { updateUser } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Officiallogin() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.user);
  const doctor = useSelector((state) => state.user);
  const [visible, setvisible] = useState(false);
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: { username: "", password1: "" },
    validationSchema: yup.object({
      username: yup.string().min(2).max(30).required("username is required"),
      password1: yup
        .string()
        .required("please write your password")
        .min(8)
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          "password should contain atleast one uppercase,number and a special charcter"
        ),
    }),
    onSubmit: (values) => {
      setloading(true);
      axios
        .post("http://127.0.0.1:8000/api/doctor_login", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setloading(false);
          if (res.data.status) {
            if (res.data.result.type == "admin") {
              dispatch(
                updateUser({
                  ...admin,
                  id: res.data.result.id,
                  username: res.data.result.name,
                })
              );
              navigate("/adashboard");
            } else if (res.data.result.type == "doctor") {
              dispatch(
                updateUser({
                  ...doctor,
                  id: res.data.result.id,
                  username: res.data.result.name,
                  mobile: res.data.result.mobile,
                  email: res.data.result.email,
                  department: res.data.result.department,
                  qualification: res.data.result.qualification,
                  photo: res.data.result.photo,
                })
              );
              navigate("/ddashboard");
            }
          } else {
            toast.error(res.data.result);
          }
        })
        .catch(() => {
          setloading(false);
          toast.error("Something went wrong. Please try again.");
        });
    },
  });

  const navigate = useNavigate();
  return (
    <div>
      <div className=" flex flex-col gap-4  bg-gray-700 justify-center min-h-screen  ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[40%] h-[100%]  border-gray-200 shadow-2xl border backdrop-blur-lg p-5 rounded-2xl text-left self-center "
        >
          <h1 className="text-2xl font-bold  text-white  text-center self-center  ">
            Official login
          </h1>
          <hr className="self-center border-1.5 gap-4 border-gray-500 w-[100%]" />
          <div className="flex flex-row gap-2">
            <i className="fa-regular fa-user self-center  text-white "></i>

            <label className="font-semibold  text-white">Username</label>
          </div>

          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="username"
            autoSave="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />

          <p className="text-red-600">{formik.errors.username}</p>
          <div className="flex flex-row gap-2 ">
            <i className="fa-solid fa-lock self-center  text-white"></i>

            <label className="font-semibold  text-white">Password</label>
          </div>
          <span className=" relative  ">
            <input
              className="rounded  shadow py-1 px-2 border shadow-black outline-none w-[100%]"
              name="password1"
              autoSave="password1"
              autoComplete="password1"
              type={visible ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password1}
            />
            <i
              className={`fa-solid ${
                visible ? "fa-eye" : "fa-eye-slash"
              } absolute top-2 right-1 cursor-pointer`}
              onClick={() => setvisible(!visible)}
            ></i>
          </span>
          <p className="text-red-600">{formik.errors.password1}</p>

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-white rounded-md text-black text-xl"
          >
            {loading ? (
              <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="flex flex-row justify-between text-white font-semibold">
            Dont have an account?Signup as
            <span className="flex flex-col gap-2">
              <span
                className="cursor-pointer underline  text-white"
                onClick={() => navigate("/doctorsignup")}
              >
                Doctor
              </span>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Officiallogin;
