import axios from "axios";
import { useEffect, useState } from "react";
import Adminpage from "./Adminpage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ViewDoctors() {
  const navigate=useNavigate();
  const [profile,setProfile]=useState([]);
  
  const deletePost=async(id)=>{
    try {
      const {status}=await axios.delete(`http://127.0.0.1:8000/api/doctordetailsget/${id}`);
      if(status===204){
        setProfile((prev)=>prev.filter((x)=>x.id!==id));
        toast.success(
          "doctor removed from the list successfully"
        );
      }else{
        toast.error("not removed");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const addtolist = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/doctordetailsget/${id}`);
        if (response.status===208) {
          toast.error("item already exist")
        }
        else{
          navigate(`/aaddtolist/${id}`)
        }
       
    } catch  {
        console.log("error");
    }
};
  
  

    useEffect(()=>{
        (async()=>{
            try {
                const {data}=await axios.get("http://127.0.0.1:8000/api/doctordetails");
                setProfile(data)
            } catch (error) {
             console.log(error);   
            }
        })();
    },[profile]);
    
  return (
    <div>
        <Adminpage/>
        <div className="relative overflow-x-auto  mx-10 my-8 rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-10 py-3">
                Name
              </th>
              <th scope="col" className="px-10 py-3">
                Department
              </th>
              <th scope="col" className="px-10 py-3">
                Mobile
              </th>
              <th scope="col" className="px-10 py-3">
                Email
              </th>
              <th scope="col" className="px-10 py-3">
                Qualification
              </th>
              <th scope="col" className="px-10 py-3">
                photo
              </th>
              <th scope="col" className="px-10 py-3">
                Add to the list
              </th>
              <th scope="col" className="px-10 py-3">
                Delete from list
              </th>

              
            </tr>
          </thead>

          {profile.map((pro) => (
            <tbody
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={pro.id}
            >
              <td className="px-10 py-3">{pro.username}</td>
              <td className="px-10 py-3">{pro.department}</td>
              <td className="px-10 py-3">{pro.mobile}</td>
              <td className="px-10 py-3">{pro.email}</td>
              <td className="px-10 py-3">{pro.qualification}</td>
             
              <td className="px-8 py-3 size-20"><img src={`http://127.0.0.1:8000${pro.photo}`}></img></td>
              <td className="px-10 py-3"><button onClick={()=>addtolist(pro.id)}>add</button></td>
              <td className="px-10 py-3"><button className="text-red-500" onClick={()=>deletePost(pro.id)}>DELETE</button></td>

            </tbody>
          ))}
        </table>
        
      </div>
    </div>
  )
}

export default ViewDoctors
