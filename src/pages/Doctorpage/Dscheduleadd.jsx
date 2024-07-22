import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import DHeader from "./DHeader";

function Dscheduleadd() {
  const { username } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      user: username,
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
        .post("http://127.0.0.1:8000/api/doctorscheduleadd", values, {
        })
        .then((res) => {
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
        <h1 className="text-emerald-700 font-bold">add new schedule</h1>
        <label className="font-bold">Name</label>
        <input
          className="w-[20%] self-center outline-none rounded-b-sm shadow-md py-2"
          type="text"
          name="name"
          value={formik.values.user}
          readOnly
        />
        <label className="font-bold">Date</label>
        <input
          className="self-center"
          type="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p className="text-red-600">{formik.errors.date}</p>
        <label className="font-bold">Time</label>
        <input
          className="self-center "
          type="time"
          name="time"
          onChange={formik.handleChange}
          value={formik.values.time}
        />
        <p className="text-red-600">{formik.errors.time}</p>

        <label className="font-bold">Fee</label>
        <input
          className="w-[20%] self-center outline-none rounded-sm shadow-md py-2"
          type="text"
          name="fee"
          onChange={formik.handleChange}
          value={formik.values.fee}
        />
        <p className="text-red-600">{formik.errors.fee}</p>

        <button
          className="bg-blue-400 p-3 w-[20%] rounded-lg self-center "
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Dscheduleadd;
