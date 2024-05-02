import logo from './logo.svg';
import './App.css';
import Addroom from './components/rooms/Addroom';
import Existingrooms from './components/rooms/Existingrooms';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Editroom from './components/rooms/Editroom';
import Home from './components/home/Home';
import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer'
import RoomListing from './components/rooms/RoomListing';
import Admin from './components/admin/Admin';
import Bookingform from './components/bookings/Bookingform';
import Checkout from './components/bookings/Checkout';
import Bookingsuccess from './components/bookings/Bookingsuccess';
import Bookings from './components/bookings/Bookings';
import FindBookings from './components/bookings/FindBookings';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import AuthProvider from './components/Auth/AuthProvider';
import Profile from './components/Auth/Profile';
import UserTable from './components/User/UserTable';
import RoleTable from './components/Roles/RoleTable';
import RoleUserTable from './components/Roles/RoleUserTable';
function App() {
  return (
   <>
   <AuthProvider>
   <main>
    <Router>
      <NavBar/>
      <Routes>
<Route path='/' element = {<Home/>} />
<Route path = "/edit-room/:roomid" element = {<Editroom/>} />
<Route path = "/existing-rooms" element = {<Existingrooms/>} />
<Route path = "/add-room" element = {<Addroom/>} />
<Route path = "/browse-all-rooms" element = {<RoomListing/>} />
<Route path="/book-room/:roomid"  element={<Checkout/>}/>
<Route path="/admin" element={<Admin/>}/>
<Route path="/booking-success" element={<Bookingsuccess/>}/>
<Route path="/existing-bookings" element = {<Bookings/>}/>
<Route path="/find-booking" element={<FindBookings/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Registration/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/users" element={<UserTable/>}/>
<Route path="/roleassignment" element={<RoleTable/>}/>
<Route path="/roleusers/:roleid" element={<RoleUserTable/>}/>

      </Routes>
    </Router>
    <Footer/>
   </main>
   </AuthProvider>
  
   </>
  );
}

export default App;
