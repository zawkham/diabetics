import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Table, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const DoctorDashBoard = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    address: '',
    age: '',
    phone_no: '',
    email: '',
    gender: '',
    doctor: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorsAndPatients = async () => {
      try {
        const [doctorsRes, patientsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/doctor/'), // Updated endpoint
          axios.get('http://127.0.0.1:8000/api/patient/'), // Updated endpoint
        ]);
        setDoctors(doctorsRes.data);
        setPatients(patientsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchDoctorsAndPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      let response;
      if (selectedPatient) {
        response = await axios.put(`http://127.0.0.1:8000/api/patient/${selectedPatient.id}/`, formData);
      } else {
        response = await axios.post('http://127.0.0.1:8000/api/patient/', formData);
      }
      setSuccess(true);
      setFormData({
        patient_name: '',
        address: '',
        age: '',
        phone_no: '',
        email: '',
        gender: '',
        doctor: '',
      });
      setSelectedPatient(null);
      setPatients((prevPatients) => {
        if (selectedPatient) {
          return prevPatients.map((patient) =>
            patient.id === selectedPatient.id ? response.data : patient
          );
        } else {
          return [...prevPatients, response.data];
        }
      });
    } catch (err) {
      setError(err.response?.data || 'An error occurred.');
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setFormData(patient);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/patient/${id}/`);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    } catch (err) {
      console.error('Error deleting patient:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">{selectedPatient ? 'Edit Patient' : 'Patient Registration Form'}</h2>
      {success && <Alert variant="success">Patient {selectedPatient ? 'updated' : 'registered'} successfully!</Alert>}
      {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="patientName" className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
            </Form.Group>

            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </Form.Group>

            <Form.Group controlId="phoneNo" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="doctor" className="mb-3">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.dname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {selectedPatient ? 'Update Patient' : 'Submit'}
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3 className="mt-4">Patients List</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No patients available</td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.patient_name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone_no}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(patient)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorDashBoard;
