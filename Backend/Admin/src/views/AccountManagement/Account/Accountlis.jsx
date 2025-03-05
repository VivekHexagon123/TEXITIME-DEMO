import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';

const BasicButton = () => {
  const navigate = useNavigate();
  const [listusers, setlistusers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/users/accountlist')
      .then((response) => response.json())
      .then((data) => {
        setlistusers(data);
        console.log(data);
      });
  }, []);

  const HandleEditbtn = async (id) => {
    console.log(id);
    try {
      const response = await axios.put(`http://localhost:8000/api/users/accountstatusUpadate/${id}`)
      if(response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } 
    
  };
  // const handleDelete = async (id) => {
  //   console.log(id);

  //   try {
  //     const response = await fetch(`http://localhost:8000/api/users/deleteusers/${id}`, {
  //       method: 'DELETE'
  //     });
  //     if (response.ok) {
  //       setlistusers(listusers.filter((user) => user.id !== id));
  //     } else {
  //       console.error('Failed to delete user');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

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
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: 'Account Name',
      selector: (row) => row.account_name,
      sortable: true
    },
    {
      name: 'Bank Name',
      selector: (row) => row.bank_name,
      sortable: true
    },
    {
      name: ' Account Number',
      selector: (row) => row.account_number,
      sortable: true
    },
    {
      name: 'Type',
      selector: (row) => row.type,
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
          <button className="btn btn-warning btn-sm me-2 p-2  btn-dark" onClick={() => HandleEditbtn(row.id)}>
            <i className="bi bi-pencil-square"></i>
            APPROVED
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
    </React.Fragment>
  );
};

export default BasicButton;
