import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Card, Button, Form } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card1 from '../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { set } from 'immutable';

const BasicButton = () => {
  const [OverallRides, setOverallRides] = useState(0);
  const navigate = useNavigate();
  const [listusers, setlistusers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dashSalesData = [
    {
      title: 'Over All Earning',
      amount: `${OverallRides.total_sum}`,
      icon: 'bi bi-currency-rupee text-c-green  ',
      class: 'progress-c-theme',
      text: `Over All Earning`
    },
    {
      title: 'Over All Commission ',
      amount: `${OverallRides.commission_sum}`,
      icon: 'bi bi-currency-rupee text-c-green',
      class: 'progress-c-theme2',
      text: `Over All Commission`
    },
    {
      title: 'Total No. of Rides',
      amount: `${OverallRides.total_requests}`,
      icon: 'bi bi-graph-up text-c-green',
      color: 'progress-c-theme',
      text: `${(OverallRides.total_requests * OverallRides.cancelled_requests) / 100}% down from cancelled Request`
    },
    {
      title: ' Revenue ',
      amount: `${OverallRides.total_sum}`,
      icon: 'bi bi-currency-rupee text-c-green',
      color: 'progress-c-theme',
      text: `from ${OverallRides.total_requests}Rides`
    },
    {
      title: ' Cancelled Rides',
      amount: `${OverallRides.cancelled_requests}`,
      icon: 'bi bi-graph-down text-c-red',
      color: 'progress-c-theme',
      text: `from ${OverallRides.total_requests}Rides`
    }
  ];
  const statusColors = {
    SEARCHING: "bg-primary text-white",   // Blue
    CANCELLED: "bg-danger text-white",    // Red
    ACCEPTED: "bg-info text-white",       // Light Blue
    STARTED: "bg-warning text-dark",      // Yellow
    ARRIVED: "bg-secondary text-white",   // Grey
    PICKEDUP: "bg-success text-white",    // Green
    DROPPED: "bg-dark text-white",        // Black
    COMPLETED: "bg-success text-white",   // Green
    SCHEDULED: "bg-primary text-white",   // Blue
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/users/overallridessatementcount')
      .then((response) => response.json())
      .then((data) => {
        setOverallRides(data.result[0]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/allridessatementcount')
      .then((response) => response.json())
      .then((data) => {
        setlistusers(data.result);
      });
  }, []);

  const HandleEditbtn = async (id) => {
      navigate(`/Statement/ridedetiles/${id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = listusers.filter((user) =>
      Object.values(user).some((field) => field && field.toString().toLowerCase().includes(value))
    );
    setFilteredUsers(filteredData);
  };
  const columns = [
    {
      name: 'Bookinf ID',
      selector: (row) => row.booking_id,
      sortable: true
    },
    {
      name: 'Status ',
      selector: (row) => row.status,
      sortable: true ,
      cell: (row) => (
        <span
        className={`px-3 py-1 rounded d-inline-flex justify-content-center align-items-center fw-bold text-uppercase ${statusColors[row.status] || "bg-light text-dark"}`}
        style={{ minWidth: "120px" }} // Ensures same width for all statuses
      >
        {row.status}
      </span>
      )
    },
    {
      name: 'Picked Up',
      selector: (row) => row.picked_up,
      sortable: true
    },
    {
      name: 'dropped',
      selector: (row) => row.dropped,
      sortable: true
    },
    {
      name: ' Dated On',
      selector: (row) => row.dated_on,
      sortable: true
    },
    {
      name: 'Commision',
      selector: (row) => row.commision,
      sortable: true
    },
    {
      name: 'Earned',
      selector: (row) => row.Earned,
      sortable: true
    },
   
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-warning btn-sm me-2 p-2  btn-dark" onClick={() => HandleEditbtn(row.request_id)}>
            RIDES DETAILS
          </button>
        </div>
      )
    }
  ];

  // 📌 Export to CSV
  const exportToCSV = () => {
    const csvData = listusers.map((row) => ({
      ID: row.id,
      FirstName: row.first_name,
      LastName: row.last_name,
      Email: row.email,
      mobile: row.mobile
    }));

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'DataTable_Export.csv');
  };

  // 📌 Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(listusers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'DataTable_Export.xlsx');
  };

  // 📌 Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Data Table Export', 20, 10);
    const tableColumn = ['ID', 'first name', 'last name', 'Email', 'mobile'];
    const tableRows = listusers.map((row) => [row.id, row.first_name, row.last_name, row.email, row.mobile]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save('DataTable_Export.pdf');
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card1 title="OVERALL STATEMENT">
            <OverlayTrigger>
              <>
                <Row>
                  {dashSalesData.slice(0, 2).map((data, index) => (
                    <Col key={index} xl={6} md={6}>
                      <Card>
                        <Card.Body>
                          <h6 className="mb-4">{data.title}</h6>
                          <div className="row d-flex align-items-center">
                            <div className="col-9">
                              <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                <i className={`feather ${data.icon} f-30 m-r-5 me-2`} />
                                {data.amount}
                              </h3>
                            </div>
                            <p className="mt-2">{data.text}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Row>
                  {dashSalesData.slice(2, 5).map((data, index) => (
                    <Col key={index} xl={4} md={6}>
                      <Card>
                        <Card.Body>
                          <h6 className="mb-4">{data.title}</h6>
                          <div className="row d-flex align-items-center">
                            <div className="col-9">
                              <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                <i className={`feather ${data.icon} f-30 m-r-5 me-2`} />
                                {data.amount}
                              </h3>
                            </div>
                            <div>
                              <p className="mt-2">{data.text}</p>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row className="btn-page">
                  <Col>
                    <Card1 title="RIDES STATEMENT">
                      <OverlayTrigger>
                        <>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <Button onClick={exportToCSV} className="btn-dark me-2">
                                Export CSV
                              </Button>
                              <Button onClick={exportToExcel} className="btn-dark me-2">
                                Export Excel
                              </Button>
                              <Button onClick={exportToPDF} className="btn-dark me-2">
                                Export PDF
                              </Button>
                            </div>
                            <div className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-50 me-2"
                              />
                              <Button onClick={() => navigate('/account/accounapproved')} className="btn-dark">
                                APPROVED ACCOUNT
                              </Button>
                            </div>
                          </div>
                          <DataTable
                            className="table thead-dark"
                            columns={columns}
                            data={filteredUsers.length === 0 ? listusers : filteredUsers}
                            pagination
                            highlightOnHover
                            striped
                            responsive
                          ></DataTable>
                        </>
                      </OverlayTrigger>
                    </Card1>
                  </Col>
                </Row>
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicButton;
