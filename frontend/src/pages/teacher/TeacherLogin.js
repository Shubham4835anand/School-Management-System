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

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
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

    const { email, password } = formData;
    if (!email || !password) {
      setMessage('All fields are required');
      setSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://school-management-system-8atr.onrender.com/TeacherLogin',
        {
          email,
          password,
        }
      );

      const { token, ...teacher } = response.data;

      if (token) {
        localStorage.setItem('teacherToken', token);
        localStorage.setItem('teacherData', JSON.stringify(teacher));
        setSuccess(true);
        setMessage('Login successful!');
        navigate('/teacher-dashboard'); // ✅ change to your actual dashboard route
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
          Teacher Login
        </Typography>

        {message && (
          <Alert severity={success ? 'success' : 'error'} sx={{ my: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Email'
            name='email'
            value={formData.email}
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

export default TeacherLogin;
