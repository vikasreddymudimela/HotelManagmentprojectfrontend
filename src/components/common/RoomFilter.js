import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
const RoomFilter = ({data,setfilterdata}) => {
    const [filter,setfilter] = useState("");
    const handleselectchange = (e) => {
        const selectedroomtype = e.target.value;
        setfilter(selectedroomtype);
        const filteredrooms = data.filter((room) => room.roomtype.toLowerCase().includes(selectedroomtype.toLowerCase()));
        setfilterdata(filteredrooms);
    }
    const clearFilter = () => {
        setfilter("");
    setfilterdata(data); 
    }
    const roomTypes = ["",...new Set(data.map((room) => room.roomtype))]
  return (
    <div className='input-group-filter roomfilter-container mb-3'>
        
        <span className='input-group-text' id='room-type-filter'>
            Filter rooms by type
        </span>
        <select className='form-select' value={filter} onChange={handleselectchange}>
         <option value={""}>Select a roomtype to filter..</option>
         {
            roomTypes.map((type,index) => (
                <option key={index} value={type}>
                 {type}
                </option>
            ))
         }
       </select>
       <button className='btn btn-hotel' type='button' onClick={clearFilter}>
           Clear filter
       </button>
       
    </div>
  )
}

export default RoomFilter