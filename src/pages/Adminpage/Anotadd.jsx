import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import Adminpage from "./Adminpage";

function Anotadd() {
  const formik = useFormik({
    initialValues: { description: "" },
    validationSchema: yup.object({
      description: yup.string().min(1).max(400).required(),
    }),
    onSubmit: (values) => {
      axios
        .post("http://127.0.0.1:8000/api/Notificationdetails", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            toast.success("notification successfully sended");
            formik.resetForm();
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div>
      <Adminpage />
      <div className="text-center flex flex-col gap-6 mt-5">
        <h1 className="text-pretty text-3xl  text-green-500">Add your Notification </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <label className="text-xl font-serif">Description</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.description}
            className="px-1 outline-none border rounded-md shadow-lg py-2 w-[50%] self-center"
            name="description"
            placeholder="type something..."
            type="text"
          />
          <p className="text-red-700 text-center">
            {formik.errors.description}
          </p>
          <button
            className="bg-green-400 text-white py-3 rounded-md w-[20%] self-center"
            type="submit"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

export default Anotadd;
