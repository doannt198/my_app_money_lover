
import './App.scss';
import DefaultLayout from './layout/default';
import TransactionPage from './pages/transaction';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ReportPage from './pages/report';
import BudgetPage from './pages/budget';
import MarketPage from './pages/market';
import HelpPage from './pages/help';
import PackagePage from './pages/package';
import MyWallet from './pages/my-wallet';
import ManageAccountPage from './pages/manage-account';
import BankLink from './pages/bank-link';
import { useEffect } from 'react';
import CONSTANTS from './common/constants';
import NotFoundPage from './pages/not-found';
import LoadingComponent from './components/loading';

function App() {
  const history = useHistory();

  // Kiểm tra nếu chưa đăng nhập thì chuyển về trang login
  useEffect(() => {
    if (!sessionStorage.getItem(CONSTANTS.TOKEN)) {
      history.push('/login');
    }
  }, []);

  return (
    <div className="container-wrapper">
      <DefaultLayout>
        <Switch>
          <Route path="/transaction">
            <TransactionPage></TransactionPage>
          </Route>
          <Route path="/report">
            <ReportPage></ReportPage>
          </Route>
          <Route path="/budget">
            <BudgetPage></BudgetPage>
          </Route>
          <Route path="/market">
            <MarketPage></MarketPage>
          </Route>
          <Route path="/help">
            <HelpPage></HelpPage>
          </Route>
          <Route path="/package">
            <PackagePage></PackagePage>
          </Route>
          <Route path="/manage-account">
            <ManageAccountPage></ManageAccountPage>
          </Route>
          <Route path="/my-wallet">
            <MyWallet></MyWallet>
          </Route>
          <Route path="/bank-link">
            <BankLink></BankLink>
          </Route>
          <Route path="/" exact>
            <TransactionPage></TransactionPage>
          </Route>
          <Route>
            <NotFoundPage></NotFoundPage>
          </Route>
        </Switch>
      </DefaultLayout>
      <LoadingComponent />
    </div>
  );
}

export default App;
