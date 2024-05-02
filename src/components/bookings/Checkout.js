import React, { useEffect, useState } from 'react';
import Bookingform from './Bookingform';
import { getroombyid } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { FaTshirt, FaUtensils, FaWifi, FaWineBottle, FaCar, FaTv } from 'react-icons/fa';
import         RoomCarousel from                '../common/RoomCarousel'
const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roominfo, setRoominfo] = useState({ photo: "", roomtype: "", roomprice: "" });

  const { roomid } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getroombyid(roomid)
        .then((response) => {
          setRoominfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 2000);
  }, [roomid]);

  const containerStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif', // Adding new font family
  };

  const roomInfoStyle = {
    marginBottom: '20px',
    color: '#333', // New color
  };

  const imgStyle = {
    width: '100%',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
  };

  const thStyle = {
    textAlign: 'left',
    paddingRight: '10px',
  };

  const tdStyle = {
    paddingBottom: '10px',
  };

  const ulStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const liStyle = {
    marginBottom: '5px',
    color: '#555', // New color
  };

  const iconStyle = {
    marginRight: '5px',
  };

  return (
    <>
    <div style={containerStyle} className="container">
      <section style={roomInfoStyle}>
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img src={`data:image/png;base64,${roominfo.photo}`} alt="Room Photo" style={imgStyle} />
                <table style={tableStyle}>
                  <tbody>
                    <tr>
                      <th style={thStyle}>Room Type:</th>
                      <td style={tdStyle}>{roominfo.roomtype}</td>
                    </tr>
                    <tr>
                      <th style={thStyle}>Room Price:</th>
                      <td style={tdStyle}>${roominfo.roomprice}</td>
                    </tr>
                    <tr>
                      <th style={thStyle}>Facilities:</th>
                      <td style={tdStyle}>
                        <ul style={ulStyle}>
                          <li style={liStyle}><FaWifi style={iconStyle} />Wifi</li>
                          <li style={liStyle}><FaTv style={iconStyle} />Netflix Premium</li>
                          <li style={liStyle}><FaUtensils style={iconStyle} />Breakfast</li>
                          <li style={liStyle}><FaWineBottle style={iconStyle} />Mini Bar Refreshment</li>
                          <li style={liStyle}><FaCar style={iconStyle} />Car Service</li>
                          <li style={liStyle}><FaTshirt style={iconStyle} />Laundry</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <Bookingform />
          </div>
        </div>
      </section>
      
    </div>
    <div className="container " style={{marginTop:"13vh"}}>
       <RoomCarousel/>
      </div>
      </>
  );
};

export default Checkout;
