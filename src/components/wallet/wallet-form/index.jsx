import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from 'react';
import ChooseIconComponent from '../../choose-icon';
import ChooseCurrency from '../../choose-currency';
import './index.scss';
import { InputNumber } from 'primereact/inputnumber';
import walletService from '../../../services/wallet.service';
import WalletModel from '../../../models/wallet.model';
import CONSTANTS from '../../../common/constants';
import * as loadingAction from '../../../action/loading.action';
import { useDispatch } from 'react-redux';
import currencyService from '../../../services/currency.service';
import * as walletAction from '../../../action/wallet.action';

function WalletForm(props) {
    const { setIsEditWallet, getWallet, selectedWallet, toast } = props;
    const [selectCurrency, setSelectCurrency] = useState(null);
    const [isChooseIcon, setIsChooseIcon] = useState(false);
    const [isChooseCurrencyUnit, setIsChooseCurrencyUnit] = useState(false);
    const [wallet, setWallet] = useState(new WalletModel());
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedWallet) {
            initWalletDetail();
        }
    }, [selectedWallet])

    const initWalletDetail = async () => {
        const currency = await currencyService.getCurrencyUnitById(selectedWallet.CurrencyId);
        if (currency) {
            setSelectCurrency(currency);
        }
        setWallet({
            id: selectedWallet.Id,
            name: selectedWallet.Name,
            accountId: selectedWallet.accountId,
            initialAmount: selectedWallet.InitialAmount,
            amount: selectedWallet.Amount,
            icon: selectedWallet.Image,
            inComeAmount: selectedWallet.IncomeAmount,
            outComeAmount: selectedWallet.OutComeAmount,
            currencyId: currency.Id || -1
        });
    }

    const handleSubmit = (e) => {
        dispatch(loadingAction.showLoading());
        e.preventDefault();
        if (!wallet.icon) {
            toast.current.show({ severity: 'error', summary: 'Th??ng b??o ', detail: 'Ch???n ???nh', life: 3000 });
            return;
        }
        if (!wallet.currencyId) {
            toast.current.show({ severity: 'error', summary: 'Th??ng b??o ', detail: 'Ch???n ????n v???', life: 3000 });
            return;
        }
        if (!wallet.name) {
            toast.current.show({ severity: 'error', summary: 'Th??ng b??o ', detail: 'Nh???p t??n v??', life: 3000 });
            return;
        }
        const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
        if (!wallet.Id) {
            wallet.accountId = accountId;
        }
        walletService.setWallet(wallet)
            .then(response => {
                if (response.data.Status == 'success') {
                    setIsEditWallet(false);
                    getWallet();
                    dispatch(walletAction.reloadWallet());
                    toast.current.show({ severity: 'success', summary: 'Th??ng b??o ', detail: 'Th??m v?? th??nh c??ng', life: 3000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Th??ng b??o ', detail: 'Th??m v?? th???t b???i', life: 3000 });
                }
                dispatch(loadingAction.hideLoading());
            }).catch(error => {
                console.log(error);
                dispatch(loadingAction.hideLoading());
                toast.current.show({ severity: 'error', summary: 'Th??ng b??o ', detail: 'Th??m v?? th???t b???i', life: 3000 });
            })
    }

    const chooseIcon = (data) => {
        setIsChooseIcon(false);
        setWallet({ ...wallet, icon: data });
    }

    const chooseCurrency = (data) => {
        setIsChooseCurrencyUnit(false);
        setSelectCurrency(data);
        setWallet({ ...wallet, currencyId: data.Id });
    }

    return (
        <div>
            <div className="wallet-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="p-grid">
                        <div className="p-col-5">
                            <div className="icon-wrapper group" onClick={() => setIsChooseIcon(true)}>
                                <label>Ch???n ???nh</label>
                                <div className="icon-image">
                                    <img src={`./assets/items/` + (wallet?.icon || 'icon_142.png')} alt='icon' className="icon" />
                                    <img src="./assets/right-chevron.svg" alt="icon" className="chevron-right" />
                                </div>
                            </div>
                        </div>
                        <div className="p-col-7">
                            <div className="icon-wrapper group">
                                <label>T??n v??</label>
                                <div className="icon-image">
                                    <input placeholder="Nh???p t??n v??" name="name" value={wallet?.name}
                                        onChange={(e) => setWallet({ ...wallet, name: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="p-col-5">
                            <div className="icon-wrapper group" onClick={() => setIsChooseCurrencyUnit(true)}>
                                <label>????n v??? ti???n t???</label>
                                <div className="icon-image">
                                    <img src={selectCurrency?.Image || 'https://static.moneylover.me/img/flag/ic_currency_vnd.png'} alt='icon' className="icon" />
                                    <img src="./assets/right-chevron.svg" alt="icon" className="chevron-right" />
                                </div>
                            </div>
                        </div>
                        <div className="p-col-7">
                            <div className="icon-wrapper group">
                                <label>S??? ti???n</label>
                                <div className="icon-image">
                                    <InputNumber value={wallet?.amount} name="amount"
                                        onValueChange={(e) => setWallet({ ...wallet, amount: e.value })} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12 actions">
                            <Button label="H???y" type="button" className="p-button-text" />
                            <Button label="L??u" type="submit" />
                        </div>
                    </div>
                </form>
                <Dialog header="Ch???n v??" visible={isChooseIcon} style={{ width: '50vw' }}
                    onHide={() => setIsChooseIcon(false)}>
                    <ChooseIconComponent chooseIcon={chooseIcon} ></ChooseIconComponent>
                </Dialog>
                <Dialog header="Ch???n ????n v??? ti???n t???" visible={isChooseCurrencyUnit} style={{ width: '50vw' }}
                    onHide={() => setIsChooseCurrencyUnit(false)}>
                    {isChooseCurrencyUnit ? <ChooseCurrency chooseCurrency={chooseCurrency} ></ChooseCurrency> : null}
                </Dialog>
            </div>
        </div>
    );
}

export default WalletForm;