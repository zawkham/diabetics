import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [sugarTests, setSugarTests] = useState([]);

  // Base API URL
  const baseURL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch multiple endpoints simultaneously
        const [patientsResponse, sugarTestsResponse] = await Promise.all([
          axios.get(`${baseURL}/patient/`),
          axios.get(`${baseURL}/sugar/`),
        ]);

        // Update state with fetched data
        setPatients(patientsResponse.data);
        setSugarTests(sugarTestsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const viewPatient = (id) => {
    window.location.href = `/doctor/patient/${id}`;
  };

  const editPatient = (id) => {
    window.location.href = `/doctor/patient/edit/${id}`;
  };

  return (
    <div className="container">
      <h2>Patient List</h2>
      {patients.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Test Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.patient_name}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone_no}</td>
                <td>
                  {sugarTests
                    .filter((test) => test.patient === patient.id)
                    .map((test) => (
                      <div key={test.id}>
                        <strong>Type:</strong> {test.test_type}, 
                        <strong> Level:</strong> {test.level}, 
                        <strong> Date:</strong> {new Date(test.test_date).toLocaleDateString()}
                      </div>
                    ))}
                </td>
                <td>
                  <Button variant="info" onClick={() => viewPatient(patient.id)}>
                    View
                  </Button>{' '}
                  {/* <Button variant="warning" onClick={() => editPatient(patient.id)}>
                    Edit
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No patients available</p>
      )}
    </div>
  );
};

export default Patient;