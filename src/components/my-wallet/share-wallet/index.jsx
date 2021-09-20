import './index.scss';

function ShareWallet(props) {
    const {closePopup} = props;
    return (
        <div id="shareWalletContent" className="modal-content">
            <div className="email">
                <img src="./assets/email.svg" alt="email" />
                <input type="text" placeholder="Email của mọi người mà bạn muốn chia sẻ" />
            </div>
            <div className="message">
                <img src="./assets/message.svg" alt="" />
                <textarea rows={5} placeholder="Tin nhắn" defaultValue={""} />
            </div>
            <div className="button-wrapper">
                <button className="btn btn-cancel" onClick = {() => closePopup()}>Hủy</button>
                <button className="btn btn-save" onClick = {() => closePopup()}>Xong</button>
            </div>
        </div>
    );
}

export default ShareWallet;