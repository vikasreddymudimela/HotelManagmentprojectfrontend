import React, { useContext, useState } from 'react';
import { loginUser } from '../utils/ApiFunctions';
import { useNavigate, Link } from 'react-router-dom';
import { Authcontext } from './AuthProvider';

const Login = () => {
  const [errorm, seterrorm] = useState('');
  const [login, setlogin] = useState({
    email: '',
    password: ''
  });
  const { handlelogin } = useContext(Authcontext);
  const navigate = useNavigate();
  

  const handleInputChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const success = await loginUser(login);
      console.log(success)
      if (success) {
        const token = success.token;
        console.log(token);
        handlelogin(token);
        navigate('/');
         window.location.reload();
    }}catch(error){
      seterrorm('Invalid username or password. Please try again');
    }
  
   
    setTimeout(() => {
      seterrorm('');
    }, 4000);
  };

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh' // Adjusted height
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Login</h2>
      {errorm && <p style={{ color: 'red', marginTop: '10px' }}>{errorm}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ marginBottom: '5px' }}>
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={login.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ marginBottom: '5px' }}>
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={login.password}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Login
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#333' }}>
            Don't have an account yet? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
