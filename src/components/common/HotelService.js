import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa';

const HotelService = () => {
  return (
    <Container style={{ marginTop: '20px',  display:'flex' ,flexDirection:"column", marginBottom:"2vh"}}>
      {/* <Header title={"Our Services"} /> */}
      <Row className="justify-content-center">
          <h4 className="text-center mb-4">
            Services at <span style={{ color: '#28a745' }}>Yashodha Hotel</span>
          </h4>
          <div className="text-center mb-4">
            <FaClock style={{ marginRight: '5px' }} /> 24-hour front desk
          </div>
        
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card className="service-card">
            <Card.Body>
              <Card.Title><FaWifi className="service-icon" /> Wifi</Card.Title>
              <Card.Text>Stay Connected with high-speed internet access</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="service-card">
            <Card.Body>
              <Card.Title><FaUtensils className="service-icon" /> Breakfast</Card.Title>
              <Card.Text>Start your day with a delicious breakfast</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="service-card">
            <Card.Body>
              <Card.Title><FaTshirt className="service-icon" /> Laundry</Card.Title>
              <Card.Text>Fast and professional laundry service</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="service-card">
            <Card.Body>
              <Card.Title><FaCocktail className="service-icon" /> Bar</Card.Title>
              <Card.Text>Enjoy a relaxing time at our bar</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="service-card">
            <Card.Body>
              <Card.Title><FaParking className="service-icon" /> Parking</Card.Title>
              <Card.Text>Convenient parking for your vehicles</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="service-card">
            <Card.Body>
              <Card.Title><FaSnowflake className="service-icon" /> Air Conditioning</Card.Title>
              <Card.Text>Stay cool and beat the heat with our AC facilities</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HotelService;
