import MyWalletItem from '../../my-wallet/my-wallet-item';
import './index.scss';

function MyWalletList(props) {
    const { handleSelectWallet, wallets } = props;
    return (
        <div className="my-wallet-left">
            <div className="wallet-list">
                {
                    wallets.map((wallet, index) => {
                        return (
                            <div className="wallet-item" key={index}
                                onClick={() => handleSelectWallet(wallet)}>
                                <MyWalletItem
                                    title="Tính vào tổng"
                                    img={"./assets/items/" + wallet?.Icon}
                                    alt="wallet"
                                    moneytitle={wallet?.Name}
                                    money={wallet?.InitialAmount}
                                >
                                </MyWalletItem>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MyWalletList;