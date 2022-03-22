import React from 'react'
import DataView from './DataView'

function Data(props) {
    console.log(props.info);
    return (
        <div className='data'>
            {props.info.map(item => {
                return <DataView title={item.title} password={item.password}/>;
            })}
        </div>
    )
}

export default Data
