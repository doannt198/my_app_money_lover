import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import './index.scss';

function PackageForm(props) {
    const {handleSubmit, selectePackages, setSelectePackages, setIsChooseIcon, setIsEditPackage} = props;
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="edit-package">
                <div className="p-grid">
                    <div className="p-col-12">
                        <span>
                            <RadioButton inputId="income"
                                name="IsIncome"
                                value={true}
                                onChange={(e) => setSelectePackages({ ...selectePackages, IsIncome: true })}
                                checked={selectePackages.IsIncome} />
                            <label htmlFor="income"> Khoản chi</label>
                        </span>
                        <span className="p-ml-2">
                            <RadioButton inputId="outcome"
                                name="IsIncome"
                                value={false}
                                onChange={(e) => setSelectePackages({ ...selectePackages, IsIncome: false })}
                                checked={!selectePackages.IsIncome} />
                            <label htmlFor="outcome"> Khoản thu</label>
                        </span>
                    </div>
                    <div className="p-col-5">
                        <div className="icon-wrapper group" onClick={() => setIsChooseIcon(true)}>
                            <img src={`./assets/items/${selectePackages.Icon}`} alt='icon' className="icon" />
                            <img src="./assets/right-chevron.svg" alt="icon" className="chevron-right" />
                        </div>
                    </div>
                    <div className="p-col-7">
                        <div className="package-name group">
                            <p>Tên nhóm</p>
                            <input type="text" placeholder="Tên nhóm" name="namepackage" value={selectePackages.Name} name="namepackage"
                            onChange={(e) => setSelectePackages({ ...selectePackages, Name: e.target.value })} />
                        </div>
                    </div>
                    <div className="p-col-12 actions">
                        <Button label="Hủy" type = "button" className="p-button-text" onClick = {() => setIsEditPackage()}/>
                        <Button label="Lưu" type="submit" />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PackageForm;