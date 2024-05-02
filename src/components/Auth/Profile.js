import React, { useContext, useState, useEffect } from 'react';
import { deleteuser, getBookingsByUserId, getuserprofile } from '../utils/ApiFunctions';
import AuthProvider from './AuthProvider';
import { parseISO, isBefore, isAfter, isEqual } from 'date-fns';
import { cancelbooking } from '../utils/ApiFunctions';
import BookingsTable from '../bookings/BookingsTable';
import { getallbookings } from '../utils/ApiFunctions';
const Profile = () => {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #dee2e6', // Add border to the table
    },
    tableHeader: {
      backgroundColor: '#343a40', // Darker color for the header
      color: '#fff',
    },
    columnHeader: {
      whiteSpace: 'nowrap',
      minWidth: '100px', // Adjust the width as needed
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '8px',
      border: '1px solid #dee2e6', // Add border to the header cells
    },
    tableBody: {
      backgroundColor: '#fff',
    },
    tableCell: {
      whiteSpace: 'nowrap',
      padding: '8px',
      border: '1px solid #dee2e6', // Add border to the cells
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }
  }
  const [message, setmessage] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [user, setuser] = useState({
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    roles: [{ id: '', name: '' }],
  });
  const [bookings, setBookings] = useState([])
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const[actionstatus,setactionstatus] = useState(true)
  useEffect(() => {
    const fetchuser = async () => {
      
      try {
        const userData = await getuserprofile(userid, token);
        setuser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchuser();
  }, [userid]);
  useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userid, token)
				setBookings(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				seterrormessage(error.message)
			}
		}

		fetchBookings()
	}, [userid])
  const handlebookingcancellation = async(bookingid) => {
    try{
        await cancelbooking(bookingid)
        const data = await getallbookings()
        
        setBookings(data)
    }catch(error){
         seterrormessage(error.message)
    }
}
  const getStatus = (booking) => {
    const systemDate = new Date();
    const bookingStartDate = parseISO(booking.checkindate);
    const bookingEndDate = parseISO(booking.checkoutdate);

    if (isBefore(systemDate, bookingStartDate)) {
      return 'Upcoming';
    } else if (isAfter(systemDate, bookingEndDate) || isEqual(systemDate,bookingStartDate)) {
      setactionstatus(false)
      return 'Over';
    } else {
      return 'Ongoing';
    }
  };
  const handledeleteaccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete the account? This action cannot be undone'
    );
    if (confirmed) {
      try {
        await deleteuser(userid);
        setmessage('Account deleted successfully.');
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('userRole');
        // Navigate to some other page after successful deletion
        // history.push('/')
        window.location.reload(); // This might not be necessary if you're using client-side routing
      } catch (error) {
        seterrormessage(error);
      }
    }
  };

  return (
    <div>
      {errormessage && <p style={{ color: 'red' }}>{errormessage}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {user && (
        <div style={{ margin: '20px auto', maxWidth: '600px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '24px', marginBottom: '20px' }}>User information</h4>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div className="d-flex justify-content-center align-items-center mb-4">
                <img
                  src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Firstname:</strong> {user.firstname}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Lastname:</strong> {user.lastname}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Email:</strong> {user.email}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Roles:</strong> 
                  <ul>
                    {user.roles.map((role, index) => (
                      <li key={index}>{role.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button onClick={handledeleteaccount} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Delete Account</button>
          </div>
        </div>
      )}
      
      <BookingsTable bookinginfo={bookings} handlebookingcancellation={handlebookingcancellation}/>
    </div>
    
  );
  
};

export default Profile;
