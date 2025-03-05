import React from "react";
import contactpic from "../../Picture/contact2.png";
import "./Contact.css";
// import TopHeader from "../Headers/TopHeader/TopHeader.js";
import MainHeader from '../Headers/MainHeader/MainHeader.js';
import Footer from "../Footer/Footer.js";

const Contact = () => {
  document.title = 'Contact'
  return (
    <>
    {/* <TopHeader /> */}
    <MainHeader />
  <title>Contact</title>
      <div className="container-fluid contact-img-bg">
        <div className="container text-center contact-panel">
          <h1 className="contact-text">
            We would love to hear <br /> from you
          </h1>
        </div>
      </div>
      <div className="container text-center">
        <h1 className="contact-provide">Get in touch with us</h1>
        <p style={{ fontSize: "15px" }}>
          Lorem Ipsum passages, and more recently with desktop publishing
          software like <br /> aldus pageMaker including versions of all the
          Lorem Ipsum generators
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 text-center contact-form">
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="contact-input my-3 text-center"
                  name="username"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="contact-input my-3 text-center"
                  name="email"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="contact-input my-3 text-center"
                  name="subject"
                />
                <input
                  type="text"
                  placeholder="Your message"
                  className="contact-input-msg my-3 text-center"
                  name="message"
                />
              </div>
              <button className="contact-submit mt-5 mb-3">Submit ▶</button>
            </form>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img src={contactpic} className="contact-img" alt="contact" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
