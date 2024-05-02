import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section style={{ display: 'flex', justifyContent: 'center',marginTop:"10vh" }}>
      <div style={styles.adminPanel}>
        <h2 style={styles.adminTitle}>Welcome to the Admin Panel</h2>
        <hr style={styles.adminDivider} />
        <div style={styles.adminLinks}>
          <Link to="/existing-rooms" style={styles.adminLink}>
            Manage Rooms
          </Link>
          <Link to="/add-room" style={styles.adminLink}>
            Add New Room
          </Link>
          <Link to="/existing-bookings" style={styles.adminLink}>
            Manage Bookings
          </Link>
          <Link to="/users" style={styles.adminLink}>
            Manage Users
          </Link>
          <Link to="/roleassignment" style={styles.adminLink}>
            Manage Roles And Users
          </Link>
          
         
        </div>
      </div>
    </section>
  );
};

const styles = {
  adminPanel: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  adminTitle: {
    textAlign: 'center',
    color: '#343a40',
  },
  adminDivider: {
    margin: '20px 0',
  },
  adminLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  adminLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '18px',
    marginBottom: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  adminLinkHover: {
    backgroundColor: '#0056b3',
  },
};

export default Admin;
