

import { useEffect } from 'react';
import { StaticDatas } from '../../common/static-data';
import './index.scss';

function ChooseIconComponent(props) {
    return (
        <>
            <div className="icons">
                {
                    StaticDatas.ICONS.map(icon =>
                    (
                        <div className="icon" key={icon}>
                            <input type="radio" id="icon_1" name="icon" value="icon_1" hidden />
                            <label htmlFor="icon_1" onClick={() => props.chooseIcon( icon)}>
                                <img src={`./assets/items/${icon}`} alt="icon" />
                            </label>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ChooseIconComponent;