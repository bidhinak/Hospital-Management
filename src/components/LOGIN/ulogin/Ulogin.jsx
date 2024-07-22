/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-labels */

import axios from "axios";
import { useFormik } from "formik";
import {  useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";

function Ulogin() {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  
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
      axios
        .post("http://127.0.0.1:8000/api/user_login", values, {
          headers: {
            "Content-Type": "multipart/form-data",

          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            dispatch(
              updateUser({
                ...user,
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
        .catch((err) => console.log(err));
    },
  });

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col gap-4 p-10 text-center  ">
        <h1 className="text-2xl font-bold text-blue-400  ">login</h1>
        <hr className="self-center border-1.5 gap-4 border-black w-[40%]" />

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[40%] text-left self-center"
        >
          <label htmlFor="name">Username</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="username"
            autoComplete="username"
            autoSave="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p className="text-red-600">{formik.errors.username}</p>

          <label htmlFor="password">Password</label>
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

          <button type="submit" className="p-3 bg-blue-400 rounded-md">
            Login
          </button>

          <p className="flex flex-row justify-between">
            Dont have an account?
            <span
              className="cursor-pointer"
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
