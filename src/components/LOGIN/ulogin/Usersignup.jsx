import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";

function Usersignup() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      mobile: "",
      password1: "",
      password2: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "not a valid email address")
        .required(),
      username: yup.string().min(2).max(30).required(),
      mobile: yup
        .string()
        .matches(/^([+]\d{2})?\d{10}$/, "not a valid mobile number")
        .required(),
      password1: yup
        .string()
        .required()
        .min(8)
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          "password should contain atleast one uppercase,number and a special charcter"
        ),
      password2: yup
        .string()
        .required("confirm your Password ")
        .oneOf([yup.ref("password1")], "password must be same"),
    }),
    onSubmit: async (values) => {
      setloading(true);
      axios
        .post("http://127.0.0.1:8000/api/user_signup", values, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setloading(false);
          toast.success("successfully signed up");
          navigate("/userlogin");
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          toast.error("Something went wrong. Please try again.");
        });
    },
  });

  console.log(formik.errors);
  return (
    <div>
      <div className="flex flex-col gap-2 p-10 bg-blue-400 min-h-screen  text-center  justify-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 w-[40%] text-left shadow-2xl border backdrop-blur-lg p-5 rounded-2xl self-center"
        >
          <h1 className="text-2xl font-bold text-white text-center ">
            Signup Here
          </h1>
          <hr className="self-center border-1.5 gap-4 text-blue-300 w-[100%]" />
          <div className="flex flex-row gap-2">
            <i className="fa-solid fa-envelope self-center  text-white "></i>
            <label className="font-semibold  text-white">Email</label>
          </div>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
          />
          <p className="text-red-600 ">{formik.errors.email}</p>
          <div className="flex flex-row gap-2">
            <i className="fa-regular fa-user self-center  text-white "></i>

            <label className="font-semibold  text-white">Userame</label>
          </div>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.username}</p>
          <div className="flex flex-row gap-2">
            <i className="fa-solid fa-mobile-screen-button self-center  text-white "></i>

            <label className="font-semibold  text-white">Mobile</label>
          </div>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.mobile}</p>
          <div className="flex flex-row gap-2">
            <i className="fa-solid fa-lock self-center  text-white "></i>

            <label className="font-semibold  text-white">Password</label>
          </div>
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
          <p className="text-red-600 ">{formik.errors.password1}</p>
          <div className="flex flex-row gap-2">
            <i className="fa-solid fa-lock self-center  text-white "></i>

            <label className="font-semibold  text-white">
              confirm Password
            </label>
          </div>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="password"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.password2}</p>
          <button className="bg-white px-5 py-3 rounded" type="submit">
            {loading ? (
              <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
              </div>
            ) : (
              "signup"
            )}
          </button>
          <p className="flex flex-row justify-between text-white">
            Already have an account?
            <span
              className="cursor-pointer"
              onClick={() => navigate("/userlogin")}
            >
              Go login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Usersignup;
