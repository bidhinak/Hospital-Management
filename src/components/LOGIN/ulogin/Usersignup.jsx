import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";

function Usersignup() {
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
        .required()
        .oneOf([yup.ref("password1")], "password must be same"),
    }),
    onSubmit: async (values) => {
      axios
        .post("http://127.0.0.1:8000/api/user_signup", values, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("successfully signed up");
          navigate("/userlogin");
        })
        .catch((err) => console.log(err));
    },
  });

  console.log(formik.errors);
  return (
    <div>
      <div className="flex flex-col gap-2 p-10 text-center">
        <h1>Signup Here</h1>
        <hr className="self-center border-1.5 gap-4 border-black w-[40%]" />

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 w-[40%] text-left self-center"
        >
          <label htmlFor="email">Email</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
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
            type="text"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.mobile}</p>

          <label htmlFor="text">Password</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="password"
            name="password1"
            value={formik.values.password1}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.password1}</p>

          <label htmlFor="text">Confirm Password</label>
          <input
            className="outline-none shadow py-1 px-2 shadow-black rounded"
            type="password"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 ">{formik.errors.password2}</p>

          <button className="bg-blue-500 px-5 py-2 rounded" type="submit">
            Signup
          </button>
          <p className="flex flex-row justify-between">
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
