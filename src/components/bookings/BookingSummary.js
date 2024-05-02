import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Button from 'react-bootstrap/Button';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkinDate = moment(booking.checkindate);
    const checkoutDate = moment(booking.checkoutdate);
    const numOfDays = checkoutDate.diff(checkinDate, "days");

    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000);
    };

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate]);

    return (
        <div style={{ backgroundColor: '#f8f9fa',position:'relative',bottom:'2.8vw',right:"25vw", width:'35vw',padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h4 style={{ fontSize: '24px', color: '#AA336A', marginBottom: '20px' }}>Reservation Summary</h4>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>FullName: <strong>{booking.guestFullName}</strong></p>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Email: <strong>{booking.guestemail}</strong></p>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Check-in Date: <strong>{moment(booking.checkindate).format("MM DD YYYY")}</strong></p>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Check-out Date: <strong>{moment(booking.checkoutdate).format("MM DD YYYY")}</strong></p>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Number of Days: <strong>{numOfDays}</strong></p>
            <div style={{ marginTop: '20px' }}>
                <h5 style={{ fontSize: '20px', color: '#AA336A' }}>Number of Guests</h5>
                <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Adult{booking.numOfAdults > 1 ? "s" : ""}: <strong>{booking.numOfAdults}</strong></p>
                <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Children: <strong>{booking.numOfChildren}</strong></p>
            </div>
            {payment > 0 ? (
                <>
                    <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>Total Payment: <strong>${payment}</strong></p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button style={{ width: '100%', marginTop: '20px', backgroundColor: '#007bff', borderColor: '#007bff', fontSize: '18px' }} onClick={handleConfirmBooking}>
                            {isProcessingPayment ? (
                                <>
                                    <span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>
                                    Booking confirmed. Redirecting to payment...
                                </>
                            ) : (
                                "Confirm booking and proceed to payment"
                            )}
                        </Button>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='spinner-border text-primary' role='status'>
                                <span>Loading</span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className='text-danger'>Checkout date must be after check-in date</p>
            )}
        </div>
    );
};

export default BookingSummary;
