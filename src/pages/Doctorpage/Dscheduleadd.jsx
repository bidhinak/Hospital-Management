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
      date: yup.date().required("Date is required"),
      time: yup.string().required("Time is required"),
      fee: yup.string().required("Fee is required"),
    }),
    onSubmit: async (values) =>
      axios
        .post("http://127.0.0.1:8000/api/doctorscheduleadd", values, {})
        .then(() => {
          formik.resetForm();
          toast.success("Schedule added successfully");
        })
        .catch(() => {
          toast.error("Failed to add schedule");
        }),
  });

  return (
    <div>
      <DHeader />
      <form
        onSubmit={formik.handleSubmit}
        className="flex  bg-gray-300 p-5   flex-col gap-5  shadow-lg rounded-lg max-w-lg mx-auto mt-2 "
      >
        <h1 className="text-green-600 font-bold text-2xl text-center">
          Create New Schedule
        </h1>
        <fieldset className="flex flex-col gap-4">
          <legend className="font-bold hidden">User ID</legend>
          <input
            className="hidden"
            type="text"
            name="user"
            onChange={formik.handleChange}
            value={formik.values.user}
            readOnly
          />

          <label className="font-bold">Doctor Name</label>
          <input
            className="w-full text-center outline-none rounded-md shadow-md py-2"
            type="text"
            name="doctor_name"
            value={formik.values.doctor_name}
            readOnly
          />

          <label className="font-bold">Date</label>
          <input
            className="w-full text-center outline-none rounded-md shadow-md py-2"
            type="date"
            name="date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && (
            <p className="text-red-600 text-sm">{formik.errors.date}</p>
          )}

          <label className="font-bold">Time</label>
          <input
            className="w-full text-center outline-none rounded-md shadow-md py-2"
            type="time"
            name="time"
            onChange={formik.handleChange}
            value={formik.values.time}
          />
          {formik.errors.time && (
            <p className="text-red-600 text-sm">{formik.errors.time}</p>
          )}

          <label className="font-bold">Fee</label>
          <input
            className="w-full text-center outline-none rounded-md shadow-md py-2"
            type="text"
            name="fee"
            placeholder="e.g., 200"
            onChange={formik.handleChange}
            value={formik.values.fee}
          />
          {formik.errors.fee && (
            <p className="text-red-600 text-sm">{formik.errors.fee}</p>
          )}
        </fieldset>

        <button
          className="bg-green-500 p-3 w-full text-white rounded-lg hover:bg-green-600 transition-colors"
          type="submit"
        >
          Add Schedule
        </button>
      </form>
    </div>
  );
}

export default Dscheduleadd;
