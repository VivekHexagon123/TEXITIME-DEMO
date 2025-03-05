import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';

const BasicButton = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [listusers, setlistusers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/providerridessatement/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setlistusers(data.result );
        console.log(data);
      });
  }, []);




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
        selector: (row) => row.booking_id ? row.booking_id : '-',
        sortable: true
      },
      {
        name: 'Status ',
        selector: (row) => row.status ? row.status : '-',
        sortable: true ,
        cell: (row) => (
          <span
          className={`px-3 py-1 rounded d-inline-flex justify-content-center align-items-center fw-bold text-uppercase ${statusColors[row.status] || "bg-light text-dark"}`}
          style={{ minWidth: "120px" }} // Ensures same width for all statuses
        >
          {row.status ? row.status : '-'}
        </span>
        )
      },
      {
        name: 'Picked Up',
        selector: (row) => row.picked_up ? row.picked_up : '-',
        sortable: true
      },
      {
        name: 'dropped',
        selector: (row) => row.dropped ? row.dropped : '-',
        sortable: true
      },
      {
        name: ' Dated On',
        selector: (row) => row.dated_on ? row.dated_on : '-',
        sortable: true
      },
      {
        name: 'Commision',
        selector: (row) => row.commision ? row.commision : '-',
        sortable: true
      },
      {
        name: 'Earned',
        selector: (row) => row.Earned ? row.Earned : '-',
        sortable: true
      },
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
          <Card title="USERS">
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
                    <Button onClick={() => navigate('/account/accounapproved')} className="btn-dark">
                      APPROVED ACCOUNT
                    </Button>
                  </div>
                </div>
                <DataTable
                  className="table thead-dark"
                  columns={columns}
                  data={filteredUsers.length === 0 ? (listusers ? listusers : columns.name ) : filteredUsers}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                ></DataTable>
                <Button onClick={() =>{window.history.back();}} className="btn-dark me-2"> Back </Button>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicButton;
