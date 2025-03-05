import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form ,Modal } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BasicButton = () => {
  const navigate = useNavigate();
  const [listusers, setlistusers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [backdetails, setbackdetails] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/users/getdisapprovedrequest')
      .then((response) => response.json())
      .then((data) => {
        setlistusers(data);
        // console.log(data);
      });
  }, []);

  const HandleEditbtn = async (id) => {
    setShowModal(true);
    // console.log(id);
    try {
      const response = await axios.get(`http://localhost:8000/api/users/getdisapprovedbankdetailes/${id}`);
      // console.log('helooooo', response.data);

      if (response.status === 200) {
        setbackdetails(response.data);
        // console.log(response.data[0]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handledisApprovebtn = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/reapprovedstaus/${id}`);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
      name: 'id',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: 'Request ID',
      selector: (row) => row.request_id,
      sortable: true
    },
    {
      name: 'Bank Account ID',
      selector: (row) => row.bank_account_id,
      sortable: true
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true
    },
    {
      name: 'request date',
      selector: (row) => row.created_at,
      sortable: true
    },
    {
      name: 'Status ',
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-warning btn-sm me-2 p-2  btn-dark" onClick={() => HandleEditbtn(row.bank_account_id)}>
            Datails
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
          <Card title="WITHDRAW DISAPPROVED">
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
                    <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="w-50 me-2" />
                    <Button onClick={() => navigate('/account/withdrawapproved')} className="btn-dark">
                      Approved 
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
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Requested for withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {backdetails && (
            <>
              <p>
                <strong>Account Name:</strong> {backdetails[0].account_name}
              </p>
              <p>
                <strong>Bank Name:</strong> {backdetails[0].bank_name}
              </p>
              <p>
                <strong>Account Number:</strong> {backdetails[0].account_number}
              </p>
              <p>
                <strong>IFSC code:</strong> {backdetails[0].IFSC_code}
              </p>
              <p>
                <strong>MICR code:</strong> {backdetails[0].MICR_code}
              </p>
              <p>
                <strong>Withdraw Amount:</strong> {backdetails[0].withdrawal_amount}
              </p>
              <p>
                <strong>Country:</strong> {backdetails[0].country}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="dark" onClick={() => handledisApprovebtn(listusers[0].request_id)}>
            Disapprove
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default BasicButton;
