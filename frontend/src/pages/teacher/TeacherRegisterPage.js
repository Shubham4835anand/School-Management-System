import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from '../../assets/designlogin.jpg';
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import axios from 'axios';

const defaultTheme = createTheme();

const TeacherRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);

  // Inside TeacherRegisterPage.js
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      schoolName,
    };

    try {
      const response = await axios.post(
        'https://school-management-system-8atr.onrender.com/TeacherReg',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Success', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Registration failed');
      setShowPopup(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'schoolName') setSchoolName(value);
  };

  useEffect(() => {
    if (
      status === 'success' ||
      (currentUser !== null && currentRole === 'Teacher')
    ) {
      navigate('/Teacher/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

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
              Teacher Register
            </Typography>
            <Typography variant='h7'>
              Create your teacher account to manage classes and students.
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
                error={nameError}
                helperText={nameError && 'Name is required'}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='schoolName'
                label='School Name'
                name='schoolName'
                error={schoolNameError}
                helperText={schoolNameError && 'schoolName is required'}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                error={emailError}
                helperText={emailError && 'Email is required'}
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
                error={passwordError}
                helperText={passwordError && 'Password is required'}
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
                  <StyledLink to='/Teacherlogin'> Log in</StyledLink>
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

export default TeacherRegisterPage;

const StyledLink = styled(Link)`
  margin-left: 6px;
  text-decoration: none;
  color: #7f56da;
`;
