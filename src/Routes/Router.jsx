import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import Facilities from "../components/home/Header/Facilities";
import Departments from "../components/home/Header/Departments";
import Officiallogin from "../components/LOGIN/officiallogin/Officiallogin";
import Ulogin from "../components/LOGIN/ulogin/Ulogin";
import Usersignup from "../components/LOGIN/ulogin/Usersignup";
import Doctorsignup from "../components/LOGIN/officiallogin/Doctorsignup";
import UDashboard from "../pages/Userpage/UDashboard";
import ADashboard from "../pages/Adminpage/ADashboard";
import Anotadd from "../pages/Adminpage/Anotadd";
import Anotview from "../pages/Adminpage/Anotview";
import Adminpage from "../pages/Adminpage/Adminpage";
import DNotview from "../pages/Doctorpage/DNotview";
import Dprofileview from "../pages/Doctorpage/Dprofileview";
import DDashboard from "../pages/Doctorpage/DDashboard";
import ViewDoctors from "../pages/Adminpage/ViewDoctors";
import UHeader from "../pages/Userpage/UHeader";
import AAddToList from "../pages/Adminpage/AAddToLIst";
import UDoctorprofile from "../pages/Userpage/UDoctorprofile";
import Dscheduleadd from "../pages/Doctorpage/Dscheduleadd";
import Uprofile from "../pages/Userpage/Uprofile";
import Ascheduleview from "../pages/Adminpage/Ascheduleview";
import Dscheduleview from "../pages/Doctorpage/Dscheduleview";


function Router() {
  return (
    <Routes>
      {/* homepage */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="home" element={<HomePage/>}/>
        <Route path="facilities" element={<Facilities/>}/>
        <Route path="departments" element={<Departments/>}/>
        {/* login */}
        <Route path="userlogin" element={<Ulogin/>}/>
        <Route path="officiallogin" element={<Officiallogin/>}/>
        {/* signup */}
        <Route path="usersignup" element={<Usersignup/>}/>
        <Route path="doctorsignup" element={<Doctorsignup/>}/>
        {/* user */}
        <Route path="uheader" element={<UHeader/>}/>
        <Route path="udashboard" element={<UDashboard/>}/>
        <Route path="udoctorprofile/:id" element={<UDoctorprofile/>}/>
        <Route path="uprofile" element={<Uprofile/>}/>

        {/* doctor */}
        <Route path="ddashboard" element={<DDashboard/>}/>
        <Route path="dscheduleadd" element={<Dscheduleadd/>}/>
        <Route path="dscheduleview" element={<Dscheduleview/>}/>
        <Route path="dprofileview" element={<Dprofileview/>}/>
        <Route path="notification" element={<DNotview/>}/>
        
        {/* admin */}
        <Route path="adminpage" element={<Adminpage/>}/>
        <Route path="adashboard" element={<ADashboard/>}/>
        <Route path="anotadd" element={<Anotadd/>}/>
        <Route path="anotview" element={<Anotview/>}/>
        <Route path="viewdoctors" element={<ViewDoctors/>}/>
        <Route path="aaddtolist/:id" element={<AAddToList/>}/>
        <Route path="ascheduleview" element={<Ascheduleview/>}/>
    </Routes>
  )
}

export default Router
