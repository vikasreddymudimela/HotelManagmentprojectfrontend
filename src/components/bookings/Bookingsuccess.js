import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';
import headerImage from 'C:/Users/Mudimela Vikas Reddy/Desktop/ReactProject/hotelmanagmentproject/src/Assets/Images/header-image.jpeg';


const Bookingsuccess = () => {
    const location = useLocation();
    const message = location.state?.message;
    const error = location.state?.error;

    const containerStyle = {
    
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column', // Set flex direction to column
        alignItems: 'center' // Center align items
    };

    const successTextStyle = {
        color: '#28a745'
    };

    const errorTextStyle = {
        color: '#dc3545'
    };

    return (
        <div style={containerStyle} className="container" >
            <Header title="Booking status" />
            <div style={{ marginTop: '20px' }}>
                {error ? (
                    <div>
                        <h3 style={errorTextStyle}>Error booking room</h3>
                        <p style={errorTextStyle}>{error}</p>
                    </div>
                ) : (
                    <div>
                        <h3 style={successTextStyle}>Booking success</h3>
                        <p style={successTextStyle}>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookingsuccess;
