import './index.scss';
import { Calendar } from 'primereact/calendar';
import { useEffect, useRef, useState } from 'react';
import CONSTANTS from '../../../common/constants';
import walletService from '../../../services/wallet.service';
import packageService from '../../../services/package.service';
import FilterModel from '../../../models/filter.model';
import CustomDropdown from '../../custom-dropdown';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber'

function TransferMoney(props) {
    const [wallets, setWallets] = useState([]);
    const [packages, setPackages] = useState([]);
    const [selectedWalletFrom, setSelectedWalletFrom] = useState(null);
    const [selectePackageFrom, setSelectePackageFrom] = useState(null);
    const [selectedWalletTo, setSelectedWalletTo] = useState(null);
    const [selectePackageTo, setSelectePackageTo] = useState(null);
    const [note, setNote] = useState('');
    const [createDate, setCreateDate] = useState(null);
    const [amount, setAmount] = useState(0);
    const toast = useRef(null);
    const {reloadWallets, closePopup} = props;

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        getWallet();
        getPackage();
    }

    const getWallet = () => {
        const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
        walletService.getWalletByAccountId('', accountId, 0, 10000)
            .then((response) => {
                const data = response.data.Data.Data.map((wallet) => {
                    return {
                        Id: wallet.Id,
                        Name: wallet.Name,
                        Icon: wallet.Icon,
                        Description: ''
                    }
                })
                setWallets(data);
            })
            .catch((error) => {
                console.error('get wallet fail:', error);
            });
    };

    const getPackage = () => {
        let filterModel = new FilterModel();
        filterModel.pageSize = 1000;
        packageService
            .getPackages(filterModel)
            .then((response) => {
                const data = response.data.Data.Data.map((pack) => {
                    return {
                        Id: pack.Id,
                        Name: pack.Name + (pack.IsIncome ? ' (+)' : ' (-)'),
                        Icon: pack.Icon,
                        Description: ''
                    }
                })
                setPackages(data);
            })
            .catch((error) => {
                console.error("error:", error)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedWalletFrom || !selectedWalletTo || !selectePackageFrom || !selectePackageTo || !amount || !createDate) {
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Chọn đủ thông tin', life: 3000 });
            return;
        }
        if (selectedWalletFrom.Id == selectedWalletTo.Id) {
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Chọn ví khác nhau', life: 3000 });
            return;
        }
        if (selectePackageFrom.IsIncome != selectePackageTo.IsIncome) {
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Chọn nhóm cùng loại', life: 3000 });
            return;
        }
        const dataSave = {
            walletFromId: selectedWalletFrom.Id,
            packageFromId: selectePackageFrom.Id,
            walletToId: selectedWalletTo.Id,
            packageToId: selectePackageTo.Id,
            accountId: sessionStorage.getItem(CONSTANTS.USER_ID) || '',
            note: note,
            date: createDate,
            amount: amount
        };
        walletService.transferWallet(dataSave).then(response => {
            toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Chuyển tiền thành công', life: 3000 });
            reloadWallets();
            closePopup();
        })
        .catch(error => {
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Chuyển tiền thất bại', life: 3000 });
        })
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} id="transferMoneyContent" className="modal-content">
                <div className="content">
                    <div className="title">
                        Từ
                    </div>
                    <div className="group">
                        <div className="item">
                            <label>Ví</label>
                            <div className="item-content">
                                <CustomDropdown
                                    value={selectedWalletFrom}
                                    options={wallets}
                                    action={setSelectedWalletFrom}
                                    filterBy="Name"
                                    optionLabel="Name"
                                    placeholder="Chọn ví"
                                />
                            </div>
                        </div>
                        <div className="item">
                            <label>Nhóm</label>
                            <div className="item-content">
                                <CustomDropdown
                                    value={selectePackageFrom}
                                    options={packages}
                                    action={setSelectePackageFrom}
                                    filterBy="Name"
                                    optionLabel="Name"
                                    placeholder="Chọn gói"
                                />
                            </div>
                        </div>
                        <div className="item">
                            <label>Số tiền</label>
                            <div className="item-content">
                                <div className="right">
                                    <InputNumber style={{width: '100%'}} name = "amount" value={amount}
                                    onChange={(e) => setAmount(e.target.value)} className="money"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="title"> Đến </div>
                    <div className="group">
                        <div className="item">
                            <label>Ví</label>
                            <div className="item-content">
                                <CustomDropdown
                                    value={selectedWalletTo}
                                    options={wallets}
                                    action={setSelectedWalletTo}
                                    filterBy="Name"
                                    optionLabel="Name"
                                    placeholder="Chọn ví"
                                />
                            </div>
                        </div>
                        <div className="item">
                            <label>Nhóm</label>
                            <div className="item-content">
                                <CustomDropdown
                                    value={selectePackageTo}
                                    options={packages}
                                    action={setSelectePackageTo}
                                    filterBy="Name"
                                    optionLabel="Name"
                                    placeholder="Chọn gói"
                                />
                            </div>
                        </div>
                        <div className="item">
                            <label>Ngày</label>
                            <div className="item-content">
                                <div className="right">
                                    <Calendar id="icon" showIcon value={createDate} onChange={(e) => setCreateDate(e.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group">
                        <div className="item item-note">
                            <label>Ghi chú</label>
                            <div>
                                <input name="note" value={note} onChange={(e) => setNote(e.target.value)}
                                    type="text" placeholder="Nội dung ghi chú" />
                            </div>
                        </div>
                    </div>
                    <div className="count-to-report">
                        <input type="checkbox" />
                        <div>
                            <p className="title">Không tính vào báo cáo</p>
                            <p className="description">Các giao dịch này sẽ được loại khỏi báo cáo ở cả hai ví</p>
                        </div>
                    </div>
                    <div className="add-fee-transfer">
                        <input type="checkbox" />
                        <div>
                            <p className="title">Thêm phí chuyển khoán</p>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <button className="btn btn-cancel" onClick = {() => closePopup()} type = "button">Hủy</button>
                        <button className="btn btn-success" type = "submit">Xong</button>
                    </div>
                </div>
            </form>
            <Toast ref={toast} />
        </div>
    )
}

export default TransferMoney;