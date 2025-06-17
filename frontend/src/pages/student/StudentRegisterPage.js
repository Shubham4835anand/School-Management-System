import React, { useState } from 'react';
import '../admin/adminRegisterPage.css'; // reuse admin CSS

const StudentRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    className: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Data:', formData);
    // Send to backend
  };

  return (
    <div className='register-page'>
      <h2>Student Registration</h2>
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
          name='rollNumber'
          placeholder='Roll Number'
          onChange={handleChange}
          required
        />
        <input
          name='className'
          placeholder='Class'
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

export default StudentRegisterPage;
