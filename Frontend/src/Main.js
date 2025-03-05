import React from "react";
// import TopHeader from "./Components/Headers/TopHeader/TopHeader";
// import MainHeader from "./Components/Headers/MainHeader/MainHeader";
// import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import UserLogin from "./Components/UserLogin/UserLogin.js";
import UserRegistration from "./Components/UserRegistration/UserRegistration.js";
import PartnerRegistration from "./Components/PartnerRegistration/PartnerRegistration.js";
import PartnerLogin from "./Components/PartnerLogin/PartnerLogin.js";
import Contact from "./Components/Contact/Contact.js";
import UserDashboard from "./Components/Dashboard/UserDashboard.js";
import PartnerDashboard from "./Components/Dashboard/PartnerDashboard/PartnerDashboard.js";
import ForgetPassword from "./Components/UserLogin/ForgetPassword/ForgetPassword.js";
import Forgetoptinput from "./Components/UserLogin/ForgetPassword/Frogetoptinput.js";
import PrivateRoute from "./UserPrivateRoute.js";
import PartenerForgetPassword from "./Components/PartnerLogin/ForgetPassword/PartnerForgetPassword.js"
import PartnerForgetinput from "./Components/PartnerLogin/ForgetPassword/PartnerForgetinput.js"

const Main = () => {
  return (
    <>
      {/* <TopHeader />
      <MainHeader /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/registration" element={<UserRegistration />} />
        {/* <Route path="/user/dashboard" element={<UserDashboard/>}/> */}
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/registration" element={<PartnerRegistration />} />
        <Route path="/partner/dashboard" element={<PartnerDashboard/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/login/forgetpassword" element={<ForgetPassword />} />
        <Route path="/user/login/forgetpassword/Forgetoptinput" element={<Forgetoptinput />} />
       <Route path="/partner/login/forgetpassword" element={<PartenerForgetPassword />} />
       <Route path="/partner/login/forgetpassword/PartenerForgetoptinput" element={<PartnerForgetinput />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  )
};

export default Main;
