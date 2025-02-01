import React, { useState, useEffect } from "react";

const Sugar= () => {
  const [formData, setFormData] = useState({
    patient: "",
    test_type: "",
    level: "",
  });

  const [patients, setPatients] = useState([]);

  // Fetch patients to populate the dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/patient/");
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/sugar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sugar test information added successfully!");
        console.log("Success:", data);
        setFormData({
          patient: "",
          test_type: "",
          level: "",
        }); // Reset the form
      } else {
        const errorData = await response.json();
        alert("Failed to add sugar test information. Please check the details.");
        console.error("Error:", errorData);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Sugar Test Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient</label>
          <select
            className="form-select"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.patient_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Test Type</label>
          <input
            type="text"
            className="form-control"
            name="test_type"
            value={formData.test_type}
            onChange={handleChange}
            placeholder="Enter test type (e.g., Fasting, Postprandial)"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sugar Level</label>
          <input
            type="number"
            className="form-control"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="Enter sugar level (mg/dL)"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sugar;
