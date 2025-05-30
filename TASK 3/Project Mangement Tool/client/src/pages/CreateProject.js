import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../components/Navbar';

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/projects', formData);
      navigate('/projects');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create project');
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h2>Create New Project</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter project title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Enter project description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/projects')}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default CreateProject; 