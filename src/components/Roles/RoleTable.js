import React, { useEffect, useState } from 'react';
import { createrole, deleterolebyid, getroles } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const RoleTable = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [roles, setRoles] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const[message,setmessage] = useState('');

  const fetchRoles = async () => {
    try {
      const response = await getroles();
      if (response) {
        setRoles(response);
        console.log(response)
      }
    } catch (error) {
      setErrorMessage('Could not fetch users');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addNewRole = async () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setNewRoleName(event.target.value);
  };
  const deleterole = async(roleid) => {
    const response = await deleterolebyid(roleid);
    if(response){
      setErrorMessage("role deleted successfully")
      await fetchRoles()
      console.log(`came here after`)
      
    }
    else{
      setErrorMessage("could not delete role")
    }
  }

  const handleSubmit = async(e) => {
    // Logic to submit new role
    setNewRoleName(e.target.value)
    const response = await createrole(newRoleName)
    
    if(response){ 
      setmessage("new role added successfully")
      fetchRoles()
      setTimeout(() => {
        setmessage("")
      }, 3000);
      setmessage("")
    }
    else{
      setmessage("could not add the role")
      setTimeout(() => {
        setmessage("")
      }, 3000);
      setmessage("")
    }
    setShowInput(false);
    setNewRoleName('');
    
  };

  return (
    <div>
      <button
        onClick={addNewRole}
        style={{
          margin: '2vh 1vh',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add new Role
      </button>
      {message && (<div className='alert alert-danger fade show '>
                                {message}
                            </div>)}
      {showInput && (
        <div>
          <input
            type="text"
            value={newRoleName}
            onChange={handleInputChange}
            placeholder="Enter role name"
            style={{ margin: '10px', padding: '5px' }}
          />
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      )}

      {roles.length > 0 && (
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.columnHeader}>S/N</th>
              <th style={styles.columnHeader}>Role ID</th>
              <th style={styles.columnHeader}>Role name</th>
              <th style={styles.columnHeader}>Action</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {roles.map((role, index) => (
              <tr key={role.id}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{role.id}</td>
                <td style={styles.tableCell}>{role.rolename}</td>
                <td style={styles.tableCell}>
                  <button style={{ backgroundColor: 'green', color:"whitesmoke", border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    <Link style={{color:"whitesmoke",textDecoration:"none" }} to={`/roleusers/${role.id}`}>Make changes to the role</Link>
                  </button>
                  <button  onClick={() => {
                    return deleterole(role.id)
                  }}style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer',marginLeft:"2vw"}}>
              
              Delete Role
              
              
              </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  // Styles here...
};

export default RoleTable;
