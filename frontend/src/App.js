import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import TeacherRegisterPage from './pages/teacher/TeacherRegisterPage';
import StudentRegisterPage from './pages/student/StudentRegisterPage';

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  return (
    <Router>
      {currentRole === null && (
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/choose' element={<ChooseUser visitor='normal' />} />
          <Route
            path='/chooseasguest'
            element={<ChooseUser visitor='guest' />}
          />

          <Route path='/AdminLogin' element={<LoginPage role='Admin' />} />
          <Route path='/StudentLogin' element={<LoginPage role='Student' />} />
          <Route path='/TeacherLogin' element={<LoginPage role='Teacher' />} />

          <Route path='/AdminReg' element={<AdminRegisterPage />} />
          <Route path='/TeacherReg' element={<TeacherRegisterPage />} />
          <Route path='/StudentReg' element={<StudentRegisterPage />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      )}

      {currentRole === 'Admin' && (
        <>
          <AdminDashboard />
        </>
      )}

      {currentRole === 'Student' && (
        <>
          <StudentDashboard />
        </>
      )}

      {currentRole === 'Teacher' && (
        <>
          <TeacherDashboard />
        </>
      )}
    </Router>
  );
};

export default App;
