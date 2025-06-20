import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from '../assets/students.svg';
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt='students' style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              Welcome to
              <br />
              School Management
              <br />
              System
            </StyledTitle>
            <StyledText>
              Streamline school management, class organization, and add students
              and faculty. Seamlessly track attendance, assess performance, and
              provide feedback. Access records, view marks, and communicate
              effortlessly.
            </StyledText>
            <StyledBox>
              <StyledLink to='/choose'>
                <LightPurpleButton variant='contained' fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>

              <StyledLink to='/chooseasguest'>
                <Button
                  variant='outlined'
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 3,
                    color: '#7f56da',
                    borderColor: '#7f56da',
                  }}
                >
                  Login as Guest
                </Button>
              </StyledLink>

              <StyledText>Don't have an account?</StyledText>
              <StyledLink to='/AdminReg'>
                <Button variant='text' fullWidth sx={{ color: '#550080' }}>
                  Sign up as Admin
                </Button>
              </StyledLink>
              <StyledLink to='/TeacherReg'>
                <Button variant='text' fullWidth sx={{ color: '#550080' }}>
                  Sign up as Teacher
                </Button>
              </StyledLink>
              <StyledLink to='/StudentReg'>
                <Button variant='text' fullWidth sx={{ color: '#550080' }}>
                  Sign up as Student
                </Button>
              </StyledLink>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

// Styling remains the same
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 10px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
