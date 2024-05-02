import React, { useState } from 'react';
import addroom from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import Existingrooms from './Existingrooms';
import { Link } from 'react-router-dom';

function Addroom() {
    const [newroom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });
    const[roomfresh ,setroomfresh] = useState(false);

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

        setNewRoom({ ...newroom, [name]: newValue });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newroom, photo: selectedImage });
        const previewURL = URL.createObjectURL(selectedImage);
        console.log("Preview URL:", previewURL); 
        setimagepreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addroom(newroom.photo, newroom.roomType, newroom.roomPrice);
            if (success !== undefined) {
                setSuccessMessage("A new room has been added to the hotel management system");
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setimagepreview("")
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
                        <h2 className='mt-5 mb-2'>Add a new room</h2>
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
                        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                            
                                <label htmlFor={roomTypeUniqueId} className='form-label'>Room type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newroom={newroom} />
                                </div>
                        
                            <div className='mb-3 ' id = "priceid">
                                <label htmlFor={roomPriceUniqueId} className='form-label'>Room Price</label>
                                <input type='number' className='form-control' required id={roomPriceUniqueId} name="roomPrice" value={newroom.roomPrice} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3' id = "photoid">
                                <label htmlFor={photoUniqueId} className='form-label'>Photo</label>
                                <input type='file' className='form-control' required id={photoUniqueId} name="photo" onChange={handleImageChange}  />
                                {imagepreview && (
                                <img  src={imagepreview}alt='roompreview' style={{maxWidth:"400px",maxHeight:"400"}} className='mt-3'/>
                            )}
                            </div>
                            
                            <div className='d-grid button-container d-md-flex mt-2' id="btn-save-room-id">
                            <Link to = {"/existing-rooms"}>
                                <button className='view_edit_5' >Check exisitng rooms</button>
                       
                                </Link>
                                <button className='view_edit_6' type="submit">Save Room</button>
                            </div>
                        </form>
                    </div>
                   
                </div>
               
            </section>
            
            
            
        </>
    );
}

export default Addroom;