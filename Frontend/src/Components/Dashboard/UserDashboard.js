import React from "react";
import MainHeader from "../Headers/MainHeader/MainHeader.js";
import Footer from "../Footer/Footer.js";

const UserDashboard = () => {
  document.title = "User Dashboard";
  return (
    <>
      <MainHeader />
      <div className="container-fluid img-bg">
        <div className="container text-center">
          <h1 className="user-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Welcome Back!
          </h1>
          <p className="login-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            
          </p>
        </div>
      </div>
      <title>User Dashboard</title>
      <div>You are logged in</div>
      <div className="m-3">heloo my name is user</div>
      <Footer />
    </>
  );
};

export default UserDashboard;
