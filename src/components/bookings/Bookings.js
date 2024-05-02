import React, { useEffect } from 'react'
import { useState } from 'react'
import { cancelbooking, getallbookings } from '../utils/ApiFunctions'
import Header from "../common/Header"
import BookingsTable from './BookingsTable'

const Bookings = () => {
    const[bookinginfo,setbookinginfo] = useState([])
    const[isloading,setisloading] = useState(true)
    const[error,seterror] = useState("")
    useEffect(()=>{
         setTimeout(() => {
            getallbookings().then((data) => {
                console.log(data)
                setbookinginfo(data)
                setisloading(false)
            }).catch((error) => {
                seterror(error.message)
                setisloading(false)
            })
         },1000)
    },[])
    const handlebookingcancellation = async(bookingid) => {
        try{
            await cancelbooking(bookingid)
            const data = await getallbookings()
            console.log(data)
            setbookinginfo(data)
        }catch(error){
             seterror(error.message)
        }
    }
  return (
    <section className="conatiner" style={{backgroundColor:"whitesmoke"}}>
        <Header title={"Existing Bookings"}/>
        {error && <div className="text-danger">{error}</div>}
        {
            isloading?(<div>Loading Existing Bookings</div>):(
                <BookingsTable bookinginfo={bookinginfo} handlebookingcancellation={handlebookingcancellation}/>
            )
        }

    </section>
  )
}

export default Bookings