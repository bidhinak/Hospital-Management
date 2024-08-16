import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import DHeader from "./DHeader";
import { useSelector } from "react-redux";

function Dscheduleadd() {
  const { username } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.id);
  const formik = useFormik({
    initialValues: {
      user: id,
      doctor_name: username,
      date: "",
      time: "",
      fee: "",
    },
    validationSchema: yup.object({
      date: yup.date().required(),
      time: yup.string().required(),
      fee: yup.string().required(),
    }),
    onSubmit: async (values) =>
      axios
        .post("http://127.0.0.1:8000/api/doctorscheduleadd", values, {})

        .then((res) => {
          formik.resetForm();
          toast.success("schedule added successfully");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        }),
  });

  return (
    <div>
      <DHeader />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 text-center "
      >
        <h1 className="text-green-600 font-bold text-2xl underline">
          Create new Schedule
        </h1>
        <label className="font-bold hidden">user id </label>
        <input
          className="hidden self-center"
          type="text"
          name="user"
          onChange={formik.handleChange}
          value={formik.values.user}
          readOnly
        />
        <label className="font-bold">NAME OF DOCTOR</label>
        <input
          className="w-[20%] self-center text-center outline-none rounded-md shadow-md py-2"
          type="text"
          name="doctor_name"
          value={formik.values.doctor_name}
          readOnly
        />
        <label className="font-bold">DATE</label>
        <input
          className="self-center"
          type="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p className="text-red-600">{formik.errors.date}</p>
        <label className="font-bold">TIME</label>
        <input
          className="self-center "
          type="time"
          name="time"

          onChange={formik.handleChange}
          value={formik.values.time}
        />

        <p className="text-red-600">{formik.errors.time}</p>

        <label className="font-bold">FEE</label>
        <input
          className="w-[20%] self-center outline-none rounded-md shadow-md py-2"
          type="text"
          name="fee"
          placeholder="eg:200"
          onChange={formik.handleChange}
          value={formik.values.fee}
        />
        <p className="text-red-600">{formik.errors.fee}</p>

        <button
          className="bg-green-400 p-3 w-[20%] text-white rounded-lg self-center "
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default Dscheduleadd;
