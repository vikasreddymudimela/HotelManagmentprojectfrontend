import  axios from "axios"

export const  api = axios.create({
    baseURL:"http://localhost:8080"
})

export const getheader = () =>{
const token = localStorage.getItem("token");
return{
Authorization:`Bearer ${token}`,
"Content-type":"application/json"
}
}

export default async function addroom(photo,roomtype,roomprice){
    const token = localStorage.getItem("token");
    console.log(`roomtype${roomtype}`)
    const formdata = new FormData();
    formdata.append("photo",photo);
    formdata.append("roomprice",roomprice);
    formdata.append("roomtype",roomtype);
    console.log(formdata)
     const  response  = await api.post("/rooms/add/new-room",formdata,{
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-type":"multipart/form-data"
            }
     });
     if(response.status===201){
        return true;
     }else{
        return false;
     }
}

export async function getroomtypes(){
    try{
        const  response = await api.get("/rooms/room-types",{
            headers:getheader()
        });
        console.log(response.data)
        return response.data;
    }catch(error){
        throw new Error("Error fetching room types");
    }
}

export async function getallrooms(){
    try{
        console.log("this is the file");
        const  response = await api.get("/rooms/all-rooms",{
            headers:getheader()
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        throw new Error("Error fetching room types");
    }
}

export  async function deleteroom(roomid){
    try{
 const response = await api.delete(`/rooms/delete/room/${roomid}`,{
    headers:getheader()
});
  return ( response).data;
    }catch(error){
     console.log(`${error.message}`)
    }
}

export async function updateroom(roomid,roomData){
    const formdata = new FormData();
    const token = localStorage.getItem("token");
    formdata.append("roomType",roomData.roomType);
    formdata.append("roomPrice",roomData.roomPrice);
    formdata.append("photo",roomData.photo);
    const response = await api.put(`rooms/update/${roomid}`,formdata,{
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-type":"multipart/form-data"
            }});
    return response;
}

export async function getroombyid(roomid){
    try{
        const response = await api.get(`/rooms/room/${roomid}`,{
            headers:getheader()
        })
        console.log(response.data);
        return ( response).data
    }
    catch(error){
        throw new Error(`Error fetching room ${error.message}`);
    }
}

export async function bookRoom(roomid,booking){
    try{
   const response = await api.post(`/bookings/room/${roomid}/booking`,booking,{
    headers:getheader()
})
   return response.data;

    }
    catch(error){
        if(error.response && error.message){
            throw new Error (error.response.data)
        }else{
            throw new Error(`Error  booking room : ${error.message}`)
        }
    }
}

export async function getallbookings(){
    try{
        const result = await api.get("/bookings/all-bookings",{
            headers:getheader()
        });
        return result.data
    }
    catch(error){
        throw new Error(`error fetching bookings:${error.message}`)
    }
}


export async function getbookingbyconfirmationcode( Confirmationcode){
try{
    const result =  await api.get(`/bookings/confirmationcode/${Confirmationcode}`,{
        headers:getheader()
    })
    return result.data
}catch(error){
    if(error.response && error.response.data){
        throw new Error(error.response.data)
    }else{
        throw new Error(`Error find booking:${error.message}`)
    }
}
}

export async function cancelbooking(bookingid){
    try{
        const result = await api.delete(`/bookings/booking/${bookingid}/delete`,{
            headers:getheader()
        })
        return result.data
    }catch(error){
        throw new Error(`Error cancel booking :${error.message}`)
    }
}

export async function getavailablerooms(checkindate,checkoutdate,roomtype){
     console.log(`checkindate${checkindate}`)
     console.log(`checkoutdate${checkoutdate}`)
     console.log(`roomtype${roomtype}`)
    try{
        // const url = `/rooms/available-rooms?checkindate=${checkindate}&checkoutdate=${checkoutdate}&roomtype=${roomtype}`;
        // console.log(url)
        
        const formdata = new FormData()        // console.log(`checkindate is ${checkindate} `)
        formdata.append("checkindate",checkindate)
        formdata.append("checkoutdate",checkoutdate)
        formdata.append("roomtype",roomtype)
        //console.log("Number of keys in FormData:", [...formdata.keys()].length);

        
        //onsole.log(formdata.keys.length)
    
        
       const result = await api.post("rooms/available-rooms",formdata,{
        headers:getheader()
    });
       console.log(result)
    
    // const result = axios.get("http://localhost:8080/rooms/available-rooms?checkindate=2024-05-23&checkoutdate=2024-05-30&roomtype=Double Bed Room")
    console.log(`this is response${result.data[0]['roomtype']}`)  
     return result.data
    }
    catch(error){
        throw new Error(`Error room details fetching :${error.message}`)
    }
}

export async function registeruser(registration){
    try{
        const response = await api.post("auth/register-user",registration,{
            headers:getheader()
        });
        return response.data
    }catch(error){
        if(error.response && error.response.data ){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`user registration error":${error.message}`)
        }
    }
}


export async function deleteuser(userid){
    try{
    const response = await api.delete(`/users/delete/${userid}`,{
        headers:getheader()
    })
    return response.data
    }catch(error){
  return error.message
    }
}
export async function deleteuserbyadmin(userid){
    try{
    const response = await api.delete(`/users/deleteuser/${userid}`,{
        headers:getheader()
    })
    return response.data
    }catch(error){
  return error.message
    }
}
export async function getroles(){
    console.log("came here")
    try{
    const response = await api.get("roles/allroles",{
        headers:getheader()
    })

    console.log(`${response.data} from roles `)
    return response.data
    }catch(error){
  return error.message
    }
}
export async function getrolesbyid(roleid){
    try{
    const response = await api.get(`/roles/role/${roleid}`,{
        headers:getheader()
    })
    return response.data
    }catch(error){
  return error.message
    }
}




export async function loginUser(login){
    try{
           const response = await api.post("auth/login",login)
           if(response.status>=200 && response.status<300){
            return response.data;
           }
           else{
            return null;
           }
    }catch(error){
    console.error(error);
    return null;
    }
}


export async function getuserprofile(userid,token){
    try{
         const response = await api.get(`users/profile/${userid}`,{
            headers:getheader()
         })
         return response.data
    }catch(error){
  throw error
    }
}

export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}`, {
			headers: getheader()
		})
        console.log(response.data)
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

export async function getusers(){
    try{
    const response = await api.get("users/all",{
        headers:getheader()
    })
    console.log(response.data)
    return response.data
    }
    catch(error){
           console.error(`error fetching details user ${error}`)  
    }
}
export async function createrole(rolename){
    const formdata = new FormData()
    formdata.append("name",rolename)
    try{
    const response = await api.post("roles/createrole",formdata,{
        headers:getheader()
    })
    console.log(response.data)
    return response.data
    }
    catch(error){
           console.error(`error adding new role ${error}`)  
    }
}

export async function deleterolebyadminforuser(userid,roleid){
    const formdata = new FormData()
    console.log(userid)
    console.log(roleid)
    formdata.append("userid",userid)
    formdata.append("roleid",roleid)
    try{
    const response = await api.post("roles/remove-user-from-role",formdata,{
        headers:getheader()
    })
    console.log(`${response} from userdelet`)
    console.log(response)
    return response.data
    }
    catch(error){
           console.error(`error deleting user ${error}`)  
    }
}


export async function assignroletouser(userid,roleid){
    const formdata = new FormData()
    formdata.append("userid",userid)
    formdata.append("roleid",roleid)
    console.log(userid)
    console.log(roleid)
    try{
    const response = await api.post("roles/assign-user-to-role",formdata,{
        headers:getheader()
    })
    console.log(`${response} from userassign`)
    return response.data
    }
    catch(error){
           console.error(`error adding new role ${error}`)  
    }
}

export async function deleterolebyid(roleid){
  
    console.log(roleid)
    try{
        const response =  await api.delete(`roles/delete/${roleid}`,{
            headers:getheader()
        })
        console.log(response.data)
        return response.data
    }catch(error){
        console.error(`error deleting  role ${error}`)
    }
}