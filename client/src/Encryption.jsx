import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Axios from 'axios';

function Encryption() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
  

    const addPassword = () => {
        Axios.post('http://localhost:3001/addpassword', {account: account, password: password});
    };
    return (
        <div className='container'>
            <div className='form'>
                <input className='formIn' type='text' placeholder='account' onChange={(event) => {setAccount(event.target.value)}}/>
                <input className='formIn' type='text' placeholder='password' onChange={(event) => {setPassword(event.target.value)}}/>  
                <button className='formBtn' onClick={addPassword}>Save</button>
            </div>

            <div className="nav">
                <Link to="decryption"><p>Decryption</p></Link>
            </div>
        
        </div>
        
    )
}

export default Encryption
