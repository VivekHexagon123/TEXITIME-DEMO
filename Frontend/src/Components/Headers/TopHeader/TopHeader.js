import React from "react";
import msg from "../../../Picture/msg.png";
import group from "../../../Picture/Group.png";
import "./TopHeader.css";

const TopHeader = () => {
  return (
    <div className="container-fluid bg-fluid">
      <div className="container">
        <div className="row d-flex justify-content-evenly pt-2">
          <div className="col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="img-parent text-center">
              <div className="email-img">
                <img src={msg} className="img-msg" alt="mail" />
              </div>
              <a href="#" className="email">
                <p className="pt-1">Email Us :contact@taxitime.com</p>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-12"></div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-12"></div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="img-parent text-center">
              <div className="email-img">
                <img src={group} className="img-msg" alt="phone" />
              </div>
              <a href="#" className="email">
                <p className="pt-1">Phone :9898989090</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
