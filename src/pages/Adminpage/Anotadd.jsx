import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import Adminpage from "./Adminpage";

function Anotadd() {
  const formik = useFormik({
    initialValues: { description: "" },
    validationSchema: yup.object({
      description: yup.string().min(1).max(400).required("Description is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://127.0.0.1:8000/api/Notificationdetails", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data) {
            toast.success("Notification successfully sent");
            formik.resetForm();
          }
        })
        .catch(() => {
          toast.error("Failed to send notification");
        });
    },
  });

  return (
    <div>
      <Adminpage />
      <div className="flex flex-col items-center gap-8 mt-10">
        <h1 className="text-4xl font-bold text-green-600">Add Your Notification</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full max-w-lg">
          <label className="text-lg font-medium">Description</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.description}
            className={`px-4 py-3 border rounded-md shadow-sm focus:outline-none ${
              formik.errors.description ? "border-red-500" : "border-gray-300"
            }`}
            name="description"
            placeholder="Type something..."
            type="text"
          />
          {formik.errors.description && (
            <p className="text-red-600 text-sm">{formik.errors.description}</p>
          )}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-md shadow-md transition-all duration-200 ease-in-out"
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
