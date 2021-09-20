import React from 'react';

function MyWalletItem(props) {
  
    const{title,img,alt,moneytitle,money}=props
    return (
        <div>
        <div className="title">{title}</div>
            <div className="wallet-item--content">
                <img src={img} alt={alt} className = "icon"/>
                <div>
                    <div>{moneytitle}</div>
                    <div>{money?.toLocaleString()}</div>
                </div>
            </div>
         </div>
    );
}

export default MyWalletItem;