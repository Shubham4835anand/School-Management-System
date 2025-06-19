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
import TeacherLogin from './pages/teacher/TeacherLogin';
import StudentLogin from './pages/student/StudentLogin';
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

          <Route path='/Adminlogin' element={<LoginPage role='Admin' />} />
          <Route path='/StudentLogin' element={<StudentLogin />} />
          <Route path='/TeacherLogin' element={<TeacherLogin />} />

          <Route path='/Adminregister' element={<AdminRegisterPage />} />
          <Route path='/Teacherregister' element={<TeacherRegisterPage />} />
          <Route path='/Studentregister' element={<StudentRegisterPage />} />

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
