import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function User() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  

  const getUsers = async () => {
    try {
      const response = await axios.get('https://register-form-eoki.onrender.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const openPDF = async (filename) => {
    try {
      const response = await axios.get(`https://register-form-eoki.onrender.com/files/${filename}`, {
        responseType: 'blob',
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  const deleteData = async(id) =>{
    try {
      await axios.delete('https://register-form-eoki.onrender.com/deleteData/'+id)
      .then(result=> { console.log(result)
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex vh-80 bg-white justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-5'>
        {users.map((e, i) => (
          <div key={i} className="card mb-3 shadow-lg">
            <div className="card-body">
              <h3 className="card-title"> Hi, {e.firstname} {e.lastname}</h3>
              <p className="card-text">Email: {e.email}</p>
              <p className="card-text">Gender: {e.gender}</p>
              <p className="card-text">City: {e.city}</p>
              <p className="card-text">State: {e.state}</p>
              <p className="card-text">Zip: {e.zip}</p>
              <p>File :  
              {e.file && (
                
                <button className="btn btn-primary" onClick={() => openPDF(e.file)}>Open PDF</button>
              )}
              </p>
              <button className='btn btn-danger'
              onClick={()=> deleteData(e._id)}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
