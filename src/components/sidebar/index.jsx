import { Link } from 'react-router-dom';
import './index.scss';



function SideBarComponent(props) {

    const sideBars = [
        {
            name: 'Quản lý tài khoản',
            icon: './assets/person.svg',
            alt: 'person',
            path: 'manage-account'
        },
        {
            name: 'Ví của tôi',
            icon: './assets/wallet.svg',
            alt: 'wallet',
            path: 'my-wallet'
        },
        {
            name: 'Nhóm',
            icon: './assets/package.svg',
            alt: 'wallet',
            path: 'package'
        },
        {
            name: 'Liên kết ngân hàng',
            icon: './assets/link.svg',
            alt: 'link',
            path: 'bank-link'
        }
    ]

    const sideBarElm = sideBars.map((sidebar, index) => (
        <li key = {index}>
            <Link to={sidebar.path} onClick = {() => props.closeSideBar()}>
                <img src={sidebar.icon} alt={sidebar.alt} className="icon" />
                <div className="menu-info">
                    <label>{sidebar.name}</label>
                    <img src="./assets/right-chevron.svg" alt="chevron" className="chevron" />
                </div>
            </Link>
        </li>
    ));

    return (
        <div className="sidebar">
            <div className="account-wrapper">
                <div className="logo">
                    <img src="./assets/badge.svg" alt="badge" />
                </div>
                <div className="account-name">
                    NguyenTienDoan98
                </div>
                <div className="account-email">
                    nguyentiendoanhn09@gmail.com
                </div>
            </div>
            <ul className="menu-list">
                {sideBarElm}
            </ul>
        </div>
    )
}

export default SideBarComponent;