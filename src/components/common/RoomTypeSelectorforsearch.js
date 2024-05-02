import React, { useEffect, useState } from 'react';
import { getroomtypes } from '../utils/ApiFunctions';

const RoomTypeSelectorForSearch = ({ handleRoomInputChange, newroom }) => {
  const [roomtypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    getroomtypes()
      .then((data) => {
        setRoomTypes(data);
      })
      .catch((error) => {
        console.error('Error fetching room types:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleNewRoomTypeAdd = () => {
    if (newRoomType.trim() !== "") {
      document.getElementById('roomTypeNew').disabled = false;
      setRoomTypes([...roomtypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  const handleNewRoomTypeReset = () => {
    document.getElementById('roomTypeNew').disabled = false;
    setShowNewRoomTypeInput(false);
  };

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  return (
    <>
      {!isLoading && roomtypes && roomtypes.length > 0 && (
        <div className='roomtypecontainer' style={{ margin: "0vh 2vw", width: "25vw" }}>
          <select
            id='roomTypeNew'
            name='roomtype'
            value={newroom.roomtype}
            onChange={(e) => {
              if (e.target.value === "AddNew") {
                setShowNewRoomTypeInput(true);
                document.getElementById('roomTypeNew').disabled = true;
              } else {
                handleRoomInputChange(e);
              }
            }}
            className='form-select'
            style={{ padding: "3vh" }}
          >
            <option value={""}>SELECT A ROOM TYPE</option>
            <option value={"AddNew"}>Add New Room Type</option>
            {roomtypes && roomtypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className='input-group mt-3'>
              <input
                className='form-control'
                type='text'
                placeholder='Enter a room type'
                value={newRoomType}
                onChange={handleNewRoomTypeInputChange}
              />
              <button className='btn btn-primary mx-2' id='btn_add' type='button' onClick={handleNewRoomTypeAdd}>
                Add
              </button>
              <button className="btn btn-secondary" type='button' id='btn_reset' onClick={handleNewRoomTypeReset}>
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelectorForSearch;
