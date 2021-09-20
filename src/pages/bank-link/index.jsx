import { useState } from 'react';
import { useEffect } from 'react';
import bankService from '../../services/bank.service';
import * as loadingAction from '../../action/loading.action';
import './index.scss';
import { useDispatch } from 'react-redux';

function BankLink() {
    const [banks, setBanks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadingAction.showLoading());
        bankService.getBanks('', 0, 1000)
        .then(response => {
            setBanks(response.data.Data.Data);
            dispatch(loadingAction.hideLoading());
        })
        .catch(error => {
            console.log(error);
            dispatch(loadingAction.hideLoading());
        })
    }, []);

    return (
        <div className="bank">
            <div className="bank-input">
                <input type="text" placeholder="Tìm kiếm..."/>
            </div>
            <div className="bank-list">
                {
                    banks.map(bank => (
                        <div className="bank-item">
                            <img src={bank?.Icon} alt="icon" className="image" placeholder="icon" />
                            <div className="name">{bank?.Name}</div>
                            <div className="country">{bank?.CountryCode}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default BankLink;
