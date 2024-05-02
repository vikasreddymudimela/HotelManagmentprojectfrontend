import React, { useContext } from "react"
import { Authcontext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(Authcontext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handlelogout()
		navigate("/", { state: { message: " You have been logged out!" } })
	}

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Profile
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Logout
			</button>
		</>
	)
}

export default Logout