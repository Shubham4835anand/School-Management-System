import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNum: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://school-management-system-8atr.onrender.com/StudentLogin',
        {
          name: formData.name,
          rollNum: formData.rollNum,
          password: formData.password,
        }
      );

      const { token, student, message } = response.data;

      if (token && student) {
        localStorage.setItem('studentToken', token);
        localStorage.setItem('studentData', JSON.stringify(student));
        setSuccess(true);
        setMessage(message || 'Login successful!');
        navigate('/student-dashboard');
      } else {
        setMessage('Login failed');
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Something went wrong.';
      setMessage(errorMsg);
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h4' gutterBottom>
          Student Login
        </Typography>

        {message && (
          <Alert severity={success ? 'success' : 'error'} sx={{ my: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Roll Number'
            name='rollNum'
            type='number'
            value={formData.rollNum}
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            margin='normal'
          />

          <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default StudentLogin;
