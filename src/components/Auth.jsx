import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_number: '900474227',
    password: 'superadmin'
  });

  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault(); 
    axios.post('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      localStorage.setItem('token', response?.data?.data?.tokens?.accessToken?.token);
      navigate('/category');
    })
    .catch(error => {
      console.error(error.response);
    });
  };
    
  return (
    <div className='auth'>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor='phone_number' className="form-label">Phone Number</label>
          <input
            type='tel'
            id='phone_number'
            name='phone_number'
            value={formData.phone_number}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor='password' className="form-label">Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type='submit' style={{width:'100%', marginTop:"50px"}} className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Auth;
