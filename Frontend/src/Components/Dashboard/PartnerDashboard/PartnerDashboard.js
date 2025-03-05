import React , {useState} from "react";
import PartnerHome from "./PartnerHome.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import Footer from "../Footer/Footer";
import './Dashboard.css'

const PartnerDashboard = () => {
  document.title = "Partner Dashboard";
  const [toggle, setToggle] = useState(true)    
  const Toggle = () => {        
    setToggle(!toggle) 
  }
  return (
    <>
      <div className="container-fluid bg-secondary min-vh-100">
          <div className="row">
          {toggle &&  
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <title>Partner Dashboard</title>
              {/* <div>Partner is logged in</div> */}
              <div className="bg-white sidebar p-2">
                <div>
                  <span className="brand-name fs-4">TaxiTime</span>
                </div>
                <hr className="text-dark" />
                <div className="list-group list-group-flush">
                  <a className="list-group-item py-2" href="#">
                    <span>Partner Earning</span>
                  </a>
                  <a className="list-group-item py-2" href="#">
                    <span>Profile</span>
                  </a>
                  <a className="list-group-item py-2" href="#">
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            </div>}
            {toggle &&  <div className='col-4 col-md-2'></div>} 
            <div className="col">
                <PartnerHome Toggle={Toggle}/>
            </div>
          </div> 
      </div>
      {/* <div style={{position:"absolute", bottom: "0", width: "100%"}}>
              <Footer />
            </div> */}
      {/* <div style={{position:"absolute", bottom: "0", width: "100%",left: "0" ,marginTop: "20px"}}>
              <Footer />
            </div>  */}
    </>
  );
};

export default PartnerDashboard;
