import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container, Table } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';
import axios from 'axios';

const BasicBadges = () => {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/getsitesetting`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const keyMapping = {
    "site_title": "Website Name ",
    "site_logo": "Website Logo",
    "site_email_logo": "Email Logo",
    "site_icon": "Website Icon",
    "site_copyright": "Copyright Content",
    "sos_number": "SOS Number",
    "contact_number": "Contact Number",
    "map_key": "Map Key",
    "android_user_fcm_key": "Android User FCM Key",
    "android_user_driver_key": "Android Driver FCM Key", 
    "contact_email" : "Contact Email",
    "site_link" : "Website Link",
    "contact_address" : "Contact Address",
    "contact_city" : "Contact City",
    "store_link_android" : "Android Store Link",
    "store_link_ios" : "IOS Store Link",
    "provider_select_timeout" : "Provider Accept Timeout",
    "provider_search_radius" : "Provider Search Radius",
    "social_login"  : "Social Login",
    "verification" : "Phone Verification In App",
    "/f_text\d+/g" : ""
  };

  const keyOrder = [
    "site_title",  
    "site_logo",   
    "site_icon",    
    "f_testore_link_androidxt4",    
    "store_link_ios",    
    "provider_select_timeout",  
    "provider_search_radius",   
    "sos_number",    
    "map_key",    
    "android_user_fcm_key", 
    "android_user_driver_key",
    "social_login"
  ];
  return (
    <React.Fragment>
      <Row>
        <Col className="btn-page">
          <Card title="SITE SETTING">
          <Container className="mt-3">

        <Table hover>
          <thead>
            <tr>
              <th style={{ width: '20px' }}>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting) => (
              <tr key={setting.id}>
                <td><td>{keyMapping[setting.key] || setting.key}</td> </td>
                <td>
                  {setting.key.includes("logo") || setting.key.includes("icon") ? (
                    <div>
                      <img src={setting.value} alt={setting.key} height="40px" className="mb-2" />
                      <Form.Control type="file" />
                    </div>
                  ) : (
                    <Form.Control
                      type="text"
                      value={setting.value}
                      onChange={(e) => handleInputChange(setting.id, e.target.value)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end">
          <Button variant="primary">Update</Button>
        </div>
   
    </Container>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicBadges;
