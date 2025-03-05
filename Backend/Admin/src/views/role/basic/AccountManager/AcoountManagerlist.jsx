import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const BasicButton = () => {
  const navigate = useNavigate();
  const [listusers, setlistusers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/users/listaccountmanager')
      .then((response) => response.json())
      .then((data) => {
        setlistusers(data);
      });
  }, []);

  const HandleEditbtn = async (userid) => {
    navigate(`/basic/AccountManagerUpdate/${userid}`);
  };
  const handleDelete = async (id) => {
    console.log(id);

    try {
      const response = await fetch(`http://localhost:8000/api/users/deleteaccountmanager/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setlistusers(listusers.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
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
      name: 'Id',
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: ' Full Name',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-dark btn-sm me-2 p-2" onClick={() => HandleEditbtn(row.id)}>
            <i className="bi bi-pencil-square"></i>
            Edit
          </button>
          <button className="btn btn-danger btn-sm me-2 p-2" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash-fill"></i>
            Delete
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
      <Row className="btn-page">
        <Col>
          <Card title="ACCOUNT MANAGAR">
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
                    <Button onClick={() => navigate('/basic/AddNewAccountManager')} className="btn-dark">
                      Add New User
                    </Button>
                  </div>
                </div>
                {/* <Button
                  onClick={() => navigate('/basic/AddNewFleetowner')}
                  className=" px-3 py-2 text-white rounded m-2  btn-dark float-end"
                >
                  <i className="bi bi-person-add" />
                  Add New Fleet Owner
                </Button>
                <button onClick={exportToCSV} className="px-3 py-2 bg-blue-500 text-white rounded m-2 btn btn-dark">
                  Export CSV
                </button>
                <button onClick={exportToExcel} className="px-3 py-2 bg-green-500 text-white rounded m-2 btn btn-dark">
                  Export Excel
                </button>
                <button onClick={exportToPDF} className="px-3 py-2 bg-red-500 text-white rounded m-2 btn btn-dark">
                  Export PDF
                </button> */}

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
      {/* )} */}
    </React.Fragment>
  );
};

export default BasicButton;
