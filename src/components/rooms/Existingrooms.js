import React, { useEffect, useState } from 'react';
import { deleteroom, getallrooms } from '../utils/ApiFunctions';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator'; 
import {FaEye,FaEdit, FaTrashAlt, FaPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {Row,Col} from "react-bootstrap"
const Existingrooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentpage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchRooms()
    }, []);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            console.log("method cam here");
            const result = await getallrooms();
            console.log("method cam here54");
            setRooms(result);
            setIsLoading(false);
        } catch (error) {

            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (selectedRoomType === '') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomtype === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    const indexOfLastRoom = currentpage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const handlePaginationCheck = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handledelete = async(roomid)  => {
     try{
       const result = await deleteroom(roomid);
       if(result === ""){
        setSuccessMessage(`Room no ${roomid} is deleted`);
        fetchRooms();
       }
     }catch(error){
        console.log(`${error.message}`)
     }
     setTimeout(()=>{
  setSuccessMessage("");
  setErrorMessage("");
     },3000)
    }

    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms</p>
            ) : (
                <section className="mt-5 mb-5 container-existingroom">
                    <div className="d-flex justify-content-center mb-3 mt-5">
                        <h2>Existing rooms</h2>
                    </div>
                    <div>
                    <RoomFilter data={rooms} setfilterdata={setFilteredRooms} />
                    
                    </div>
                    <div>
                    
                    


                    </div>
                    <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>RoomType</th>
                                <th>RoomPrice</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(currentRooms)&&currentRooms.map((room) => (
                                <tr key={room.id} className="text-center">
                                    <td>{room.id}</td>
                                    <td>{room.roomtype}</td>
                                    <td>{room.roomprice}</td>
                                    <td className='gap-2'>
                                        <Link to={`/edit-room/${room.id}`}>
                                            <span className='view_edit_1'>
                                              <FaEye/>
                                            </span>
                                            <span className='view_edit_2'>
                                             <FaEdit/>
                                            </span>
                                            </Link>
                                        <button  onClick={() => handledelete(room.id)} className=' btn btn_danger btn_sm view_edit_3 '>
                                            <FaTrashAlt/>
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div>
                    <RoomPaginator
                        currentPage={currentpage}
                        totalPages={calculateTotalPages()}
                        onPageChange={handlePaginationCheck}
                    />
                    </div>
                   
                </section>
            )}
        </>
    );
};

export default Existingrooms;
