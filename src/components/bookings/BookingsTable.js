import React, { useEffect, useState } from 'react';
import { parseISO, isBefore, isAfter, isEqual } from 'date-fns';
import DateSlider from "../common/Dateslider";

const BookingsTable = ({ bookinginfo, handlebookingcancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookinginfo);
  const[actionstatus,setactionstatus] = useState(true);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookinginfo;
    if (startDate && endDate) {
      filtered = bookinginfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkindate);
        const bookingEndDate = parseISO(booking.checkoutdate);
        return startDate <= bookingStartDate && bookingEndDate <= endDate && bookingEndDate > startDate;
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookinginfo);
  }, [bookinginfo]);

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

  return (
    <section style={styles.container}>
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.columnHeader}>S/N</th>
              <th style={styles.columnHeader}>Booking ID</th>
              <th style={styles.columnHeader}>Room Id</th>
              <th style={styles.columnHeader}>Room Type</th>
              <th style={styles.columnHeader}>Check-In Date</th>
              <th style={styles.columnHeader}>Check-Out Date</th>
              <th style={styles.columnHeader}>Guest Name</th>
              <th style={styles.columnHeader}>Guest Email</th>
              <th style={styles.columnHeader}>Adults</th>
              <th style={styles.columnHeader}>Children</th>
              <th style={styles.columnHeader}>Total Guests</th>
              <th style={styles.columnHeader}>Confirmation Code</th>
              <th style={styles.columnHeader}>Status</th>
              <th style={styles.columnHeader}>Action</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody} >
            {filteredBookings.map((booking, index) => (
              <tr key={booking.id}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{booking.id}</td>
                <td style={styles.tableCell}>{booking.room.id}</td>
                <td style={styles.tableCell}>{booking.room.roomtype}</td>
                <td style={styles.tableCell}>{booking.checkindate}</td>
                <td style={styles.tableCell}>{booking.checkoutdate}</td>
                <td style={styles.tableCell}>{booking.guestFullName}</td>
                <td style={styles.tableCell}>{booking.guestemail}</td>
                <td style={styles.tableCell}>{booking.numOfAdults}</td>
                <td style={styles.tableCell}>{booking.numOfChildren}</td>
                <td style={styles.tableCell}>{booking.totalnumguests}</td>
                <td style={styles.tableCell}>{booking.bookingconfirmationcode}</td>
                <td style={styles.tableCell}>{getStatus(booking)}</td>
                <td style={styles.tableCell}>
                  {
                  actionstatus &&  <button style={styles.cancelButton} onClick={() => handlebookingcancellation(booking.id)}>
                    Cancel Booking
                  </button>
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredBookings.length === 0 && <p style={styles.noBooking}>No Booking found for the selected dates</p>}
    </section>
  );
};

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
export default BookingsTable;