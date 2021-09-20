import { Chart } from 'primereact/chart';
import { useState } from 'react';
import { useEffect } from 'react';
import './index.scss';

function ReportDetail(props) {
    const { isShowDetail, setIsShowDetail, incomesChart, outcomesChart,
        isIncome, totalIncome, totalOutcome, transactions, dateFilter} = props;
    const [incomeDataGroup, setIncomeDataGroup] = useState([]);
    const [outcomeDatagroup, setOutcomeDataGroup] = useState([]);
    const [groupActive, setGroupActive] = useState(null);
    const [transactionGroupList, setTransactionGroupList] = useState([]);
    const [isShowDetailTransaction, setIsShowDetailTransaction] = useState(false);
    const [chartData, setChartData] = useState({});
    
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


    useEffect(() => {
        const incomeGroupTemps = [];
        const outcomeGroupTemps = [];
        transactions.forEach(item => {
            if (item.IsIncome) {
                const group = incomeGroupTemps.find(t => t.PackageName == item.PackageName);
                if (group) {
                    group.Amount += item.Amount;
                } else {
                    incomeGroupTemps.push(item);
                }
            } else {
                const group = outcomeGroupTemps.find(t => t.PackageName == item.PackageName);
                if (group) {
                    group.Amount += item.Amount;
                } else {
                    outcomeGroupTemps.push(item);
                }
            }
        });
        setIncomeDataGroup(incomeGroupTemps);
        setOutcomeDataGroup(outcomeGroupTemps);
    }, [transactions])

    const selectDetailTransaction = (item) => {
        const transactionsWithGroup = transactions.filter(t => t.PackageId == item.PackageId);
        setGroupActive(item);
        setTransactionGroupList(transactionsWithGroup);
        prepareChartData(transactionsWithGroup);
        setIsShowDetailTransaction(true);
    }

    const prepareChartData = (datas) => {
        let labels = [], incomes = [], outcomes = [];
        // Lấy ra trong tháng có bao nhiêu ngày
        const dayOfMonth = (new Date(dateFilter.getFullYear(), dateFilter.getMonth() + 1, 0)).getDate();
        for(let i = 1; i <= dayOfMonth; i++) {
            labels.push(i + '');
            // Kiểm tra xem ngày đó có transaction nào không
            const days = datas.filter(t => t.date == i);
            // Nếu có thì tính xem Tiền ra bao nhiều, tiền vào bao nhiêu
            if (days && days.length > 0) {
                let income = 0, outcome = 0;
                days.forEach(day => {
                    income += day.IsIncome ? day.Amount : 0;
                    outcome += day.IsIncome ? 0 : day.Amount;
                })
                incomes.push(income);
                outcomes.push(outcome);
            } else {
                incomes.push(0);
                outcomes.push(0);
            }
        }
        setChartData({
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

    const transactionGroupElm = (data) => data.map((item, index) => (
        <li key={index} className="category-item"
            onClick={() => selectDetailTransaction(item)}>
            <span className="item-left">
                <img src={"./assets/items/" + item?.Image} alt="icon" />
                <label>{item?.PackageName}</label>
            </span>
            <span className="item-right">
                <p className="expense">{item?.Amount?.toLocaleString()}</p>
                <img src="./assets/right-chevron.svg" alt="right-chevron" className="right-chevron" />
            </span>
        </li>
    ))

    const transactionGroupDetail = transactionGroupList.map((item, index) => {
        return (
            <li className="category-item" key = {index}>
                <span className="item-left">
                    <label>Thứ {item?.day}, {item?.date}/{item?.month}/{item?.year}</label>
                </span>
                <span className="item-right">
                    <p className="expense">{item?.Amount?.toLocaleString()}</p>
                    <img src="./assets/right-chevron.svg" alt="right-chevron" className="right-chevron" />
                </span>
            </li>
        );
    })
    
    return (
        <div className={isShowDetail ? "report-right active" : "report-right"}>
            <div className="header">
                <div className="header-left">
                    <img src="./assets/close.svg" alt="close" onClick={() => setIsShowDetail(false)} />
                    <p>{isIncome ? 'Khoản thu' : 'Khoản chi'}</p>
                </div>
                <div className="header-right">
                    <div className="display-type active">
                        <img src="./assets/chart.svg" alt="chart" />
                    </div>
                    <div className="display-type">
                        <img src="./assets/statistical.svg" alt="statistical" />
                    </div>
                </div>
            </div>
            <div className="chart-wrapper">
                <div className="chart-content">
                    <div className="chart">
                        {
                            isIncome ? <Chart type="doughnut" data={incomesChart} style={{ position: 'relative' }} /> :
                                <Chart type="doughnut" data={outcomesChart} style={{ position: 'relative' }} />
                        }

                    </div>
                    <div className="amount">
                        {(isIncome ? totalIncome : totalOutcome)?.toLocaleString()} VNĐ
                    </div>
                </div>
                <div className="category-list">
                    <ul>
                        {
                            isIncome ? transactionGroupElm(incomeDataGroup) : transactionGroupElm(outcomeDatagroup)
                        }
                    </ul>
                </div>
            </div>

            {/* Detail Chi tiết của giao dịch */}
            <div className={isShowDetailTransaction ? "report-detail active" : "report-detail"}>
                <div className="header">
                    <div className="header-left">
                        <img src="./assets/back.svg" alt="close" id="back-icon"
                            onClick={() => setIsShowDetailTransaction(false)} />
                        <p>{groupActive?.PackageName}</p>
                    </div>
                    <div className="header-right">
                        <div className="display-type active">
                            <img src="./assets/chart.svg" alt="chart" />
                        </div>
                        <div className="display-type">
                            <img src="./assets/statistical.svg" alt="statistical" />
                        </div>
                    </div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-content">
                        {/* <div className="chart"> */}
                            <Chart type="bar" data={chartData} options={stackedOptions} style = {{width: '100%'}}/>
                        {/* </div> */}
                        {/* <div className="amount">
                            2,254,474
                        </div> */}
                    </div>
                    <div className="category-list">
                        <ul>
                           {isShowDetailTransaction ? transactionGroupDetail : null}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportDetail;