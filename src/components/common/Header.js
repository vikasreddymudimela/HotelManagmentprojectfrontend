import React from 'react';
import headerImage from 'C:/Users/Mudimela Vikas Reddy/Desktop/ReactProject/hotelmanagmentproject/src/Assets/Images/header-image4.jpg';

const Header = ({ title }) => {
  const headerStyle = {
    backgroundImage: `url(${headerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    textAlign: 'center', 
    color: '#fff',
    width: '100%'
  };

  return (
    <header className='header' style={headerStyle}>
      <div className='overlay'></div>
      <div className='container'>
        <h1 className="header-title">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
