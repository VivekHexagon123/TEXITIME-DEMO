import React, { useState, useEffect } from 'react';

import { Row, Col, Card } from 'react-bootstrap';

const DashDefault = () => {
  const [userscount, setUserscount] = useState(0);
  const [Dispatchercount, setDispatcherscount] = useState(0);
  const [Providerscount, setProviderscount] = useState(0);
  const [Fleetscount, setFleetscount] = useState(0);
  const dashSalesData = [
    { title: 'Users', amount: `${userscount}`, icon: 'icon-arrow-up text-c-green  ', value: 50, class: 'progress-c-theme' },
    { title: 'Dispatchers', amount: `${Dispatchercount}`, icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
    { title: 'Providers', amount: `${Providerscount}`, icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' },
    { title: ' Fleets ', amount: `${Fleetscount}`, icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
  ];

  useEffect(() => {
    fetch('http://localhost:8000/api/users/countuser')
      .then((response) => response.json())
      .then((data) => {
        setUserscount(data.count);
        console.log(data.count);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countDispatchers')
      .then((response) => response.json())
      .then((data) => {
        setDispatcherscount(data.count);
        console.log(data.count);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countFleets')
      .then((response) => response.json())
      .then((data) => {
        setFleetscount(data.count);
        console.log(data.count);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countproviders')
      .then((response) => response.json())
      .then((data) => {
        setProviderscount(data.count);
        console.log(data.count);
      });
  }, []);

  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => {
          return (
            <Col key={index} xl={4} xxl={3}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} />{' '}
                        <svg
                          style={{ marginRight: '5px', marginBottom: '2px' }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        {data.amount}
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <p className="m-b-0">{data.value}%</p>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
