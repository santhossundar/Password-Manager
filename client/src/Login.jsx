import { useState, useContext } from 'react'
import Axios from 'axios'
import { AuthContext } from './Context'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [passwd, setPasswd] = useState('');
    const {setAuth} = useContext(AuthContext);
    const nav = useNavigate();

    const handleSubmit = async (passwd) => {
        Axios.post('http://localhost:3001/login', {passwd: passwd})
        .then(res => {
            setAuth(res.data);
            nav('/');
        });
    }

    return (       
            <div className="container"> 
                <div className='form'>
                    <h3>Password Manager</h3>
                    <input className='formIn' type='text' placeholder='password' onChange={(event) => {setPasswd(event.target.value)}}/>  
                    <Link to='/'><button className='formBtn' onClick={() => {handleSubmit(passwd)}}>Login</button></Link>
                </div>
            </div>
    )
}

export default Login