import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import currencyUnitService from '../../services/currency.service';
import './index.scss';
import * as loadingAction from '../../action/loading.action';

function ChooseCurrency(props) {
    const { chooseCurrency } = props;
    const [currencyUnits, setCurrencyUnits] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getCurrencyUnit();
    }, []);

    const getCurrencyUnit = () => {
        dispatch(loadingAction.hideLoading());
        currencyUnitService.getCurrencyUnits('', 0, 10000).then(response => {
            setCurrencyUnits(response.data.Data.Data);
            dispatch(loadingAction.hideLoading());
        })
            .catch(error => {
                console.log('getCurrencyUnit: ', error);
                dispatch(loadingAction.hideLoading());

            })
    }

    return (
        <>
            <div className="icons">
                {
                    currencyUnits.map(icon =>
                    (
                        <div className="icon" key={icon.Id}>
                            <input type="radio" id={icon.Id} name="icon" value={icon.Id} hidden />
                            <label htmlFor={icon.Id}>
                                <img src={icon.Image} alt="icon" onClick={() => chooseCurrency(icon)} />
                                <div className="title">{icon?.Code}</div>
                            </label>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ChooseCurrency;

