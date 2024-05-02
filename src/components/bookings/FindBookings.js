import React, { useState } from 'react';
import { cancelbooking, getbookingbyconfirmationcode } from '../utils/ApiFunctions';

const FindBookings = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [deleted, setIsDeleted] = useState(false);
    const [bookingInfo, setBookingInfo] = useState(null); // Updated to null initially
    const[successmessage,setsuccessmessage] = useState("");

    const handleInput = (e) => {
        setConfirmationCode(e.target.value);
    }

    const handleSubmitChange = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if(confirmationCode === null || confirmationCode === " "){
                setError("The code value is null");
            }
            const data = await getbookingbyconfirmationcode(confirmationCode);
            setBookingInfo(data);
            setError(""); // Reset error if data is successfully retrieved
        } catch (error) {
            setBookingInfo(null); // Set bookingInfo to null if error occurs
            setError(error.message);
        }
        setIsLoading(false);
    }

    const handleBookingCancellation = async () => {
        try {
            await cancelbooking(bookingInfo.id);
            setIsDeleted(true);
            setBookingInfo(null); // Clear booking info after cancellation
            setConfirmationCode("");
            setsuccessmessage("Room cancelled successfully");
            setError("");
        } catch (error) {
            setError(error.message);
        }
        setTimeout(() =>{
            setsuccessmessage("")
        },2000)
        
    }

    return (
        <div style={styles.container}>
            <h2>Find My Booking</h2>
            <form onSubmit={handleSubmitChange}>
                <div style={styles.inputGroup}>
                    <input
                        id="confirmationcode"
                        name="confirmationcode"
                        value={confirmationCode}
                        onChange={handleInput}
                        style={styles.input}
                        placeholder="Enter confirmation code"
                    />
                    <button style={styles.button} type="submit">Find Booking</button>
                </div>
            </form>
            {isLoading ? (
                <div style={styles.loading}>Finding Booking...</div>
            ) : error ? (
                <div style={styles.error}>{error}</div>
            ) : bookingInfo ? (
                <div style={styles.bookingInfo}>
                    <h3>Booking Information</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Booking ID</th>
                                <th>Room Id</th>
                                <th>Room Type</th>
                                <th>Check-In Date</th>
                                <th>Check-Out Date</th>
                                <th>Guest Name</th>
                                <th>Guest Email</th>
                                <th>Adults</th>
                                <th>Children</th>
                                <th>Total Guests</th>
                                <th>Confirmation Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{bookingInfo.id}</td>
                                <td>{bookingInfo.room.id}</td>
                                <td>{bookingInfo.room.roomtype}</td>
                                <td>{bookingInfo.checkindate}</td>
                                <td>{bookingInfo.checkoutdate}</td>
                                <td>{bookingInfo.guestFullName}</td>
                                <td>{bookingInfo.guestemail}</td>
                                <td>{bookingInfo.numOfAdults}</td>
                                <td>{bookingInfo.numOfChildren}</td>
                                <td>{bookingInfo.totalnumguests}</td>
                                <td>{bookingInfo.bookingconfirmationcode}</td>
                                <td>
                                    {!deleted && (
                                        <button style={styles.cancelButton} onClick={handleBookingCancellation}>
                                            Cancel Booking
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={styles.info}>Please enter a valid confirmation code.</div>
            )}
            {deleted &&(
                <div className="alert alert-success mt-3" role="alert">
                    {successmessage}
                    </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        marginTop: '50px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        marginRight: '10px',
        width: '300px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    loading: {
        color: '#17a2b8',
    },
    error: {
        color: '#dc3545',
    },
    bookingInfo: {
        marginTop: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    cancelButton: {
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    info: {
        color: '#17a2b8',
    },
};

export default FindBookings;
