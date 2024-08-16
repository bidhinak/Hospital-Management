/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-labels */

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";

function Ulogin() {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: { username: "", password1: "" },
    validationSchema: yup.object({
      username: yup.string().min(2).max(30).required(),
      password1: yup
        .string()
        .required("please secure your account with the password")
        .min(8)
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          "password should contain atleast one uppercase,number and a special charcter"
        ),
    }),
    onSubmit: (values) => {
      setloading(true);
      axios
        .post("http://127.0.0.1:8000/api/user_login", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          setloading(false);
          if (res.data.status) {
            dispatch(
              updateUser({
                ...user,
                id: res.data.result.id,
                username: res.data.result.name,
                email: res.data.result.email,
                mobile: res.data.result.mobile,
              })
            );
            navigate("/udashboard");
          } else {
            toast.error(res.data.result);
          }
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          toast.error("Something went wrong. Please try again.");
        });
    },
  });

  const navigate = useNavigate();
  return (
    <div>
      <div className=" flex flex-col gap-4 bg-blue-400 min-h-screen  text-center  justify-center  ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[40%] shadow-2xl border backdrop-blur-lg p-5 rounded-2xl text-left self-center"
        >
          <h1 className="text-2xl font-bold text-white text-center  ">login</h1>
          <hr className="self-center border-1.5 gap-4 text-blue-300  w-[100%]" />
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
          </div>{" "}
          <span className=" relative  ">
            <input
              className="rounded  shadow py-1 px-2 border shadow-black outline-none w-[100%]"
              name="password1"
              autoSave="password1"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password1}
            />
            <i
              className={`fa-solid  ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } absolute right-1 top-2 `}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            ></i>
          </span>
          <p className="text-red-600">{formik.errors.password1}</p>
          <button type="submit" className="p-3 bg-white rounded-md">
            {loading ? (
              <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="flex flex-row justify-between text-white">
            Dont have an account?
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/usersignup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Ulogin;
