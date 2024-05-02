import React from 'react';
import HeaderMain from '../Layout/HeaderMain';
import Parallax from '../common/Parallax';
import HotelService from '../common/HotelService';
import RoomCarousel from '../common/RoomCarousel';
import RoomSearch from '../common/RoomSearch';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation()
  const message = location.state && location.state.message
  const currentuser = localStorage.getItem("userid");
  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentuser && (
        <h6 className='text-success text-center'>you are logged in as{currentuser} and valid time is 1 hour from login</h6>
      )}
      <HeaderMain />
      <section className="home-container">
        <RoomSearch/>
        <RoomCarousel/>
        <Parallax />
        <HotelService />
        <Parallax />
        <RoomCarousel/>
        <HotelService />
      </section>
    </section>
  );
};

export default Home;
