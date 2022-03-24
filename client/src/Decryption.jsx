import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

function Decryption() {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [passwd, setPasswd] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/getall').then(
            res => {
                setData(res.data);
            }
        ).catch(error => {
            console.log(error);
        });;
    }, []);
    
    const toggleModal = () => {
        setModal(!modal);
    }

    const decryptPassword = (pass) => {
        Axios.post('http://localhost:3001/decrypt', {obj:pass})
        .then(res => {
                setPasswd(res.data);
        }
        );
               
    }

    const deleteData = (id) => {
        Axios.post('http://localhost:3001/delete', {id: id});
    }

    return (
        <>
            <div className='container'>
                <div className="decryption">
                    {data.map((item) => {
                        return (<div key={item.id} className='data-view'>
                                    <h2 className="item-header">
                                    <p className="item" onClick={() => {
                                        decryptPassword(item.data); toggleModal()}}>{item.account}</p>
                                    <div className="deleteBtn" onClick={() => {
                                        deleteData(item.id)}}><FaRegWindowClose/>
                                    </div>
                                    </h2>                                      
                                </div>);})}
                </div>

                <div className="nav">
                    <Link to="/"><p>Encryption</p></Link>
                </div>   
            </div>

            {modal && (<div className="modal">
                <div className="overlay">
                    <div className='modal-content'>
                        <div className="password">{passwd}</div>
                        <div className="closeBtn" onClick={toggleModal}><FaRegWindowClose/></div>
                    </div>
                </div>     
            </div>)}
        </>
        
        
    )
}

export default Decryption
