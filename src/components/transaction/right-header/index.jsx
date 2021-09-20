function TransactionRightHeader(props) {
    return (
        <div className="method">
            <div className="method-item">
                <img src="./assets/date.svg" alt="date" />
            </div>
            <div className="method-item">
                <img src="./assets/time.svg" alt="time" />
            </div>
            <div className="method-item">
                <img src="./assets/search.svg" alt="search" />
            </div>
            <div className="method-item">
                <div onClick = {() => props.addTransaction()} className="btn btn-add-transaction">Thêm giao dịch</div>
            </div>
        </div>
    );
}

export default TransactionRightHeader;