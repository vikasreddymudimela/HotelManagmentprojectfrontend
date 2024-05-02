import React, { useState, useEffect } from 'react';
import { getallrooms } from '../utils/ApiFunctions';
import RoomCard from './RoomCard';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { Link } from 'react-router-dom';

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const roomsPerPage = 6;
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getallrooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  const totalRooms = filteredData.length;
  const totalPages = Math.ceil(totalRooms / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData.slice(startIndex, endIndex).map((room) => (
      <div key={room.id} className='room-card'>
        <RoomCard room={room} />
      </div>
    ));
  };

  return (
    <div className='room-container'>
      {
        (data.length>0 && data!=undefined) && <div className='filter'>
        <RoomFilter data={data} setfilterdata={setFilteredData} />
      </div>
      }
      <div className='paginator'>
        {totalPages>0 &&  <RoomPaginator
          currentPage={currPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />}
       
      </div>
      {isLoading && <div className='loading'>Loading rooms...</div>}
      {error && <div className='error'>Error: {error}</div>}
     { totalRooms>0 && <div className='rooms'>{renderRooms()}</div>}
     { totalRooms===0 && <p>No rooms added <Link>Please contact administrator or if you are the administrator add some rooms</Link></p>}
     
    </div>
  );
};

export default Room;
