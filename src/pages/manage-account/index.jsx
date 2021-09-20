import './index.scss';
import authService from '../../services/auth.service';
import deviceService from '../../services/device.service';
import { useHistory } from 'react-router-dom';
import ManageAccountItem from '../../components/manage-account-item';
import CONSTANTS from '../../common/constants';
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from 'react';
function ManageAccountPage() {
    const history = useHistory();
    const toast = useRef(null);
    const [devices, setDevices] = useState([]);
    const logout  = () => {
        authService.logout();
        history.push('/login');
    }

    useEffect(() => {
        getDevices();
    }, [])

    const getDevices = () => {
        const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
        deviceService.getDevices('', accountId, 0, 100).then(response => {
            setDevices(response.data.Data.Data);
        })
    }

    const handleDelete = (deviceId) => {
        deviceService.deleteDevice(deviceId).then(response => {
            toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Xóa thành công', life: 3000 });
            const deleteIndex = devices.findIndex(t => t.Id == deviceId);
            if (deleteIndex != -1) {
                devices.splice(deleteIndex, 1);
            }
        })
        .catch(error => {
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Xoát thất bại', life: 3000 });
        })
    }
    
    return (
        <>
            <Toast ref={toast} />
            <div className="manage-account">
                <div className="manage-account-header">
                    <img src="./assets/close.svg" alt="close" className="icon-close" />
                    <h2>Quản lý tài khoản</h2>
                    <div onClick = {() => logout()} className="btn btn-logout">Đăng xuất</div>
                </div>
                <div className="manage-account-account">
                    <div className="level">
                        <img src="./assets/badge.svg" alt="" />
                    </div>
                    <div className="info">
                        <div className="info-name">NguyenTienDoan98</div>
                        <div className="info-email">nguyentiendoanhn09@gmail.com</div>
                    </div>
                </div>
                <div className="manage-account-upgrade">
                    <div className="background" />
                    <div className="content">
                        <label>Nâng cấp để sử dụng tính năng cao cấp</label>
                        <button className="btn btn-upgrade">Xem tùy chọn nâng cấp</button>
                    </div>
                </div>
                <div className="devices">
                    <div className="title">Thiết bị (5/5)</div>
                    <ul>
                        <li>
                            <img src="./assets/android.svg" alt="android" />
                            <div className="device-info">
                                <div>
                                    <div>Web browser</div>
                                    <div>Thiết bị này</div>
                                </div>
                            </div>
                        </li>
                        {
                            devices.map((item, index) => {
                                return (
                                    <ManageAccountItem
                                    img ="./assets/android.svg"
                                    alt="android"
                                    key = {index}
                                    id = {item?.Id}
                                    time = {item?.CreateDate}
                                    title= {item?.Name}
                                    handleDelete = {handleDelete}
                                    orther={<img src="./assets/close.svg" alt="" />}
                                    ></ManageAccountItem>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="remove-account">
                    Xóa tài khoản
                </div>
            </div>
        </>
    )
}
export default ManageAccountPage;
