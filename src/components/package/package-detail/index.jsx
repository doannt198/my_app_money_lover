import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import './index.scss';

function PackageDetail(props) {
    const { setIsShowDetail, handleDelete, handleEdit, setIsEditPackage, packageModel} = props;
    return (
        <div className="package-detail">
            <div className="header">
                <div className="header-left">
                    <img src="./assets/close.svg" alt="close" className="closeIcon"
                         onClick={() => setIsShowDetail(false)} />
                    <p>Chi tiết</p>
                </div>
                <div className="header-right">
                    <div className="button-method">
                        <Button label="Xóa" className="p-button-danger p-button-text"
                                onClick={() => handleDelete()} />
                        <Button label="Sửa" className="p-button-success p-button-text"
                                onClick={() => handleEdit()} />
                    </div>
                </div>
            </div>
            <div className="detail-content">
                <img src={`./assets/items/${packageModel?.Icon}`} alt="icon" />
                <div>
                    <div className="title">{packageModel.Name}</div>
                    <div className="wallet-name">Tiền của Tano</div>
                    {
                        packageModel?.IsIncome ?
                            <Badge value="Khoản chi" severity="danger">Khoản chi</Badge> :
                            <Badge value="Khoản thu" severity="default">Khoản thu</Badge>
                    }
                </div>
            </div>
            <div className="package-group" onClick={() => setIsEditPackage(true)}>
                Ghép nhóm
            </div>
        </div>
    );
}

export default PackageDetail;