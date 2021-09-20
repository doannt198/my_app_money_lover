import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import walletService from '../../../services/wallet.service';
import './index.scss';
import { InputNumber } from 'primereact/inputnumber'
function AdjustAmount(props) {
    const { closePopup, selectedWallet, reloadWallets} = props;
    const [adjustAmount, setAdjustAmount] = useState(0);
    const toast = useRef(null);
    useEffect(() => {
        if (selectedWallet) {
            setAdjustAmount(selectedWallet.InitialAmount);
        }
    }, [selectedWallet]);

    const handleAdjustAmount = (e) => {
        e.preventDefault();
        walletService.updateAmount(selectedWallet.Id, adjustAmount).then(response => {
            if (response.data.Status == 'error') {
                toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: response.Error, life: 3000 });
            } else {
                toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Cập nhật thành công!', life: 3000 });
                closePopup();
                reloadWallets();
            }
        })
            .catch(eror => {
                toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Cập nhật thất bại', life: 3000 });
            })
    }

    return (
        <div>
            <div id="adjustAmountContent" className="modal-content">
                <form className="content" onSubmit={(e) => handleAdjustAmount(e)}>
                    <div className="wallet">
                        <label>Ví</label>
                        <div className="wallet-right">
                            <img src={"./assets/" + selectedWallet?.Icon} alt="icon" className="wallet-icon" />
                            <div className="wallet-content">
                                <label>{selectedWallet?.Name}</label>
                                <img src="./assets/right-chevron.svg" alt="" className="chevron-right" />
                            </div>
                        </div>
                    </div>
                    <div className="amount">
                        <label>Nhập số dư hiện tại của ví</label>
                        <div>
                            <InputNumber style={{width: '100%'}} value={adjustAmount} name="adjustAmount"
                                onChange={(e) => setAdjustAmount(+e.target.value)}/>
                        </div>
                    </div>
                    <div className="not-for-report">
                        <input type="checkbox" />
                        <div>
                            <div className="title">Không tính vào báo cáo</div>
                            <div className="description">Bỏ qua ví này và số dư khỏi tổng</div>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <button className="btn btn-cancel" type="button" onClick={() => closePopup()}>Hủy</button>
                        <button className="btn btn-cancel" type="submit">Xong</button>
                    </div>
                </form>
            </div>
            <Toast ref={toast} />
        </div>
    );
}

export default AdjustAmount;