import React, { createContext, useContext, useState } from 'react'
import  {jwtDecode, jwt_decode } from "jwt-decode"

export const Authcontext = createContext({
    user:null,
    handlelogin:(token) => {

    },
    handlelogout : () => {

    }
})
const AuthProvider = ({children}) => {
    const [user,setuser] = useState(null)
    const handlelogin = (token) => {
      const decodedtoken = jwtDecode(token)
      localStorage.setItem("userid",decodedtoken.sub)
      localStorage.setItem("userRole",decodedtoken.roles)
      localStorage.setItem("token",token)
      setuser(decodedtoken)
    }
    const handlelogout = (token) => {
        localStorage.removeItem("userid")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setuser(null)
      }
      
  return (
    <Authcontext.Provider value={{user,handlelogin,handlelogout}}>
      {children}
    </Authcontext.Provider>
  )
 
}
export const useAuth = () => {
    return  useContext(Authcontext)
  }

export default AuthProvider