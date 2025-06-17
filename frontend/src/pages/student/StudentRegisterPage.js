import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Make sure axios is imported
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../../components/buttonStyles';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import bgpic from '../../assets/designlogin.jpg';

const defaultTheme = createTheme();

const StudentRegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') setName(value);
    else if (name === 'rollNum') setRollNum(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !rollNum) {
      setMessage('All fields are required');
      setShowPopup(true);
      return;
    }

    const data = { name, email, password, rollNum };

    try {
      const response = await axios.post(
        'https://school-management-system-8atr.onrender.com/StudentReg',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Student registered:', response.data);
      navigate('/Student/dashboard'); // or login page
    } catch (error) {
      console.error('❌ Error:', error);
      setMessage(error.response?.data?.message || 'Registration failed');
      setShowPopup(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4' sx={{ mb: 2, color: '#2c2143' }}>
              Student Register
            </Typography>
            <Typography variant='h7'>
              Create your student account to join classes.
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label='Full Name'
                name='name'
                value={name}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='rollNum'
                label='Roll Number'
                name='rollNum'
                value={rollNum}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={email}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={toggle ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <LightPurpleButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Register'
                )}
              </LightPurpleButton>
              <Grid container>
                <Grid item>
                  Already have an account?
                  <StyledLink to='/Studentlogin'> Log in</StyledLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </ThemeProvider>
  );
};

export default StudentRegisterPage;

const StyledLink = styled(Link)`
  margin-left: 6px;
  text-decoration: none;
  color: #7f56da;
`;
