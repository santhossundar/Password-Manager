import React from 'react'
import { useState} from 'react'
import Axios from 'axios'

function Login() {
    const [passwd, setPasswd] = useState('');

    const submit = (passwd) => {
        Axios.post('http://localhost:3001/login', {passwd: passwd});
    }

    return (
        <div className="container">
            <div className='form'>
                <h3>Password Manager</h3>
                <input className='formIn' type='text' placeholder='password' onChange={(event) => {setPasswd(event.target.value)}}/>  
                <button className='formBtn' onClick={() => {submit(passwd)}}>Login</button>
            </div>
        </div>   
    )
}

export default Login
