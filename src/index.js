import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './pages/login';
 import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgot-password';
import LogoutPage from './pages/logout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer';


const store =createStore(rootReducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

);

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/logout">
           <LogoutPage /> 
        </Route>
        <Route path="/forgot-password">
           <ForgotPasswordPage /> 
        </Route>
        <Route path="/login">
           <LoginPage></LoginPage> 
        </Route>
        <Route path="/register">
           <RegisterPage></RegisterPage> 
        </Route>
        <Route path="" exact>
         <App />
        </Route>
      </Switch>
    </Router>
    </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
