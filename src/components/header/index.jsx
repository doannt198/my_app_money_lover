import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from '../../common/constants';
import WalletService from '../../services/wallet.service';
import './index.scss';
import * as walletAction from '../../action/wallet.action';
import walletService from '../../services/wallet.service';

function HeaderComponent(props) {
    const [isShowWallet, setIsShowWallet] = useState(false);
    const [wallets, setWallets] = useState([]);
    const refreshWallets = useSelector(state => state.wallet.reload);
    const walletActive = useSelector(state => state.wallet.walletActive);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [refreshWallets]);

    const fetchData = () => {
        getWallet();
    }

    const getWallet = () => {
        const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
        const walletActiveId = localStorage.getItem(CONSTANTS.WALLET_ACTIVE); // Lấy ra wallet đã chọn ở những lần trước
        WalletService.getWalletByAccountId('', accountId, 0, 10000).then(response => {
            setWallets(response.data.Data.Data);
            if (walletActiveId) {
                // Chọn lại ví đã chọn trước kia
                const walletActive = response.data.Data.Data.find(t => t.Id == walletActiveId);
                if (walletActive) {
                    dispatch(walletAction.setActiveWallet(walletActive));
                }
            } else if (response.data && response.data.Data.Data.length > 0) {
                // Ngược lại nếu chưa chọn, thì xem trả về mà có ví thì chọn ví đầu tiên
                dispatch(walletAction.setActiveWallet(response.data.Data.Data[0]));
                localStorage.setItem(CONSTANTS.WALLET_ACTIVE, response.data.Data.Data[0].Id)
            }
        }).catch(error => {
            console.log("error", error)
        });
    }

    const handleSelectWallet = (wallet) => {
        setIsShowWallet(false);
        localStorage.setItem(CONSTANTS.WALLET_ACTIVE, wallet.Id)
        dispatch(walletAction.setActiveWallet(wallet))
    }

    const showWalletItem = wallets.map((wallet) => {
        return (
            <div className="wallet-item detail" key={wallet?.Id}
                 onClick={() => handleSelectWallet(wallet)}>
                <img src={`./assets/items/${wallet?.Icon}`} alt="wallet" />
                <div>
                    <div className="wallet-item--name">{wallet?.Name}</div>
                    <div className="wallet-item--amount">{wallet?.Amount?.toLocaleString()}</div>
                </div>
            </div>
        )
    });


    return (
        <div className="header-wrapper">
            <div className="header-left">
                <div className="wallet-wrapper">
                    <div className="wallet-image">
                        <img src="./assets/wallet.png" alt="wallet" />
                    </div>
                    <div className="wallet-info" onClick={() => setIsShowWallet(!isShowWallet)}>
                        <div className="wallet-name">
                            {walletActive?.Name}
                            <img src="./assets/down-chevron.svg" alt="" />
                        </div>
                        <div className="wallet-amount">
                            {walletActive?.Amount?.toLocaleString()}
                        </div>
                        <div className={isShowWallet ? "wallet-list active" : "wallet-list"} id="wallets">
                            {/* <div className="wallet-item title">
                                <span>Chọn ví</span>
                            </div>
                            <div className="wallet-item detail" onClick={() => setIsShowWallet(false)}>
                                <img src="./assets/global.png" alt="global" />
                                <div>
                                    <div className="wallet-item--name">Tổng cộng</div>
                                    <div className="wallet-item--amount">0</div>
                                </div>
                            </div> */}
                            <div className="wallet-item">
                                <span>Tính vào tổng</span>
                            </div>
                            {showWalletItem}
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-center">
                {props.center}
            </div>
            <div className="header-right">
                {props.right}
            </div>
        </div>
    );
}

export default HeaderComponent;