import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import DecrypterView from './DecrypterView'

function Decryption(props) {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    
    useEffect(() => {
        Axios.get('http://localhost:3001/getall').then(
            res => {
                setData(res.data);
            }
        ).catch(error => {
            console.log(error);
        });
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <div className='container'>
                <div className="decryption">
                    {data.map(item => {
                        return (<div className='data-view' onClick={toggleModal}>
                            <h2 className="item-header">{item.title}</h2>
                            <p className="item">{item.password}</p></div>);
                    })}
                </div>

                <div className="nav">
                    <Link to="/"><p>Encryption</p></Link>
                </div>   
            </div>

            {modal && (<div className="modal">
                <div className="overlay">
                    <DecrypterView/>
                </div>     
            </div>)}
        </>
        
        
    )
}

export default Decryption
