import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";

function Doctorsignup() {
  const [showPassword, setShowPassword] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      mobile: "",
      department: "",
      photo: [],
      qualification: "",
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
      department: yup.string().required().min(2),
      photo: yup.string().required(),
      qualification: yup.string().required().min(2),

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
        .required()
        .oneOf([yup.ref("password1")], "password must be same"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/doctor_signup",
          values,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (data) {
          console.log(data);
          formik.resetForm();
          toast.success("successfully signed up");
          navigate("/officiallogin");
        } else {
          toast.error;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <div className="flex flex-col gap-2 p-10 text-center">
        <h1>Signup Here</h1>
        <hr className="self-center border-1.5 gap-2 border-black w-[40%]" />

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 w-[40%] text-left self-center"
        >
          <label htmlFor="email">Email</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.email}</p>

          <label htmlFor="name">name</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.username}</p>

          <label htmlFor="mobile">Mobile</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.mobile}</p>
          <label className="font-bold">Department</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
          />
          <p className="text-red-700">{formik.errors.department}</p>
          <label className="font-bold">Photo</label>
          <input
            className="px-1 outline-none border rounded-md shadow-md py-2 w-[80%] self-center"
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("photo",e.target.files[0])
            }
          />
          <p className="text-red-700">{formik.errors.photo}</p>
     
          <label className="font-bold">Qualification</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="text"
            name="qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
          />
          <p className="text-red-700">{formik.errors.qualification}</p>

          <label htmlFor="password">Password</label>
          <span className="relative">
            <input
              className="outline-none shadow py-1 px-2 shadow-black rounded w-[100%]"
              type={showPassword ? "text" : "password"}
              name="password1"
              value={formik.values.password1}
              onChange={formik.handleChange}
            />
            <input
              className="absolute right-1 top-3 "
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </span>
          <p className="text-red-600 ">{formik.errors.password1}</p>

          <label htmlFor="password">Confirm Password</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="password"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.password2}</p>
          <button
            className="bg-gray-600 text-white px-5 py-2 rounded"
            type="submit"
          >
            Signup
          </button>
          <p className="flex flex-row justify-between">
            Already have an account?{" "}
            <span
              className="cursor-pointer"
              onClick={() => navigate("/officiallogin")}
            >
              Go login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Doctorsignup;
