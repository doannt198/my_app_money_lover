import './index.scss';
import { Dropdown } from 'primereact/dropdown';
import DataDropdownItem from '../../models/dropdown-item.model';




function CustomDropdown(props) {
    
    const optionTemplate = (option) => {
        return (
            <div className="dropdown-item">
                {option?.Icon ? <img alt={option?.Name} src={`./assets/items/${option?.Icon}`} className={`flag flag-${option?.Id + ''}`} /> : null }
                <div className = "dropdown-detail">
                    <div className = "wallet-name">{option?.Name}</div>
                    <div className = "wallet-amount">{option?.Description}</div>
                </div>
            </div>
        );
    }

    const selectedTemplate = (option, props) => {
        // Nếu có option => Đã chọn => Hiển thị option, ngược lại thì hiển thị place holder
        if (option) {
            return (
                <div className="dropdown-item selected">
                    {option?.Icon ? <img alt={option?.Name} src={`./assets/items/${option?.Icon}`} /> : null}
                    <div className = "wallet-name">{option?.Name}</div>
                </div>
            );
        }
        return (
            <span className = "dropdown-item selected">
                <img alt="image" src='./assets/wallet.png'/>
                <div className = "">{props?.placeholder}</div>
            </span>
        );
    }


    return (
        <>
            <Dropdown
            
                value={props.value}  
                options={props.options}
                onChange={(e) => props.action(e.value)}  
                optionLabel={props.optionLabel}
                filter
                showClear
                filterBy={props.filterBy}
                placeholder={props.placeholder}
                valueTemplate={selectedTemplate}
                itemTemplate={optionTemplate} />
        </>
    );
}

export default CustomDropdown;