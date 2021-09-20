import { useEffect, useState } from 'react';
import './index.scss';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import HeaderComponent from '../../components/header';
import CustomDropdown from '../../components/custom-dropdown';
import DataDropdownItem from '../../models/dropdown-item.model';
import { Button } from 'primereact/button';
function BudgetPage() {
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [dateRanges, setDateRanges] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setWallets(
            [
                { Id: 0, Name: 'Tiền cũ', Icon: 'wallet.png', Description: '025' },
                { Id: 1, Name: 'Tiền của Tano', Icon: 'wallet.png', Description: '54687' }
            ]
        );
        setDateRanges(
            [
                { Id: 0, Name: 'Tuần này', Icon: '', Description: '26/07/2021 - 01/08/2021' },
                { Id: 0, Name: 'Tháng này', Icon: '', Description: '01/07/2021 - 30-09-2021' },
                { Id: 0, Name: 'Quý này', Icon: '', Description: '01/07/2021 - 30/09/2021' },
                { Id: 0, Name: 'Năm nay', Icon: '', Description: '01/01/2021 - 31/12/2021' },
                { Id: 0, Name: 'Tuần này', Icon: '', Description: '26/07/2021 - 01/08/2021' }
            ]
        );
    }, []);

    return (
        <>
            <HeaderComponent
                center={null}
                right={
                    <Button label="Thêm ngân sách" onClick={() => setIsShowForm(true)} />
                }
            ></HeaderComponent>

            <div className={isShowDetail ? "budget active" : "budget"}>
                <div className="budget-left">
                    <TabView className="tabview-custom">
                        <TabPanel header="Đang áp dụng">
                            <div className="buget-list">
                                <div className="buget-item">
                                    <div className="buget-date">
                                        <div className="date-time">
                                            <div className="date-range">
                                                01/07/2021 - 31/07/2021
                                            </div>
                                            <div className="date-remain">
                                                Còn 13 ngày
                                            </div>
                                        </div>
                                        <div className="date-amount">
                                            <div className="amount">10,000</div>
                                            <div className="amount-remain">
                                                Còn lại 9,999
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buget-content" onClick={() => setIsShowDetail(true)}>
                                        <div className="content-image">
                                            <img src="./assets/items/icon_2.png" alt="" />
                                        </div>
                                        <div className="content-body">
                                            <div className="content-title">
                                                <div>Ăn uống</div>
                                                <div>
                                                    <div>10,000</div>
                                                    <div>Còn lại 9,999</div>
                                                </div>
                                            </div>
                                            <div className="content-time-line">
                                                <div className="time-line" />
                                                <div className="today">
                                                    today
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buget-item">
                                    <div className="buget-date">
                                        <div className="date-time">
                                            <div className="date-range">
                                                01/07/2021 - 31/07/2021
                                            </div>
                                            <div className="date-remain">
                                                Còn 13 ngày
                                            </div>
                                        </div>
                                        <div className="date-amount">
                                            <div className="amount">10,000</div>
                                            <div className="amount-remain">
                                                Còn lại 9,999
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buget-content" onClick={() => setIsShowDetail(true)}>
                                        <div className="content-image">
                                            <img src="./assets/items/icon_3.png" alt="" />
                                        </div>
                                        <div className="content-body">
                                            <div className="content-title">
                                                <div>Đi lại</div>
                                                <div>
                                                    <div>10,000</div>
                                                    <div>Còn lại 9,999</div>
                                                </div>
                                            </div>
                                            <div className="content-time-line">
                                                <div className="time-line" />
                                                <div className="today">
                                                    today
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="add-more">
                                    Thêm ngân sách tất cả các khoản cho giai đoạn này
                                </a>
                            </div>
                        </TabPanel>
                        <TabPanel header="Đã kết thúc">
                            <div className="transaction-empty">
                                <div className="smile all">^_^</div>
                                <div className="tips">
                                    Không có ngân sách nào
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
                <div className={isShowDetail ? "budget-right active" : "budget-right"}>
                    <div className="header">
                        <div className="header-left">
                            <img src="./assets/close.svg" alt="close" onClick={() => setIsShowDetail(false)} />
                            <p>Chi tiết</p>
                        </div>
                        <div className="header-right">
                            <div className="button-method">
                                <span className="btn btn-delete">Xóa</span>
                                <span className="btn btn-edit">Sửa</span>
                            </div>
                        </div>
                    </div>
                    <div className="detail-content">
                        <div className="detail-icon">
                            <img src="./assets/items/icon_5.png" alt="" />
                        </div>
                        <div className="detail-info">
                            <div className="bugdet-name">
                                Mua sắm
                            </div>
                            <div className="name-account">
                                Tiền của Tano
                            </div>
                            <div className="text-small">
                                Còn 13 ngày
                            </div>
                            <div className="text-sma">
                                Còn lại
                            </div>
                            <div className="total-amount">
                                9,99
                            </div>
                            <div className="suggest">
                                <div>
                                    <div className="text-small">Đã chi</div>
                                    <span>534</span>
                                </div>
                                <div>
                                    <div className="text-small">Dự kiến chi tiêu</div>
                                    <span>413</span>
                                </div>
                                <div>
                                    <div className="text-small">Nên chi hàng tháng</div>
                                    <span>123</span>
                                </div>
                                <div>
                                    <div className="text-small">Thực tế chi tiêu hàng ngày</div>
                                    <span>1234</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-chart">
                        <img src="./assets/budget/chart.PNG" alt="chart" />
                    </div>
                    <div className="view-more" onClick={() => setIsShowDialog(true)}>
                        Xem danh sách giao dịch
                    </div>
                </div>

                <Dialog header="Thêm" visible={isShowForm} style={{ width: '40vw' }} onHide={() => setIsShowForm(false)}>
                    <div className="buget-form">
                        <div className="p-grid">
                            <div className="p-col-6">
                                <div className="form-input-group">
                                    <label>Ví</label>
                                    <div className="select-item">
                                        <CustomDropdown
                                            value={selectedWallet}
                                            options={wallets}
                                            action={setSelectedWallet}
                                            filterBy="Name"
                                            optionLabel="Name"
                                            placeholder="Chọn ví"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-6">
                                <div className="form-input-group">
                                    <label>Nhóm</label>
                                    <div className="select-item">
                                        <CustomDropdown
                                            value={selectedWallet}
                                            options={wallets}
                                            action={setSelectedWallet}
                                            filterBy="Name"
                                            optionLabel="Name"
                                            placeholder="Chọn nhóm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-6">
                                <div className="form-input-group">
                                    <label>Số tiền</label>
                                    <div className="select-item">
                                        <input type="number" defaultValue={0} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-6">
                                <div className="form-input-group">
                                    <label>Ngày</label>
                                    <div className="select-item">
                                        <CustomDropdown
                                            value={selectedDate}
                                            options={dateRanges}
                                            action={setSelectedDate}
                                            filterBy="Name"
                                            optionLabel="Name"
                                            placeholder="Chọn ngày"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-12 text-align-right">
                            <Button label="Hủy" className="p-button-text" />
                            <Button label="Lưu" />
                            </div>
                        </div>
                    </div>
                </Dialog>

                <Dialog header="Mua sắm" visible={isShowDialog} style={{ width: '50vw' }} onHide={() => setIsShowDialog(false)}>
                    <div className="transaction-detail">
                        <div className="header">
                            <div className="income">
                                <div className="title">Tiền vào</div>
                                <div className="amount">+250</div>
                            </div>
                            <div className="outcome">
                                <div className="title">Tiền ra</div>
                                <div className="amount">-102</div>
                            </div>
                        </div>
                        <div className="transaction-list">
                            <div className="transaction-item">
                                <div className="buget-item">
                                    <div className="buget-date">
                                        <div className="date-time">
                                            <div className="date-range">
                                                01/07/2021 - 31/07/2021
                                            </div>
                                            <div className="date-remain">
                                                Còn 13 ngày
                                            </div>
                                        </div>
                                        <div className="date-amount">
                                            <div className="amount">10,000</div>
                                            <div className="amount-remain">
                                                Còn lại 9,999
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buget-content" onClick={() => setIsShowDetail(true)}>
                                        <div className="content-image">
                                            <img src="./assets/items/icon12.png" alt="" />
                                        </div>
                                        <div className="content-body">
                                            <div className="content-title">
                                                <div>Mua sắm</div>
                                                <div>
                                                    <div>10,000</div>
                                                    <div>Còn lại 9,999</div>
                                                </div>
                                            </div>
                                            <div className="content-time-line">
                                                <div className="time-line" />
                                                <div className="today">
                                                    today
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>
        </>
    )
}
export default BudgetPage;
