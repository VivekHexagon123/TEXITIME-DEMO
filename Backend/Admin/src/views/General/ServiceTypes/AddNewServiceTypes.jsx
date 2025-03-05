import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../../../components/Card/MainCard';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BasicButton = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    provider_name: '',
    fixed: '',
    distance: '',
    minute: '',
    price: '',
    capacity: '',
    type: '',
    calculator: '',
    description: '',
    image: '',
    imagePreview: null
  });
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0], imagePreview: URL.createObjectURL(e.target.files[0]) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('provider_name', formData.provider_name);
    data.append('fixed', formData.fixed);
    data.append('distance', formData.distance);
    data.append('minute', formData.minute);
    data.append('price', formData.price);
    data.append('capacity', formData.capacity);
    data.append('type', formData.type);
    data.append('calculator', formData.calculator);
    data.append('description', formData.description);
    data.append('image', formData.image || formData.imagePreview);

    console.log(data);
    
    try {
      await axios.post(`http://localhost:8000/api/users/addnewservicetype`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Updated Successfully!');
      navigate('/ServiceTypes/ListServiceTypes');
    } catch (error) {
      if (error.status === 401) {
        return toast.error(error.response.data.error);
      }
      //   toast.error(error.response.data.error[0]);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col className="btn-page">
          <Card title="ADD NEW SERVICE TYPE">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            // isInvalid={!!errors.first_name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Provider Name</Form.Label>
                          <Form.Control type="text" name="provider_name" value={formData.provider_name} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Base Price (₹0.00)</Form.Label>
                          <Form.Control type="text" name="fixed" value={formData.fixed} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Base Distance</Form.Label>
                          <Form.Control type="text" name="distance" value={formData.distance} maxLength={10} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Unit Time Pricing (₹0.00)</Form.Label>
                          <Form.Control type="text" name="minute" value={formData.minute} onChange={handleChange} />
                        </Form.Group>
                      </Col>{' '}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Unit Distance Price (Km)</Form.Label>
                          <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                        </Form.Group>
                      </Col>{' '}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Seat Capacity</Form.Label>
                          <Form.Control type="text" name="capacity" value={formData.capacity} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Pricing Logic</Form.Label>
                          <Form.Select name="calculator" value={formData.calculator} onChange={handleChange}>
                            <option value="MIN">Per Minute Pricing</option>
                            <option value="HOUR">Per Hour Pricing</option>
                            <option value="DISTANCE">Distance Pricing</option>
                            <option value="DISTANCEMIN">Distance and Per Minute Pricing</option>
                            <option value="DISTANCEHOUR">Distance and Per Hour Pricing</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Pricing Logic</Form.Label>
                          <Form.Control name="calculator" value={formData.calculator} onChange={handleChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col> */}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service Type</Form.Label>
                          <Form.Select name="type" value={formData.type} onChange={handleChange}>
                            <option value="daily">Daily</option>
                            <option value="outstation">Outstation</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service Type</Form.Label>
                          <Form.Control name="type" value={formData.type} onChange={handleChange}></Form.Control>
                        </Form.Group>
                      </Col> */}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            // isInvalid={!!errors.email}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>image</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            //  isInvalid={!!errors.picture}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.picture}</Form.Control.Feedback> */}
                          {formData.imagePreview && (
                            <img
                              src={formData.imagePreview}
                              alt="Preview"
                              className="mt-2 rounded"
                              style={{ maxWidth: '150px', borderRadius: '5px' }}
                            />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2}>
                        <div className="d-grid">
                          <Button className="btn-dark" variant="primary" type="submit">
                            UPADATE
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="d-grid">
                          <Button onClick={() => window.history.back()} className="btn-danger" variant="primary">
                            Cancle
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicButton;
