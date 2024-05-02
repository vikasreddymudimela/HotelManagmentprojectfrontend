import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { Authcontext } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [showAccount, setShowAccount] = useState(false);
const{user } = useContext(Authcontext)
 const {handlelogout} = useContext(Authcontext)
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };
  const navigate = useNavigate()
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  const isloggedin = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")
  
    setTimeout(() => {
      handlelogout()
      navigate("/", { state: { message: " You have been logged out!" } })
    },[3600000])

  return (
    <nav className='navbar navbar-expand-lg' style={{ backgroundColor: '#f8f9fa', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: '0', zIndex: '1000' }}>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand' style={{ color: '#343a40', fontWeight: 'bold' }}>
          Hotel Yashodha
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarScroll'
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink
                className={`nav-link ${activeLink === 'browse-all-rooms' ? 'active' : ''}`}
                to="browse-all-rooms"
                onClick={() => handleNavLinkClick('browse-all-rooms')}
              >
                Browse All Rooms
              </NavLink>
            </li>
    
            {isloggedin && userRole.includes("ROLE_ADMIN") && (
              <li className='nav-item'>
              <NavLink
                className={`nav-link ${activeLink === 'admin' ? 'active' : ''}`}
                to='/admin'
                onClick={() => handleNavLinkClick('admin')}
              >
                Admin
              </NavLink>
            </li>
            )}
            
            
          </ul>
          <ul className='d-flex navbar-nav'>
            <li className='nav-item'>
              <NavLink
                className={`nav-link ${activeLink === 'find-booking' ? 'active' : ''}`}
                to='/find-booking'
                onClick={() => handleNavLinkClick('find-booking')}
              >
                Find my booking
              </NavLink>
            </li>
            <li className='nav-item dropdown'>
              <a
                className={`nav-link dropdown-toggle ${showAccount ? 'show' : ''}`}
                href='#'
                role='button'
                onClick={handleAccountClick}
                data-bs-toggle='dropdown'
                aria-expanded='false'
                style={{ color: '#343a40', fontWeight: 'bold' }}
              >
                Account
              </a>
              <ul className={`dropdown-menu ${showAccount ? 'show' : ''}`} >
              {isloggedin ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <style>
        {`
          .nav-link.active {
            border-bottom: 2px solid red;
          }
          .navbar-nav .nav-link {
            color: #343a40;
            font-weight: bold;
            transition: color 0.3s;
          }
          .navbar-nav .nav-link:hover {
            color: #28a745; /* Green color on hover */
          }
          .dropdown-menu {
            background-color: #f8f9fa;
          }
          .dropdown-menu .dropdown-item {
            color: #343a40;
            font-weight: bold;
            transition: color 0.3s;
          }
          .dropdown-menu .dropdown-item:hover {
            color: #28a745; /* Green color on hover */
          }
        `}
      </style>
    </nav>
  );
};

export default NavBar;
