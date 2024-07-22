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
        <Adminpage/>
      <div className="text-center">
        <h1 className="text-pretty text-2xl text-green-400">Notification </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <label>description</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.description}
            className="px-1 outline-none border rounded-md shadow-lg py-3 w-[50%] self-center"
            name="description"
            type="text"
          />
          <p className="text-red-700 text-center">
            {formik.errors.description}
          </p>
          <button className="bg-blue-500 py-3 rounded-md w-[20%] self-center" type="submit">send</button>
        </form>

      </div>
      
        
    </div>
  );
}

export default Anotadd;
