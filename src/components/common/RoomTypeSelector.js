import React, { useEffect, useState } from 'react';
import { getroomtypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newroom }) => {
  const [roomtypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getroomtypes()
      .then((data) => {
        if(data!=null || data!=undefined){
          setRoomTypes(data);
          console.log(`roomtypesnow${roomtypes}`)
        }
        else{
          setRoomTypes([])
        }
        
        
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
      {isLoading && (
        <div className='alert alert-success fade show'>
          Please wait while existing room types are loaded...
        </div>
      )}

      {!isLoading && (
        <div className='roomtypecontainer'>
          <select
            id='roomTypeNew'
            name='roomType'
            value={newroom.roomType}
            onChange={(e) => {
              if (e.target.value === "AddNew") {
                setShowNewRoomTypeInput(true);
                document.getElementById('roomTypeNew').disabled = true;
              } else {
                handleRoomInputChange(e);
              }
            }}
            className='form-select'
          >
            <option value={""}>SELECT A ROOM TYPE</option>
            <option value={"AddNew"}>Add New Room Type</option>
            { roomtypes!=undefined && roomtypes.map((type, index) => (
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
                name="roomType"
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

export default RoomTypeSelector;
