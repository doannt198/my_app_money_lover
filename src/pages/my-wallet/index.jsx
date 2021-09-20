import './index.scss';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from 'react';
import walletService from '../../services/wallet.service';
import CONSTANTS from '../../common/constants';
import { Toast } from 'primereact/toast';
import TransferMoney from '../../components/my-wallet/transfer-money';
import ShareWallet from '../../components/my-wallet/share-wallet';
import AdjustAmount from '../../components/my-wallet/adjust-amount';
import MyWalletList from '../../components/my-wallet/my-wallet-list';
import HeaderComponent from '../../components/header';
import WalletForm from '../../components/wallet/wallet-form';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';
import * as loadingAction from '../../action/loading.action';
import * as walletAction from '../../action/wallet.action';

function MyWallet(props) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [isShowTransferDialog, setIsShowTransferDialog] = useState(false);
    const [typeContentWallet, setTypeContentWallet] = useState(1);
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const toast = useRef(null);
    const [headerDialog, setHeaderDialog] = useState('');
    const [isEditWallet, setIsEditWallet] = useState(false);
    const dispatch = useDispatch();

    const getWallet = () => {
        const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
        walletService.getWalletByAccountId('', accountId, 0, 100)
            .then((response) => {
                setWallets(response.data.Data.Data);
            })
            .catch((error) => {
                console.error('get wallet fail:', error);
            });
    };

    useEffect(() => {
        getWallet();
    }, [])

    const renderDynamicContentDialog = (type) => {
        switch (type) {
            case 1:
                return (
                    <ShareWallet closePopup={() => setDisplayBasic(false)} />
                );
            default:
                return (
                    <AdjustAmount reloadWallets={getWallet} selectedWallet={selectedWallet} closePopup={() => setDisplayBasic(false)} />
                );
        }
    }

    const handleSelectWallet = (wallet) => {
        setIsShowDetail(true);
        setSelectedWallet(wallet);
    }

    const handleDelete = () => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa không?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Có',
            rejectLabel: 'Không',
            accept: () => {
                dispatch(loadingAction.showLoading());
                walletService.deleteWallet(selectedWallet.Id)
                .then(response => {
                    if (response.data.Status == 'success') {
                        getWallet();
                        setIsShowDetail(false);
                        setSelectedWallet(null);
                        dispatch(walletAction.reloadWallet());
                        toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Xóa ví thành công', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Xóa ví thất bại', life: 3000 });
                    }
                    dispatch(loadingAction.hideLoading());
                })
                .catch(error => {
                    dispatch(loadingAction.hideLoading());
                    toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Xóa ví thất bại', life: 3000 });
                })
            },
        });
    }

    return (
        <>
            <HeaderComponent
                center={null}
                right={
                    <div className = "btn-add-transaction"
                    onClick = {() => {setIsEditWallet(true); setSelectedWallet(null)}}>Thêm ví</div>
                }
            ></HeaderComponent>
            <div className={isShowDetail ? "my-wallet active" : "my-wallet"}>
                <MyWalletList handleSelectWallet = {handleSelectWallet} wallets = {wallets}/>
                <div className={isShowDetail ? "my-wallet-right active" : "my-wallet-right"}>
                    <div className="header">
                        <div className="header-left">
                            <img src="./assets/close.svg" alt="close" onClick={() => setIsShowDetail(false)} />
                            <p>Chi tiết</p>
                        </div>
                        <div className="header-right">
                            <div className="button-method">
                                <span className="btn btn-delete" onClick={() => handleDelete()}>Xóa</span>
                                <span className="btn btn-edit" onClick={() => setIsEditWallet(false)}>Sửa</span>
                            </div>
                        </div>
                    </div>
                    <div className="detail-content">
                        <div className="wallet-info">
                            <img src="./assets/wallet.svg" alt="" />
                            <div>
                                <div className="wallet-name">{selectedWallet?.Name}</div>
                                <div className="wallet-currency">{selectedWallet?.InitialAmount?.toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="user">
                            <label>Người dùng</label>
                            <div className="user-info">
                                <img src="./assets/wallet.svg" alt="" />
                                <div>
                                    <div className="user-name">NguyenTienDoan98</div>
                                    <div className="user-email">nguyentiendoanhn09@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="method">
                            <div className="method-item">
                                <input type="checkbox" />
                                <div>
                                    <div className="not-count-total">Không tính vào tổng</div>
                                    <div>Bỏ qua ví này và số dư khỏi "tổng"</div>
                                </div>
                            </div>
                            <div className="method-item">
                                <input type="checkbox" />
                                <div>
                                    <div className="not-count-total">Không tính vào tổng</div>
                                    <div>Bỏ qua ví này và số dư khỏi "tổng"</div>
                                </div>
                            </div>
                        </div>
                        <div className="share">
                            <ul>
                                <li id="share-wallet"
                                    onClick={() => {
                                        setDisplayBasic(true);
                                        setTypeContentWallet(1);
                                        setHeaderDialog('Chia sẻ ví');
                                    }}>Chia sẻ ví</li>
                                <li id="transfer-money"
                                    onClick={() => {
                                        setIsShowTransferDialog(true);
                                        setHeaderDialog('Chuyển tiền');
                                    }}>Chuyển tiền</li>
                                <li id="adjustContent"
                                    onClick={() => {
                                        setDisplayBasic(true);
                                        setTypeContentWallet(3);
                                        setHeaderDialog('Điều chỉnh số dư');
                                    }}>Điều chỉnh số dư</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
            <Dialog header={headerDialog} visible={displayBasic} style={{ width: '500px' }} onHide={() => setDisplayBasic(false)}>
                {renderDynamicContentDialog(typeContentWallet)}
            </Dialog>
            <Dialog header={headerDialog} visible={isShowTransferDialog} style={{ width: '700px' }} onHide={() => setIsShowTransferDialog(false)}>
                {isShowTransferDialog ? <TransferMoney reloadWallets={getWallet} closePopup={() => setDisplayBasic(false)} /> : null }
            </Dialog>
            <Dialog header='Thêm / Sửa ví' visible={isEditWallet} style={{ width: '450px' }} onHide={() => setIsEditWallet(false)}>
               {isEditWallet? <WalletForm
               selectedWallet = {selectedWallet}
               setIsEditWallet = {setIsEditWallet}
               getWallet = {getWallet}
               toast = {toast}
               /> : null}
               
            </Dialog>
         
        </>
    )
}
export default MyWallet;
