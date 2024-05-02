import React from 'react';
import { Container } from 'react-bootstrap';
import headerImage from 'C:/Users/Mudimela Vikas Reddy/Desktop/ReactProject/hotelmanagmentproject/src/Assets/Images/header-image.jpeg';


const Parallax = () => {
  const parallaxStyle = {
    backgroundImage: `url(${headerImage})`, // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px', // Adjust height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff', // Text color
    textAlign: 'center',
    marginTop: '3vh' // Add margin-top of 3vh
  };

  const animatedTextStyle = {
    animationName: 'bounceIn', // Add your animation name
    animationDuration: '1s', // Add animation duration
  };

  return (
    <div className="parallax" style={parallaxStyle}>
      <Container className="text-center px-5 py-5">
        <div style={animatedTextStyle}>
          <h1>
            Welcome to <span className="hotel-color">Yashodha hotel</span>
          </h1>
          <h3>We offer the best services</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
