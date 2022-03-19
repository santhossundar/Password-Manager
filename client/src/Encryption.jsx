import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Axios from 'axios';

function Encryption() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
  

    const addPassword = () => {
        Axios.post('http://localhost:3001/addpassword', 
        {account: account, password: password});
    
    };
    return (
        <>
            <div className="nav">
                <Link to="decryption">Decryption</Link>
            </div>

            <div className='encryption'>
                <input className='enIn' type='text' placeholder='account' onChange={(event) => {setAccount(event.target.value)}}/>
                <input className='enIn' type='text' placeholder='password' onChange={(event) => {setPassword(event.target.value)}}/>  
                <button className='enBtn' onClick={addPassword}>Save</button>
            </div>
        
        </>
        
    )
}

export default Encryption
