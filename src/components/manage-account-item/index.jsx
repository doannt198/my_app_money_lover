import React from 'react';

function ManageAccountItem(props) {
    const { id, img, alt, title, orther, time, handleDelete } = props
    return (
        <li onClick = {() => handleDelete(id)}>
            <img src={img} alt={alt} />
            <div className="device-info">
                <div>{title}</div>
                <small>{time}</small>
                {orther}
            </div>
        </li>

    );
}

export default ManageAccountItem;