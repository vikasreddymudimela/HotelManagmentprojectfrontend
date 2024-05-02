import React, { useState } from 'react';
import moment from 'moment';
import { getavailablerooms } from '../utils/ApiFunctions';
import { Container, Form, Col, Button, Row } from 'react-bootstrap';
import RoomTypeSelectorForSearch from './RoomTypeSelectorforsearch';
import RoomSearchresult from './RoomSearchresult';

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkindate: "",
        checkoutdate: "",
        roomtype: ""
    });
    const [errormessage, setErrorMessage] = useState("");
    const [available, setAvailable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    const handleSearch = async(e) => {
        e.preventDefault();
        const checkin = moment(searchQuery.checkindate);
        const checkout = moment(searchQuery.checkoutdate);
        if (!checkin.isValid() || !checkout.isValid()) {
            setErrorMessage("Please enter a valid date range");
            return;
        }
        if (checkout.isSameOrBefore(checkin)) {
            setErrorMessage("Checkout date must come after check-in date");
            return;
        }
        setIsLoading(true);
        
        getavailablerooms(searchQuery.checkindate, searchQuery.checkoutdate, searchQuery.roomtype)
            .then((response) => {
                setAvailable(response);
            })
            .catch((error) => {
                console.error(error); 
                setErrorMessage("Failed to fetch available rooms. Please try again later."); 
                
            })
            .finally(() => {
                setIsLoading(false);
                setSearchQuery({
                    checkindate: "",
                    checkoutdate: "",
                    roomtype: ""
                })
                
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrorMessage(""); 
    };

    const clearSearch = () => {
        setSearchQuery({
            checkindate: "",
            checkoutdate: "",
            roomtype: ""
        });
        setIsLoading(true)
        setErrorMessage(""); 
    };

    return (
        <>
            <Container fluid="sm" className="p-0">
            <h4 className="text-center" style={{ fontFamily: 'cursive', color: '#007bff' }}>Search Rooms By checkindate and checkoutdate and time</h4>

                <Form onSubmit={handleSearch} className="p-4">
                    <Row style={{display:"flex",justifyContent:"center"}}>
                        <Col xs={12} md={3} className="mb-3">
                            <Form.Group controlId="checkindate">
                                <Form.Label className='text-center'>Check in date</Form.Label>
                                <Form.Control type="date" name="checkindate" value={searchQuery.checkindate} onChange={handleInputChange} min={moment().format("YYYY-MM-DD")} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="mb-3">
                            <Form.Group controlId="checkoutdate">
                                <Form.Label className='text-center'>Check out date</Form.Label>
                                <Form.Control type="date" name="checkoutdate" value={searchQuery.checkoutdate} onChange={handleInputChange} min={moment().format("YYYY-MM-DD")} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label className='text-center'>Room Type</Form.Label>
                                <RoomTypeSelectorForSearch handleRoomInputChange={handleInputChange} newroom={searchQuery} />    
                            </Form.Group>
                        </Col>
                        
                    </Row>
                    <Row style={{display:"flex",justifyContent:"center"}}>
                        <Col xs={12} md={3}>
                        <Button type="submit" className="w-100">Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <div className="mt-4">
                {isLoading ? <p className='text-center'>Finding available rooms....</p> : available.length>0 ? <RoomSearchresult results={available} onClearSearch={clearSearch} /> : <div className='text-center'>No rooms available for selected dates and room type</div>}
                {errormessage && <p style={{ color: 'red' }}>{errormessage}</p>}
            </div>
        </>
    );
};

export default RoomSearch;
