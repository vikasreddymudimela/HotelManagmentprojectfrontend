import React, { useEffect } from 'react'
import { deleteuserbyadmin, getusers } from '../utils/ApiFunctions'
import { useState } from 'react'
import { deleteuser } from '../utils/ApiFunctions'

const UserTable = () => {
  const [users,setusers] = useState([])
  const[errormessage,seterrormessage] = useState("")
  const[delsta,setdelsta]=useState("")
    const usersfunc =  async() => {
        try{
            const response = await getusers()
            if(response){
                setusers(response)
            }
          
        }catch(error){
            seterrormessage("Couldnot fetch users")
        }     

    }
    const handledeleteaccount = async (userid) => {
        const confirmed = window.confirm(
          'Are you sure you want to delete the account? This action cannot be undone'
        );
        if (confirmed) {
          try {
            await deleteuserbyadmin(userid);
            setdelsta('Account deleted successfully.');
            usersfunc()
            
            // Navigate to some other page after successful deletion
            // history.push('/')
            // window.location.reload(); // This might not be necessary if you're using client-side routing
          } catch (error) {
            seterrormessage(error);
          }
        }
      };
    useEffect(() => {
    usersfunc()
    },[])
  return (
    <div>
        {
            users.length>0 && <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.columnHeader}>S/N</th>
                <th style={styles.columnHeader}>User ID</th>
                <th style={styles.columnHeader}>First name</th>
                <th style={styles.columnHeader}>Last name</th>
                <th style={styles.columnHeader}>Email</th>
                <th style={styles.columnHeader}> Roles</th>
                <th style={styles.columnHeader}> Delete User</th>
               
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
                  <td style={styles.tableCell}><ul >
                  {user.roles.map((role,id) => {
                    return <li key={id}>{role.name}</li>
                  })}
                    </ul></td>
                  <td style={styles.tableCell}>
              <button onClick={() => handledeleteaccount(user.email)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Delete Account</button>
            </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        }
    
    </div>
  )
}
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
  }
export default UserTable