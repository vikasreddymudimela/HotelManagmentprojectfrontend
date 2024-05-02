import React from 'react';
import { getallrooms } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([{ id: "", roomtype: "", roomprice: "", photo: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const detailsStyle = {
    flexGrow: 1
  };

  const typeStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'green',
    fontFamily: 'Arial, sans-serif'
  };

  const priceStyle = {
    fontSize: '18px',
    color: 'red',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    textDecoration: 'none' // Removed underline from price
  };

  const buttonStyle = {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    padding: '1.5vh 20px',
    marginTop: '10px',
    fontFamily: 'Verdana, sans-serif',
    textDecoration: 'none' // Removed underline from button
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838'
  };

  useEffect(() => {
    setIsLoading(true);
    getallrooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading rooms</div>;
  }

  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
  }

  // Calculate the number of Carousel items needed
  const carouselItemCount = (rooms.length>0) ?Math.ceil(rooms.length / 4):0;

  return (
    <section className="bg-light mb-5  shadow">
      <Link to="/browse-all-rooms" className="hotel-color text-center d-block mb-3" style={{ textDecoration: 'none', fontSize: '24px', fontWeight: 'bold', padding: '15px', fontFamily: 'Times New Roman, serif' }}>Explore All Rooms</Link>
      <Container>
        <Carousel indicators={false}>
          {[...Array(carouselItemCount)].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {/* Display rooms only if a batch of 4 is present */}
                {rooms.slice(index * 4, index * 4 + 4).length === 4 && rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`} style={{ textDecoration: 'none' }}> {/* Removed underline from the link */}
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${room.photo}`}
                          alt="room-photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                        <Card.Body style={{ maxHeight: '250px', overflow: 'auto' }}>
                          <div style={detailsStyle}>
                            <Card.Title style={{ ...typeStyle, fontSize: '18px' }}>{room.roomtype}</Card.Title>
                            <Card.Title style={{ ...priceStyle, fontSize: '16px' }}>${room.roomprice} / night</Card.Title>
                            <Card.Text style={{ fontSize: '14px' }}>Enjoy your stay in our comfortable rooms!</Card.Text>
                          </div>
                          <div style={{ flexShrink: 0 }}>
                            <Link
                              to={`/book-room/${room.id}`}
                              style={buttonStyle}
                              className='btn btn-sm'
                              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                            >
                              View/Book Now
                            </Link>
                          </div>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
