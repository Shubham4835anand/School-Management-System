import React, { useState } from 'react';
import '../admin/adminRegisterPage.css'; // reuse admin styling

const TeacherRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    subject: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teacher Data:', formData);
    // Call your API here
  };

  return (
    <div className='register-page'>
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <input
          name='name'
          placeholder='Full Name'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          name='employeeId'
          placeholder='Employee ID'
          onChange={handleChange}
          required
        />
        <input
          name='subject'
          placeholder='Subject'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default TeacherRegisterPage;
