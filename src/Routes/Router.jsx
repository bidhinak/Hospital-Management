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
import Dscheduleadd from "../pages/Doctorpage/Dscheduleadd";
import Uprofile from "../pages/Userpage/Uprofile";
import Ascheduleview from "../pages/Adminpage/Ascheduleview";
import Dscheduleview from "../pages/Doctorpage/Dscheduleview";
import AViewAddedList from "../pages/Adminpage/AViewAddedList";
import UCheckSchedule from "../pages/Userpage/UCheckSchedule";
import UDocprofile from "../pages/Userpage/UDocProfile";
import DBookView from "../pages/Doctorpage/DBookView";
import UBookedSchedule from "../pages/Userpage/UBookedSchedule";
import About from "../pages/Userpage/About";
import DUpdatePassword from "../pages/Doctorpage/DUpdatePassword";
import UUpdatePassword from "../pages/Userpage/UUpdatePassword";
import ViewUsers from "../pages/Adminpage/ViewUsers";
import DReport from "../pages/Doctorpage/DReport";
import ADocEarningsView from "../pages/Adminpage/ADocEarningsView";
import AUserBookings from "../pages/Adminpage/AUserBookings";


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
        <Route path="udocprofile/:id" element={<UDocprofile/>}/>
        <Route path="ucheckschedule/:id" element={<UCheckSchedule/>}/>
        <Route path="uprofile" element={<Uprofile/>}/>
        <Route path="ubookedschedule" element={<UBookedSchedule/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="userupdatepassword" element={<UUpdatePassword/>}/>


        {/* doctor */}
        <Route path="ddashboard" element={<DDashboard/>}/>
        <Route path="dscheduleadd" element={<Dscheduleadd/>}/>
        <Route path="dscheduleview" element={<Dscheduleview/>}/>
        <Route path="dbookview/:id" element={<DBookView/>}/>
        <Route path="dprofileview" element={<Dprofileview/>}/>
        <Route path="notification" element={<DNotview/>}/>
        <Route path="docupdatepassword" element={<DUpdatePassword/>}/>
        <Route path="dreport" element={<DReport/>}/>
        
        {/* admin */}
        <Route path="adminpage" element={<Adminpage/>}/>
        <Route path="adashboard" element={<ADashboard/>}/>
        <Route path="anotadd" element={<Anotadd/>}/>
        <Route path="anotview" element={<Anotview/>}/>
        <Route path="viewdoctors" element={<ViewDoctors/>}/>
        <Route path="viewusers" element={<ViewUsers/>}/>
        <Route path="auserbookings/:id" element={<AUserBookings/>}/>
        <Route path="aaddtolist/:id" element={<AAddToList/>}/>
        <Route path="aviewaddedlist" element={<AViewAddedList/>}/>
        <Route path="ascheduleview/:id" element={<Ascheduleview/>}/>
        <Route path="aearningsview/:id" element={<ADocEarningsView/>}/>
    </Routes>
  )
}

export default Router
