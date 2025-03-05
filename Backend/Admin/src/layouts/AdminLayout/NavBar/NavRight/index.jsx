import React, { useState } from 'react';
import { Card, ListGroup, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const NavRight = () => {
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    Cookies.remove('token');
    alert('logout');
    navigate('/login');
  };

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={'end'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>Admin</span>
                <button  className="dud-logout" 
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Logout"
                  onClick={handleLogoutBtn}
                >
                  <i className="feather icon-log-out" style={{ fontSize: "16px" }}/>
                </button>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                {/* <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item> */}
                {/* <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </Link>
                </ListGroup.Item> */}
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;
