import React from "react";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/js/dist/collapse.js";

const Nav = ({ Toggle }) => {
  return (
    <div className="container-fluid">
      {/* <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
       <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
       <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
           aria-expanded="false" aria-label="Toggle navigation"><i className='bi bi-justify'></i></button>
       <div className="collapse navbar-collapse" id="collapsibleNavId">
           <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
               {/* <li className="nav-item">
                   <a className="nav-link active" href="#" aria-current="page">Home <span className="visually-hidden">(current)</span></a>
               </li>
               <li className="nav-item">
                   <a className="nav-link" href="#">Link</a>
               </li> 
               <li className="nav-item dropdown">
                   <a className="nav-link dropdown-toggle text-white" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">TaxiTime</a>
                   <div className="dropdown-menu" aria-labelledby="dropdownId">
                       <a className="dropdown-item" href="#">Profile</a>
                       <a className="dropdown-item" href="#">Setting</a>
                       <a className="dropdown-item" href="#">Logout</a>
                   </div>
               </li>
           </ul>
       </div>
   </nav> */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
        {" "}
        <i
          className="navbar-brand bi bi-justify-left fs-4"
          onClick={Toggle}
        ></i>{" "}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-justify"></i>
        </button>{" "}
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {" "}
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0 me-lg-5 me-md-5 me-sm-5">
            {" "}
            <li className="nav-item dropdown">
              {" "}
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
               TaxiTime{" "}
              </a>{" "}
              <div className="dropdown-menu" aria-labelledby="dropdownId" style={{position:"absolute"}}>
                {" "}
                <a className="dropdown-item" href="#">
                  Profile
                </a>{" "}
                <a className="dropdown-item" href="#">
                  Setting
                </a>{" "}
                <a className="dropdown-item" href="#">
                  Logout
                </a>{" "}
              </div>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </nav>
    </div>
  );
};

export default Nav;
