import React, { useContext, useState } from 'react';
import { registeruser } from '../utils/ApiFunctions';
import AuthProvider from './AuthProvider';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstname: '',
    lastname: '',
    password: '',
    email: ''
  });

  const [errormessage, setErrorMessage] = useState('');
  const [successmessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registeruser(registration);
      setSuccessMessage(result);
      setErrorMessage('');
      setRegistration({ firstname: '', lastname: '', password: '', email: '' });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(`Registration message: ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <section className="container mt-5 mb-5" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '700px', backgroundColor: '#f8f9fa', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Registration Form</h2>
          {errormessage && <p className='alert alert-danger'>{errormessage}</p>}
          {successmessage && <p className='alert alert-success'>{successmessage}</p>}
          <form onSubmit={handleRegistration}>
            <div className='mb-3'>
              <label htmlFor='firstname' className='form-label'>
                Firstname
              </label>
              <input id='firstname' name='firstname' type='text' className='form-control' value={registration.firstname} onChange={handleInputChange} style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ced4da' }} />
            </div>
            <div className='mb-3'>
              <label htmlFor='lastname' className='form-label'>
                Lastname
              </label>
              <input id='lastname' name='lastname' type='text' className='form-control' value={registration.lastname} onChange={handleInputChange} style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ced4da' }} />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input id='email' name='email' type='email' className='form-control' value={registration.email} onChange={handleInputChange} style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ced4da' }} />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input id='password' name='password' type='password' className='form-control' value={registration.password} onChange={handleInputChange} style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ced4da' }} />
            </div>
            <div className='mb-3 d-grid'>
              <button type='submit' className='btn btn-primary' style={{ backgroundColor: '#007bff', border: 'none', borderRadius: '5px' }}>
                Register
              </button>
            </div>
            <div>
              <span>
                Already registered? <Link to='/login' style={{ color: '#007bff' }}>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
