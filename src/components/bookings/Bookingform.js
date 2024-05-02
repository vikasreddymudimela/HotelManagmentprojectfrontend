import React, { useEffect, useState } from 'react';
import { bookRoom, getroombyid } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import BookingSummary from './BookingSummary';

const Bookingform = () => {
    const [isvalidated, setisvalidated] = useState(false);
    const [isubmitted, setissubmitted] = useState(false);
    const [errormessage, seterrormessage] = useState("");
    const [roomprice, setisroomprice] = useState(0);
    const[isshowbookingform,setisshowbookingform] = useState(true)
    const [booking, setisbooking] = useState({
        checkindate: "",
        checkoutdate: "",
        guestemail: "",
        guestFullName: "",
        numOfChildren: "",
        numOfAdults: ""  
    });
    const [payment, setpayment] = useState(0);
    const navigate = useNavigate();
    const { roomid } = useParams();

    const handleinputchange = (e) => {
        const { name, value } = e.target;
        setisbooking({...booking, [name]: value});
        seterrormessage("");
    };

    const getroompricebyid = async (roomid) => {
        try {
            console.log(`the room id is ${roomid}`);
            const response = await getroombyid(roomid);
            console.log(response.roomprice);
            setisroomprice(response.roomprice);
        } catch(error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getroompricebyid(roomid);
    }, [roomid]);

    useEffect(() => {
        calculatepayment(); // Invoke calculatePayment whenever booking details change
    }, [booking, roomprice]); // Depend on booking and roomprice

    const calculatepayment = () => {
        const checkindate = moment(booking.checkindate);
        const checkoutdate = moment(booking.checkoutdate);
        const diffindays = checkoutdate.diff(checkindate, 'days'); // Calculate difference in days
        const price = roomprice ? roomprice : 0;
        console.log(price);
        setpayment(diffindays * price);
    };
    
    const isguestcountvalid = () => {
        const adultcount = parseInt(booking.numOfAdults);
        const childcount = parseInt(booking.numOfChildren);
        const totalcount = childcount + adultcount;
        return totalcount >= 1 && childcount >= 1;
    };

    const ischeckoutdatevalid = () => {
        if (!moment(booking.checkoutdate).isSameOrAfter(moment(booking.checkindate))) {
            seterrormessage("checkout date must be after checkindate");
            return false;
        } else {
            seterrormessage("");
            return true;
        }
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.isFormValid === false || !isguestcountvalid() || !ischeckoutdatevalid()) {
            e.stopPropagation();
        } else {
            setissubmitted(true);
            calculatepayment();
            setisshowbookingform(false)
            console.log(booking);
        }
        setisvalidated(true);
    };

    const handlebooking = async () => {
        try {
            const confirmationcode = await bookRoom(roomid, booking);
            setissubmitted(true);
            console.log(booking);
            navigate("/booking-success", { state: { message: confirmationcode } });
        } catch (error) {
            seterrormessage(error.message);
            navigate("/booking-success", { state: { error: error.message } });
        }
    };

    return (<>
     {
        isshowbookingform && (<div className="container mb-5 "  >
        <div className='row'>
            <div className='col-md-6'>
                <div className='card card-body mt-5' style={{ height:"100vh", width:'40vw',padding: '20px' }}>
                    <h4 className="card card-title text-center" style={{padding: '0px ',marginTop:"0vh", fontFamily: 'Arial, sans-serif', color: '#333'}}>
                        Reserve Room
                    </h4>
                    <Form noValidate validate={isvalidated} onSubmit={handlesubmit} sty>
                        <Form.Group>
                            <Form.Label htmlFor="guestname">Full Name:</Form.Label>
                            <Form.Control required type="text" id="guestName" name="guestFullName" value={booking.guestFullName} placeholder="Enter your full name" onChange={handleinputchange} style={{ width: '100%', marginBottom: '10px' }} />
                            <Form.Control.Feedback type="invalid">Please Enter your full name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="guestemail">Email:</Form.Label>
                            <Form.Control required type="text" id="guestemail" name="guestemail" value={booking.guestemail} placeholder="Enter your Email" onChange={handleinputchange} style={{ width: '100%', marginBottom: '10px' }} />
                            <Form.Control.Feedback type="invalid">Please Enter your full email address</Form.Control.Feedback>
                        </Form.Group>
                        <fieldset style={{ border: "2px", padding: '0px 0px' }}>
                            <div className='row' style={{ marginBottom: '0px' }}>
                                <div className='col-6'>
                                    <Form.Label htmlFor="guestcheckindate">Checkindate:</Form.Label>
                                    <Form.Control required type="date" id="checkindate" name="checkindate" value={booking.checkindate} placeholder="Enter your Checkindate" onChange={handleinputchange} style={{ width: '100%' }} />
                                    <Form.Control.Feedback type="invalid">Please select the checkindate</Form.Control.Feedback>
                                </div>
                                <div className='col-6'>
                                    <Form.Label htmlFor="guestcheckoutdate">CheckoutDate:</Form.Label>
                                    <Form.Control required type="date" id="checkoutdate" name="checkoutdate" value={booking.checkoutdate} placeholder="Enter your Checkindate" onChange={handleinputchange} style={{ width: '100%' }} />
                                    <Form.Control.Feedback type="invalid">Please select the checkoutdate</Form.Control.Feedback>
                                </div>
                            </div>
                            {errormessage && <p className='error-message text-danger'>{errormessage}</p>}
                        </fieldset>
                        <fieldset style={{ padding: '0px' }}>
                            <div className='row' style={{ marginBottom: '0px' }}>
                                <div className='col-6'>
                                    <Form.Label htmlFor="guestsadults">Number of Adults:</Form.Label>
                                    <Form.Control required type="number" id="numberOfAdults" min={1} name="numOfAdults" value={booking.numOfAdults} placeholder="Enter number of adults" onChange={handleinputchange} style={{ width: '100%' }} />
                                    <Form.Control.Feedback type="invalid">Please select at least one adult</Form.Control.Feedback>
                                </div>
                                <div className='col-6'>
                                    <Form.Label htmlFor="guestschildren">Number of Children:</Form.Label>
                                    <Form.Control required type="number" id="numberOfChildren" name="numOfChildren" value={booking.numOfChildren} placeholder="Enter number of children" onChange={handleinputchange} style={{ width: '100%' }} />
                                    <Form.Control.Feedback type="invalid">Please select number of children</Form.Control.Feedback>
                                </div>
                            </div>
                        </fieldset>
                        <div style={{ color: '#333', textAlign: 'center', marginTop: '0px' }}>
                            <p>Please check your details carefully before submitting.</p>
                        </div>
                        <div className="form-group mt-2 mb-2">
                            <button type="submit" className='btn btn-hotel' style={{ width: '100%', backgroundColor: 'red',color:'whitesmoke',fontWeight:'bold',fontFamily:'cursive',padding:'', borderColor: '#007bff' }}>Continue</button>

                        </div>
                    </Form>
                    
                </div>
            </div>
            
           
        </div>
    </div>)
     }
         <div className="col-md-6" style={{marginLeft:'25vw',marginTop:"5vh"}} onClick={handlesubmit}>
         {isubmitted && (<div>
            <BookingSummary booking={booking} isFormValid={isvalidated} onConfirm={handlebooking} payment={payment} />
             
         </div>
            
         )}
     </div>
    </>
       
    );
}

export default Bookingform;
