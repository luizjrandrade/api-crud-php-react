import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';


function App() {
  const baseUrl="http://localhost:80/apiphp/api/read.php";
  const [data, setData]=useState([]);

  const empGet=async()=>{
    await axios.get(baseUrl)
    .then(function(response){
      console.log(response.data);
      setData(response.data);
    })
  }

  useEffect(()=>{
    empGet();
  },[])

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Designation</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
       
        <tbody>
          
        </tbody>
         
      </table>
     
    </div>
  );
}

export default App;
