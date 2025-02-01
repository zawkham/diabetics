import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Comment = () => {
  const [patient, setPatient] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sugarTests, setSugarTests] = useState([]);
  const [selectedSugarTest, setSelectedSugarTest] = useState('');

  // Extract the patient ID from route params
  const { id: patientId } = useParams();

  // Base API URL
  const baseURL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    // Fetch patient details
    axios
      .get(`${baseURL}/patient/${patientId}/`)
      .then((response) => setPatient(response.data))
      .catch((error) => console.error('Error fetching patient:', error));

    // Fetch sugar tests for the patient
    axios
      .get(`${baseURL}/sugar/?patient=${patientId}`)
      .then((response) => setSugarTests(response.data))
      .catch((error) => console.error('Error fetching sugar tests:', error));

    // Fetch comments for the patient
    axios
      .get(`${baseURL}/comment/?patient=${patientId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [patientId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment || !selectedSugarTest) {
      alert('Please enter a comment and select a sugar test');
      return;
    }

    const commentData = {
      sugartest: selectedSugarTest,
      description: newComment,
    };

    // Add a new comment
    axios
      .post(`${baseURL}/comment/`, commentData)
      .then((response) => {
        setComments([...comments, response.data]); // Append new comment to the list
        setNewComment('');
        setSelectedSugarTest('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  return (
    <div className="container">
      <h2>Patient: {patient.patient_name}</h2>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>

      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.description}</li>
        ))}
      </ul>

      <Form onSubmit={handleCommentSubmit}>
        <Form.Group controlId="sugarTestSelect">
          <Form.Label>Select Sugar Test</Form.Label>
          <Form.Control
            as="select"
            value={selectedSugarTest}
            onChange={(e) => setSelectedSugarTest(e.target.value)}
          >
            <option value="">Select a sugar test</option>
            {sugarTests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.level} - {new Date(test.test_date).toLocaleDateString()}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>Add a Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Comment;