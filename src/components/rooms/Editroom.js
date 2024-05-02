import React, { useEffect } from 'react'
import { getroombyid, updateroom } from '../utils/ApiFunctions';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';
import {FaEdit,FaEye} from "react-icons/fa"
import { Link } from 'react-router-dom';
// import { updateroom } from '../utils/ApiFunctions';
const Editroom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });
    const {roomid} = useParams();
    console.log(roomid);

    useEffect(() => {
const fetchroom = async() => {
try{
    // console.log(roomid+"hrllo");
 const roomData = await getroombyid(roomid);
 console.log(roomData);
 setRoom(prevRoom => ({
    ...prevRoom,  // Keep the previous state
    roomType: roomData.roomtype,
    roomPrice: roomData.roomprice,
    photo: roomData.photo
}));
 console.log(room);
 setimagepreview(roomData.photo);
}catch(error){
console.log(error);
}
}
fetchroom()
    },[roomid]);
    
  
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imagepreview,setimagepreview] = useState("");
    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "roomPrice") {
            if (!isNaN(value)) {
                newValue = parseInt(value);
            } else {
                newValue = ""; 
            }
        }

        setRoom({ ...room, [name]: newValue });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setimagepreview(URL.createObjectURL(selectedImage));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateroom(roomid,room);
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully");
                const updateRoomData = await getroombyid(roomid);
                setRoom(prevRoom => ({
                    ...prevRoom,  // Keep the previous state
                    roomType: updateRoomData.roomtype,
                    roomPrice: updateRoomData.roomprice,
                    photo: updateRoomData.photo
                }));
                // setRoom(updateRoomData);
                setimagepreview(updateRoomData.photo);
                setErrorMessage("");
            }else{
                setErrorMessage("error updating room");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    const roomTypeUniqueId = "roomType" + Math.random().toString(36).substring(7);
    const roomPriceUniqueId = "roomPrice" + Math.random().toString(36).substring(7);
    const photoUniqueId = "photo" + Math.random().toString(36).substring(7);
    return (
        <>
            <section className='container-addroom mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Make changes to the room</h2>
                        {successMessage && (
                            <div className='alert alert-success fade show '>
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className='alert alert-danger fade show '>
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            
                                <label htmlFor={roomTypeUniqueId} className='form-label'>Room type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newroom={room} />
                                </div>
                        
                            <div className='mb-3 ' id = "priceid">
                                <label htmlFor={roomPriceUniqueId} className='form-label'>Room Price</label>
                                <input type='number' className='form-control'  id={roomPriceUniqueId} name="roomPrice" value={room.roomPrice} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3' id = "photoid">
                                <label htmlFor={photoUniqueId} className='form-label'>Photo</label>
                                <input type='file' className='form-control'  id={photoUniqueId} name="photo" onChange={handleImageChange} />
                            {imagepreview && (
                                <img  src={`data:image/jpeg;base64,${imagepreview}`}alt='roompreview' style={{maxWidth:"400px",maxHeight:"400"}} className='mt-3'/>
                            )}
                            
                            </div>
                            <div className='d-grid d-md-flex mt-2' id="btn-save-room-id">
                            <Link to={"/existing-rooms"}>
                                            <span className='view_edit_1'>
                                              <FaEye/>
                                            </span>
                                            <span className='view_edit_2'>
                                             <FaEdit/>
                                            </span>
                                            </Link>
                                <button className='btn btn-outline-primary ml-5 btn-save-room' type="submit">Edit Room</button>
                            </div>
                        </form>
                    </div>
                   
                </div>
               
            </section>
            
            
            
        </>
    );
}



export default Editroom