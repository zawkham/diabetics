import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const baseUrl =process.env.REACT_APP_BACKEND_URL;
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      ;
      const response = await axios.post(`${baseUrl}/login/`, {
        username,
        password,
      });

      const { access, refresh, role } = response.data;

      // Save tokens to local storage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Redirect based on user role
      if (role === 'Patient') {
        navigate('/patient-dashboard');
      } else if (role === 'Doctor') {
        navigate('/doctor-dashboard');
      } else if (role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        setError('Unknown user role. Please contact support.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(Object.values(err.response.data).join(' '));
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading} className="w-100">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      <div className="text-center mt-3">
        <p>
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>
            Sign up here
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default Login;
