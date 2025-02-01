import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import DoctorDashBoard from './Pages/DoctorDashBoard';
import Sidebar from './component/Sidebar';
import Patient from './Pages/Doctor/Patient';
import Comment from './Pages/Doctor/Comment';
import Sugar from './Pages/Patients/Sugar'; // Ensure this import is correct
// import PatientForm from './Pages/Patients/PatientForm';
import Login from './Pages/Login'; 
import PatientForm from './Pages/Patients/PatientForm';

const App = () => {
  const location = useLocation();

  // Define routes where the Sidebar should not be displayed
  const excludedRoutes = ['/'];
  const showSidebar = !excludedRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {/* Conditionally render the Sidebar */}
      {showSidebar && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/doctor-dashboard" element={<DoctorDashBoard />} />
          <Route path="/Patient" element={<Patient />} />
          <Route path="/doctor/patient/:id" element={<Comment />} />
          <Route path="/sugar" element={<Sugar />} /> 
          <Route path="/comment" element={<Comment />} />
          <Route path="/PatientForm" element={<PatientForm />} /> 
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
