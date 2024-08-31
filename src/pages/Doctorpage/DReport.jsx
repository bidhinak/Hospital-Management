import { useEffect, useState } from "react";
import DHeader from "./DHeader";
import axios from "axios";
import { useSelector } from "react-redux";

function DReport() {
  const id = useSelector((state) => state.user.id);

  const [view, setView] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/docreportget/${id}/`
        );
        if (data) {
          setView(data.reverse());
        }
      } catch (error) {
        // Show error
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const totalFee = view.reduce((acc, curr) => acc + parseFloat(curr.fee), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <DHeader />
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        ) :
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full  bg-white shadow-md rounded-lg border border-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Time</th>
                  <th className="px-6 py-3 text-left">Fee</th>
                </tr>
              </thead>
              <tbody>
                {view.map((v) => (
                  <tr key={v.id} className="border-b border-gray-200">
                    <td className="px-6 py-4">{v.date}</td>
                    <td className="px-6 py-4">{v.time}</td>
                    <td className="px-6 py-4 text-green-600">{parseFloat(v.fee).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-right font-semibold text-gray-800">
                    Total Earnings:
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {totalFee.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>}
      </div>
    </div>
  );
}

export default DReport;
