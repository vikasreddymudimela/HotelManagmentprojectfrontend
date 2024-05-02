import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assignroletouser, deleterolebyadmin, deleterolebyadminforuser, getrolesbyid } from '../utils/ApiFunctions';

const RoleUserTable = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddUserInput, setShowAddUserInput] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const { roleid } = useParams();

  const fetchUsers = async () => {
    try {
      const response = await getrolesbyid(roleid);
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      setErrorMessage('Could not fetch users');
    }
  };

  useEffect(() => {
     fetchUsers();
  }, [roleid]);

  const handleAddUserClick = () => {
    setShowAddUserInput(true);
  };

  const handleInputChange = (event) => {
    setNewUserName(event.target.value);
    console.log(newUserName)
  };

  const handleAddUserSubmit = async() => {
    // Logic to add new user to the role
    // Assuming there's a function for adding user to role
    // Implement the function and handle the submission accordingly
    console.log(`username${newUserName}`)
    console.log(`roleid${roleid}`)
    const response = await assignroletouser(newUserName,roleid)
    
    setErrorMessage("wait till the process")
    if(response){
      setErrorMessage("Assigned and added ")
     await  fetchUsers()
    }
    else {
      setErrorMessage("could not assign role as user not present")  
      setTimeout(() => {
        setErrorMessage("")
      }, 3000);  
    }
   
    setShowAddUserInput(false);
    setNewUserName('');
  };

  const deleteuserfromthisrole = async(userid,roleid) => {
    const response = await deleterolebyadminforuser(userid,roleid)
    console.log(`userid${userid}`)
    console.log(`roleid${roleid}`)
    if(response){
      fetchUsers()
      setErrorMessage("User deleted successfully")
      setTimeout(() => {
        setErrorMessage("")
      }, 10000);
    }
    else{
      setErrorMessage("User not deleted ")
      setTimeout(() => {
        setErrorMessage("")
      }, 10000);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '3vh 0vh' }}>
        <button onClick={handleAddUserClick} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Add new user for this role
        </button>
        <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Remove all users from this role
        </button>
      </div>
      {errorMessage && (<div className='alert alert-danger fade show '>
                                {errorMessage}
                            </div>)}
       
      {showAddUserInput && (
        <div>
          <input
            type="text"
            value={newUserName}
            onChange={handleInputChange}
            placeholder="Enter user id"
            style={{ margin: '10px', padding: '5px' }}
          />
          <button onClick={handleAddUserSubmit} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Submit
          </button>
        </div>
      )}

      {users.length > 0 && (
        <table style={styles.table}>
           <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.columnHeader}>S/N</th>
                <th style={styles.columnHeader}>User ID</th>
                <th style={styles.columnHeader}>First name</th>
                <th style={styles.columnHeader}>Last name</th>
                <th style={styles.columnHeader}>Email</th>
                <th style={styles.columnHeader}>Action</th>
             
              </tr>
            </thead>
            <tbody style={styles.tableBody} >
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{user.id}</td>
                  <td style={styles.tableCell}>{user.firstname}</td>
                  <td style={styles.tableCell}>{user.lastname}</td>
                  <td style={styles.tableCell}>{user.email}</td>  
                  <td style={styles.tableCell}>
                  <button  onClick ={() => { deleteuserfromthisrole(user.id,roleid)}}style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
              
                Remove user from this role
                
                
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
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #dee2e6', // Add border to the table
  },
  tableHeader: {
    backgroundColor: '#343a40', // Darker color for the header
    color: '#fff',
  },
  columnHeader: {
    whiteSpace: 'nowrap',
    minWidth: '100px', // Adjust the width as needed
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '8px',
    border: '1px solid #dee2e6', // Add border to the header cells
  },
  tableBody: {
    backgroundColor: '#fff',
  },
  tableCell: {
    whiteSpace: 'nowrap',
    padding: '8px',
    border: '1px solid #dee2e6', // Add border to the cells
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default RoleUserTable;
