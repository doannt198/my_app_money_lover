import { useEffect, useRef, useState } from "react";
import HeaderComponent from "../../components/header";
import "./index.scss";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import TransactionRightHeader from "../../components/transaction/right-header";
import { Button } from "primereact/button";
import CustomDropdown from "../../components/custom-dropdown";
import { Toast } from "primereact/toast";
import { Link, useHistory } from "react-router-dom";
import WalletService from "../../services/wallet.service";
import FilterModel from "../../models/filter.model";
import packageService from "../../services/package.service";
import TransactionService from "../../services/transaction.service";
import transactionService from "../../services/transaction.service";
import CONSTANTS from "../../common/constants";
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch, useSelector } from "react-redux";
import * as walletAction from '../../action/wallet.action';
import * as loadingAction from '../../action/loading.action';
function TransactionPage() {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectePackage, setSelectePackage] = useState(null);
  const [packageList, setPackageList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [createDate, setCreateDate] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const toast = useRef(null);
  const [activeTime, setActiveTime] = useState({ month: (new Date()).getMonth(), year: (new Date()).getFullYear() });
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalOutcountAmount, setTotalOutcountAmount] = useState(0);
  const [dateRange, setDateRange] = useState([]);
  const [exportReport, setExportReport] = useState(false);
  const [withPerson, setWithPerson] = useState('');
  const walletActive = useSelector(state => state.wallet.walletActive);

  const dispatch = useDispatch();
  useEffect(() => {
    initDateRange();
    fetchData();
  }, []);

  const initDateRange = () => {
    const date = new Date();
    const month = date.getMonth() + 1; // Tháng tăng lên 1 mới ra tháng hiện tại do getMonth bắt đầu từ 0
    const year = date.getFullYear();
    const currentTime = { month, year, active: true };
    const prevTime = { month:month - 1, year, active: false };
    const nextTime = { month: month + 1, year, active: false };
    setDateRange([prevTime, currentTime, nextTime]);
    setActiveTime({ month, year });
  }

  useEffect(() => {
    if (walletActive) {
      getTransactionList(activeTime.month, activeTime.year, walletActive.Id);
    }
  }, [dateRange, walletActive, activeTime])

  const chooseTime = (month, year) => {
    const currentTime = { month, year, active: true };
    const prevTime = { month: month - 1, year, active: false };
    const nextTime = { month: month + 1, year, active: false };
    setDateRange([prevTime, currentTime, nextTime]);
    setActiveTime({ month, year });
  }

  
  const addTransaction = () => {
    resetValue();
    setIsShowAdd(true);
  };

  const resetValue = () => {
    setSelectedWallet(null);
    setSelectePackage(null);
    setAmount(0);
    setCreateDate(null);
    setNote('');
  }

  const fetchData = () => {
    getWallet();
    getPackage();
  }

  // Nhóm theo ngày. Vì trong từng ngày có thể xuất hiện nhiều giao dịch.
  // Chỉ hiện NGày 1 lần còn các giao dịch nhóm thành 1 nhóm
  const convertJsonToStructTree = (list) => {
    const result = [];
    let income = 0, outcome = 0;
    list.forEach(item => {
      const newItem = result.find(t => t.date == item.date);
      if (item.IsIncome) {
        income += item.Amount;
      } else {
        outcome += item.Amount;
      }
      if (newItem) {
        newItem.childs.push(item);
        newItem.totalMoney += item.IsIncome ? item.Amount : -item.Amount;
      } else {
        result.push({
          date: item.date,
          month: item.month,
          year: item.year,
          day: item.day,
          totalMoney: item.IsIncome ? item.Amount : -item.Amount,
          childs: [item]
        });
      }
    })
    setTotalIncomeAmount(income);
    setTotalOutcountAmount(outcome);
    setTransactions(result);
    dispatch(loadingAction.hideLoading());
  }

  const getTransactionList = (month = '', year = '', walletId = '') => {
    dispatch(loadingAction.showLoading());
    const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
    TransactionService.getTransactions('', month, year, accountId, walletId, 0, 10000)
      .then((response) => {
        const transactions = response.data.Data.Data.map(tran => {
          const createAt = new Date(tran.CreateAt);
          return {
            ...tran,
            day: createAt ? createAt.getDay() + 1 : '',
            date: createAt ? createAt.getDate() : '',
            month: createAt ? createAt.getMonth() + 1 : '',
            year: createAt ? createAt.getFullYear() : ''
          }
        });
        convertJsonToStructTree(transactions);
      })
      .catch((error) => {
        console.log('Get transaction list fail');
        dispatch(loadingAction.hideLoading());
      });
  };

  const showTransactionItem = transactions.map((trans) => {
    return (
      <div className="transaction-item" key={trans.Id} >
        <div className="transaction-header">
          <div className="date-view">
            <div className="view-day">{trans?.date}</div>
            <div className="view-date">
              <div className="day">Thứ {trans?.day} </div>
              <div className="months">tháng {trans?.month} {trans?.year}</div>
            </div>
          </div>
          <div className="amount-view">
            <div className="amount">
              {trans?.totalMoney?.toLocaleString()}
            </div>
          </div>
        </div>
        {
          trans.childs.map(item => (
            <div className="transaction-detail"
              onClick={() => {
                setIsShowDetail(true);
                setSelectedTransaction(item);
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }} >
              <div className="item">
                <div className="item-image">
                  <img src={`./assets/items/${item?.Image}`} alt="icon" />
                </div>
                <div className="title">
                  <div className="title-top">{item?.PackageName}</div>
                  <div className="title-bot">{item?.Note}</div>
                </div>
                <div className={item.IsIncome ? "amount income" : "amount"}>
                  {item?.Amount?.toLocaleString()}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  });


  const getWallet = () => {
    const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
    WalletService.getWalletByAccountId('', accountId, 0, 10000)
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
        setPackageList(data);
      })
      .catch((error) => {
        console.error("error:", error)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedWallet == null) {
      toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Chọn ví', life: 3000 });
      return;
    }
    if (selectePackage == null) {
      toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Chọn gói', life: 3000 });
      return;
    }
    if (amount <= 0) {
      toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Nhập tiền', life: 3000 });
      return;
    }
    const dataSave = {
      Id: "",
      name: "string",
      amount: +amount,
      createAt: createDate.toUTCString() || new Date(),
      exportReport: exportReport,
      note: note,
      remind: false,
      image: selectePackage.Icon,
      campaign: "",
      "latitude": 0,
      "longtitude": 0,
      accountId: sessionStorage.getItem(CONSTANTS.USER_ID),
      packageId: selectePackage.Id,
      "editByUserId": "",
      with: withPerson,
      "metadata": "",
      walletId: selectedWallet.Id
    }
    transactionService.createorEditTransactions(dataSave).then(response => {
      setIsShowAdd(false);
      toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Thêm giao dịch thành công ', life: 3000 });
      resetValue();
      getTransactionList();
      setIsShowDetail(false);
      dispatch(walletAction.reloadWallet());
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleDelete = () => {
    TransactionService.deleteTransaction(selectedTransaction.Id).then(response => {
      setIsShowDetail(false);
      toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Xóa giao dịch thành công ', life: 3000 });
      setSelectedTransaction(null);
      getTransactionList(activeTime.month, activeTime.year, walletActive.Id);
    }).catch(error => {
      console.error("error delete:", error);
    })
  }

  const handleEdit = () => {
    const walletSelected = wallets.find(t => t.Id == selectedTransaction.WalletId)
    const packageSelected = packageList.find(t => t.Id == selectedTransaction.PackageId)
    setSelectedWallet(walletSelected);
    setSelectePackage(packageSelected);
    setAmount(selectedTransaction.Amount);
    setCreateDate(new Date(selectedTransaction.CreateAt));
    setNote(selectedTransaction.Note);
    setIsShowAdd(true);
  }

  return (
    <>
      <HeaderComponent
        center={null}
        right={
          <TransactionRightHeader addTransaction={() => addTransaction()} />
        }
      ></HeaderComponent>
      <Toast ref={toast} />
      <div className="transaction">
        <div
          className={
            isShowDetail ? "transaction-left active" : "transaction-left"
          }
        >
          <ul className="date-range-wrapper ">
            {
              dateRange.map((time, index) => (
                <li key={index} className={time.active ? 'active' : ''}
                  onClick={() => chooseTime(time.month, time.year)}>
                  Tháng {time.month} {time.year}
                </li>
              ))
            }
          </ul>
          <div className="transaction-overview">
            <div className="transaction-overview-item inflow">
              <label>Tiền vào</label>
              <span>{totalIncomeAmount?.toLocaleString()}</span>
            </div>
            <div className="transaction-overview-item outflow">
              <label>Tiền ra</label>
              <span>{totalOutcountAmount?.toLocaleString()}</span>
            </div>
            <div className="transaction-overview-item total-amount">
              <label />
              <span>{(totalIncomeAmount - totalOutcountAmount)?.toLocaleString()}</span>
            </div>
          </div>
          <div className="view-report">
            <Link to="/report">Xem báo cáo cho giai đoạn này</Link>
          </div>
          <div className="transaction-list">
            {showTransactionItem}
          </div>
        </div>
        <div className={isShowDetail ? "transaction-right active" : "transaction-right"} >
          <div className="header">
            <div className="header-left">
              <img
                src="./assets/close.svg"
                alt="close"
                className="close-detail"
                onClick={() => setIsShowDetail(false)}
              />
              <p>Chi tiết</p>
            </div>
            <div className="header-right">
              <div className="button-method">
                <span className="btn btn-delete" onClick={() => handleDelete()}>Xóa</span>
                <span className="btn btn-edit" onClick={() => handleEdit()} >Sửa</span>
              </div>
            </div>
          </div>
          <div className="transaction-detail"  >
            <img src={`./assets/items/${selectedTransaction?.Image}`} alt="icon" className="transaction-image"
            />
            <div>
              <div className="transaction-name">{selectedTransaction?.PackageName}</div>
              <div className="transaction-wallet">{selectedTransaction?.WalletName}</div>
              <div className="transaction-date"></div>
              <div className="transaction-description">{selectedTransaction?.Note} </div>
              <div className="transaction-amount">-{selectedTransaction?.Amount?.toLocaleString()} đ</div>
            </div>
          </div>
        </div>

      </div>

      <Dialog
        header="Thêm mới giao dịch"
        visible={isShowAdd}
        style={{ width: "80vw" }}
        onHide={() => setIsShowAdd(false)}
      >
        <div className="transaction-form">
          <div className="add-transaction">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="p-grid">
                <div className="p-sm-12 p-md-4">
                  <div className="form-input-group">
                    <label>Ví <span className="danger"> *</span></label>
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
                <div className="p-sm-12 p-md-4">
                  <div className="form-input-group">
                    <label>Nhóm <span className="danger"> *</span></label>
                    <div className="select-item">
                      <CustomDropdown
                        value={selectePackage}
                        options={packageList}
                        action={setSelectePackage}
                        filterBy="Name"
                        optionLabel="Name"
                        placeholder="Chọn nhóm"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-sm-12 p-md-4">
                  <div className="form-input-group">
                    <label>Số tiền <span className="danger"> *</span></label>
                    <div className="select-item">
                      <InputNumber name="amount"
                        value={amount}
                        style = {{width: '100%'}}
                        onValueChange={(e) => setAmount(e.value)} />
                    </div>
                  </div>
                </div>
                <div className="p-sm-12 p-md-4">
                  <div className="form-input-group">
                    <label>Ngày <span className="danger"> *</span></label>
                    <div className="select-item">
                      <Calendar
                        id="createAt"
                        style={{ width: "100%" }}
                        placeholder="Chọn ngày"
                        name="createDate"
                        value={createDate}
                        hourFormat="24"
                        dateFormat="dd/mm/yy"
                        onChange={(e) => setCreateDate(e.value)}
                      />
                    </div>
                  </div>

                </div>
                <div className="p-sm-12 p-md-8">
                  <div className="form-input-group">
                    <label>Ghi chú</label>
                    <div className="select-item">
                      <div className="select-item--right">
                        <input
                          value={note}
                          type="text"
                          placeholder="Ghi chú"
                          name="note"
                          style = {{width: '100%'}}
                          onChange={(e) => { setNote(e.target.value) }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {/* <div className="p-grid">
                <div className="p-sm-12">
                  <span className="add-more"
                    onClick={() => setShowAddition(!showAddition)}>
                    Thêm chi tiết
                    <span>
                      {
                        showAddition ? <i className="pi pi-angle-up"></i> : <i className="pi pi-angle-down"></i>
                      }
                    </span>
                  </span>
                </div>
              </div>
              <div className={showAddition ? "p-grid showAddition" : "p-grid hideAddition"}>
                <div className="p-sm-12 p-md-8">
                  <div className="p-grid">
                    <div className="p-sm-12 p-md-6">
                      <div className="form-input-group">
                        <label>Với ai</label>
                        <div className="select-item">
                          <input type="text" placeholder="Với" id="withPerson" name="withPerson"
                            value = {withPerson} onChange = {(e) => setWithPerson(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-sm-12 p-md-6">
                      <div className="form-input-group">
                        <label>Nhắc nhở</label>
                        <div className="select-item">
                          <input type="text" placeholder="Đặt nhắc nhở" name="remind" />
                        </div>
                      </div>

                    </div>
                    <div className="p-sm-12 p-md-6">
                      <div className="form-input-group">
                        <label>Địa điểm</label>
                        <div className="select-item">
                          <input type="text" placeholder="Địa điểm" name="address" />
                        </div>
                      </div>

                    </div>
                    <div className="p-sm-12 p-md-6">
                      <div className="form-input-group">
                        <label>Sự kiện</label>
                        <div className="select-item">
                          <input type="text" placeholder="Sự kiện" name="event" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="p-sm-12 p-md-4">
                  <div className="form-input-group image">
                    <span>Ảnh</span>
                    <span>
                      Thả các tập tin đính kèm <a href="!#">Tại đây</a>{" "}
                    </span>
                    <span>Định dạng tập tin hình ảnh JPG, JPGE, PNG, GIF</span>
                    <span>Hình ảnh có dung lượng nhỏ hơn 2MB</span>
                  </div>
                </div>
              </div> */}
              <div className="p-grid ">
                <div className="p-sm-12 col-md-12 not-include-report">
                  <input type="checkbox" id="accept" name="exportReport" checked = {exportReport}
                    onChange = {(e) => setExportReport(e.target.checked)}
                  />
                  <span>
                    <div className="report-title">Không tính vào báo cáo </div>
                    <div className="report-description">
                      Không tính giao dịch này trong các báo cáo, ví dụ như Tổng
                      quan
                    </div>
                  </span>
                </div>
                <div className="p-sm-12 col-md-12 btn-wrapper">
                  <Button label="Lưu" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default TransactionPage;
