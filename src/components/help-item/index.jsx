import React from 'react';

function HelpItem(props) {
    const{img,title,id}=props
    return (
         <li>
            <input type="radio" id={id} name="filter" />
            <label htmlFor={id}>
                <img src={img} alt={id} />
                <span>{title}</span>
            </label>
         </li>
    );
}

export default HelpItem;