import React from 'react'
import { Link } from 'react-router-dom'
import Data from './Data';
import Axios from 'axios';
import { useState, useEffect } from 'react';

function Decryption() {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/getall').then(
            res => {
                setData(res.data);
            }
        ).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className='container'>
            <div className="decryption">
                <Data info={data}/>
            </div>

            <div className="nav">
                <Link to="/"><p>Encryption</p></Link>
            </div>   
        </div>
    )
}

export default Decryption
