import { useState, useEffect, useRef} from 'react';
import HeaderComponent from '../../components/header';
import './index.scss';
import { Chart } from 'primereact/chart';
import TransactionService from '../../services/transaction.service';
import CONSTANTS from '../../common/constants';
import { Calendar } from 'primereact/calendar';
import * as loadingAction from '../../action/loading.action';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import ReportDetail from '../../components/report/report-detail';

function ReportPage() {
    const [transactions, setTransactions] = useState([]);
    const [dateFilter, setDateFilter] = useState(new Date());
    const [stackChart, setStackChart] = useState({});
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalOutcome, setTotalOutcome] = useState(0);
    const [incomesChart, setIncomesChart] = useState({});
    const [outcomesChart, setOutcomesChart] = useState({});
    const [isIncome, setIsIncome] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const colorsConst = ['#FF6384', '#36A2EB', '#00ff80', '#FFCE56', '#ff4000', '#ff00bf', '#00bfff', '#adff2f', '#9400d3', '#5f9ea0', '#008000', '#ff4000', '#ff00bf', '#00bfff', '#9acd32', '#191970', '#778899', '#90ee90']

    const prepareDonutChart = (data, isIncome = false) => {
        const labels = [], colors = [], datas = [];
        data.forEach((item, index) => {
            if (labels.includes(item.PackageName)) {
                const indexItem = labels.findIndex(item => item.PackageName);
                datas[indexItem] = datas[indexItem] + item.Amount;
            } else {
                labels.push(item.PackageName);
                colors.push(colorsConst[index]);
                datas.push(item.Amount);
            }
        });
        const dataValue = {
            labels: labels,
            datasets: [
                {
                    data: datas,
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }]
        };
        if (isIncome) {
            setIncomesChart(dataValue);
        } else {
            setOutcomesChart(dataValue);
        }
        
    }

    const prepareOverviewChart = (datas) => {
        let labels = [], incomes = [], outcomes = [], totalIncomeTemp = 0, totalOutcomeTemp = 0;
        // Lấy ra trong tháng có bao nhiêu ngày
        const dayOfMonth = (new Date(dateFilter.getFullYear(), dateFilter.getMonth() + 1, 0)).getDate();
        for(let i = 1; i <= dayOfMonth; i++) {
            labels.push(i + '');
            // Kiểm tra xem ngày đó có transaction nào không
            const days = datas.filter(t => t.date == i);
            // Nếu có thì tính xem Tiền ra bao nhiều, tiền vào bao nhiêu
            if (days && days.length > 0) {
                let income = 0;
                let outcome = 0;
                days.forEach(day => {
                    income += day.IsIncome ? day.Amount : 0;
                    outcome += day.IsIncome ? 0 : day.Amount;
                })
                incomes.push(income);
                outcomes.push(outcome);
                totalIncomeTemp += income;
                totalOutcomeTemp += outcome;
            } else {
                incomes.push(0);
                outcomes.push(0);
            }
        }
        setTotalIncome(totalIncomeTemp);
        setTotalOutcome(totalOutcomeTemp);
        setStackChart({
            labels: labels,
            datasets: [{
                type: 'bar',
                label: 'Tiền ra',
                backgroundColor: '#ed4981',
                data: outcomes
            }, {
                type: 'bar',
                label: 'Tiền vào',
                backgroundColor: '#66BB6A',
                data: incomes
            }]
        })
    }


    useEffect(() => {
        dispatch(loadingAction.showLoading());
        const accountId = sessionStorage.getItem(CONSTANTS.USER_ID) || '';
        const walletActiveId = localStorage.getItem(CONSTANTS.WALLET_ACTIVE);
        const incomeDatas = [];
        const outcomeDatas = [];
        TransactionService.getTransactions(
            '',dateFilter.getMonth() + 1, dateFilter.getFullYear(), accountId, walletActiveId, 0, 10000)
            .then(response => {
                const datas = response.data.Data.Data.map(item => {
                    const createAt = new Date(item.CreateAt);
                    if (item.IsIncome) {
                        incomeDatas.push(item);
                    } else {
                        outcomeDatas.push(item);
                    }
                    return {
                        ...item,
                        createAt: createAt,
                        day: createAt ? createAt.getDay() + 1 : '',
                        date: createAt ? createAt.getDate() : '',
                        month: createAt ? createAt.getMonth() + 1 : '',
                        year: createAt ? createAt.getFullYear() : ''
                    }
                });
                prepareDonutChart(incomeDatas, true);
                prepareDonutChart(outcomeDatas, false);
                prepareOverviewChart(datas);
                setTransactions(datas);
                dispatch(loadingAction.hideLoading());
            })
            .catch(error => {
                dispatch(loadingAction.hideLoading());
            });
    }, [dateFilter]);

  
    let stackedOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            tooltips: { mode: 'index', intersect: false },
            legend: { labels: { color: '#495057' } }
        },
        scales: {
            x: {
                stacked: true,
                ticks: { color: '#495057' },
                grid: { color: '#ebedef' }
            },
            y: {
                stacked: true,
                ticks: { color: '#495057' },
                grid: { color: '#ebedef' }
            }
        }
    };


    return (
        <>
        <HeaderComponent
            right = {
                <div className="daterange">
                    <label>Thời gian</label>
                    <Calendar id="monthpicker"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.value)}
                    view="month"
                    dateFormat="mm/yy"
                    style = {{border: "none"}}
                    yearNavigator
                    yearRange="1990:2050" />
                </div>
            }
        >
        </HeaderComponent>

        <div className={isShowDetail ? "report active" : "report"}>
            <div className="report-left">
                {/* <div className="balance">
                    <div className="balance-start">
                        <div className="balance-title">Số dư đầu</div>
                        <div className="balance-amount">+312,660,269</div>
                    </div>
                    <div className="balance-end">
                        <div className="balance-title">Số dư đầu</div>
                        <div className="balance-amount">+312,660,269</div>
                    </div>
                </div> */}
                <div className="chart">
                    <div className="chart-header" onClick = {() => setIsShowDetail(true)}>
                        <div className="chart-title">
                            <div className="title-bar">
                                Thu nhập ròng
                            </div>
                            <div className="amount-bar">
                                {(totalIncome - totalOutcome)?.toLocaleString()} VNĐ
                            </div>
                        </div>
                        <div className="chart-body">
                            {/* <Chart type="bar" data={chartData} /> */}
                            <Chart type="bar" data={stackChart} options={stackedOptions}/>
                        </div>
                    </div>
                </div>
                <div className="donut-chart">
                    <div className="income" onClick = {() => {setIsShowDetail(true); setIsIncome(true);}}>
                        <div>
                            <p className = "title">Khoản thu</p>
                            <p className = "amount">+ {totalIncome?.toLocaleString()} VNĐ</p>
                        </div>
                        <Chart type="doughnut" data={incomesChart} style={{ position: 'relative'}} />
                    </div>
                    <div className="outcome" onClick = {() => {setIsShowDetail(true); setIsIncome(false);}}>
                        <p className = "title">Khoản chi</p>
                        <p className = "amount">- {totalOutcome?.toLocaleString()} VNĐ</p>
                        <Chart type="doughnut" data={outcomesChart} style={{ position: 'relative'}} />
                    </div>
                </div>
                <div className="debt-loan">
                    <ul>
                        <li>
                            <p>Nợ</p>
                            <span>
                                <p className="income">0</p>
                                <img src="./assets/right-chevron.svg" alt="right-chevron" className="right-chevron" />
                            </span>
                        </li>
                        <li>
                            <p>Cho vay</p>
                            <span>
                                <p className="expense">0</p>
                                <img src="./assets/right-chevron.svg" alt="right-chevron" className="right-chevron" />
                            </span>
                        </li>
                        <li>
                            <p>Khác</p>
                            <span>
                                <p className="other">0</p>
                                <img src="./assets/right-chevron.svg" alt="right-chevron" className="right-chevron" />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
                {
                    isShowDetail ? (
                        <ReportDetail
                            isShowDetail = {isShowDetail}
                            setIsShowDetail = {setIsShowDetail}
                            incomesChart = {incomesChart}
                            outcomesChart = {outcomesChart}
                            isIncome = {isIncome}
                            transactions = {transactions}
                            totalIncome = {totalIncome}
                            totalOutcome = {totalOutcome}
                            dateFilter = {dateFilter}
                            />
                    ) : null
                }
            
        </div>
        <Toast ref={toast} />
        </>
    )
}
export default ReportPage;
