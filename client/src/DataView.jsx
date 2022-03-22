import React from 'react'

function DataView(props) {
    return (
        <div className='data-view'>
            <h2 className="item-header">{props.title}</h2>
            <p className="item">{props.password}</p>
        </div>
    )
}

export default DataView
