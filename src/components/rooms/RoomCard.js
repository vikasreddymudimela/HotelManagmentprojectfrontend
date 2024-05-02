import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const cardStyle = {
    margin: '0 auto'
  };

  const imageStyle = {
    flexShrink: 0,
    marginRight: '20px',
    maxWidth: '200px',
    height: 'auto'
  };

  const detailsStyle = {
    flexGrow: 1
  };

  const typeStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#007bff', // Blue color
    fontFamily: 'Arial, sans-serif'
  };

  const priceStyle = {
    fontSize: '20px',
    color: '#4CAF50', // Green color
    marginBottom: '15px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif'
  };

  const dollarSignStyle = {
    fontSize: '18px',
    marginRight: '5px',
    color: '#4CAF50' // Green color
  };

  const textStyle = {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    color: '#6c757d' // Gray color
  };

  const buttonStyle = {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    padding: '1.5vh',
    fontFamily: 'Arial, sans-serif'
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838'
  };

  return (
    <Col key={room.id} style={{ ...cardStyle }} className='mb-4' xs={12}>
      <Card style={{ width: '100%' }}>
        <Card.Body style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ ...imageStyle }}>
            <Card.Img
              variant='top'
              src={`data:image/png;base64,${room.photo}`}
              alt='RoomPhoto'
            />
          </div>
          <div style={{ ...detailsStyle }}>
            <Card.Title style={{ ...typeStyle }}>{room.roomtype}</Card.Title>
            <div style={priceStyle}>
              <span style={dollarSignStyle}>$</span>
              {room.roomprice} / night
            </div>
            <Card.Text style={{ ...textStyle }}>Some room information goes here for the guest to read through</Card.Text>
          </div>
          <div style={{ flexShrink: 0 }}>
  <Link to={`/book-room/${room.id}`} style={{ ...buttonStyle }} className='btn btn-sm' onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}>
    View/Book Now
  </Link>
</div>

        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
