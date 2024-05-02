import React from 'react';
import headerImage from 'C:/Users/Mudimela Vikas Reddy/Desktop/ReactProject/hotelmanagmentproject/src/Assets/Images/header-image2.jpg';

const HeaderMain = () => {
  return (
    <header className='header-banner ' style={{ 
      backgroundImage: `url(${headerImage})`, 
      height: '80vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundRepeat: 'no-repeat', // Prevent image from repeating
      backgroundSize: 'cover',
       // Adjust image size to cover the entire header
    }}>
      <div className='overlay'></div>
      <div className='animated-texts overlay-content'>
        <h1 style={{ color: 'white' }}>Welcome to <span className='hotel-color'>Yashodha hotel</span></h1>
        <h4 style={{ color: 'white', marginLeft:'3vw'}}>Experience a unique and good stay </h4>
      </div>
    </header>
  );
}

export default HeaderMain;
