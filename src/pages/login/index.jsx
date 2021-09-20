import { Link, useHistory } from 'react-router-dom';
import './index.scss';
import authService from '../../services/auth.service';
import deviceService from '../../services/device.service';
import { useEffect, useRef, useState } from 'react';
import CONSTANTS from '../../common/constants';
import {fullBrowserVersion, browserName} from 'react-device-detect';
import { useDispatch } from 'react-redux';
import * as loadingAction from '../../action/loading.action';
import { Toast } from 'primereact/toast';

function LoginPage() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);

    // Kiểm tra chạy 1 lần, khi mà đã đăng nhập, còn gọi login thì redirect lại về trang main
    useEffect(() => {
      if (sessionStorage.getItem(CONSTANTS.TOKEN)) {
        history.push("/");
      }
    }, [])

    // Kiểm tra đăng nhập thành công thì chuyển về trang main
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!userName || !password) {
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Nhập Tài khoản, Mật khẩu', life: 3000 });
            return;
        }
        dispatch(loadingAction.showLoading());
        try {
            const response = await authService.login(userName, password);
            sessionStorage.setItem(CONSTANTS.TOKEN, response.data.Data.Token);
            sessionStorage.setItem(CONSTANTS.USER_NAME, response.data.Data.UserName);
            sessionStorage.setItem(CONSTANTS.USER_ID, response.data.Data.Id);
            // Lưu thiết bị đăng nhập
            deviceService.setDevice({
                id: "",
                name: browserName + ' ' + fullBrowserVersion,
                createDate: new Date(),
                userId: response.data.Data.Id
            });
            dispatch(loadingAction.hideLoading());
            toast.current.show({ severity: 'success', summary: 'Thông báo ', detail: 'Đăng nhập thành công', life: 3000 });
            history.push("/");
        } catch (error) {
            console.log(error);
            dispatch(loadingAction.hideLoading());
            alert('Đăng nhập thất bại');
            toast.current.show({ severity: 'error', summary: 'Thông báo ', detail: 'Đăng nhập thất bại', life: 3000 });
        }
    }

    return (
        <div className="login-page">
            <div className="login-page-wrapper">
                <div className="logo">
                    <img src="./assets/dang-nhap/logo.svg" alt="logo" />
                </div>
                <div className="login">
                    <form className="login-wrapper" onSubmit = {handleLogin}>
                        <h1 className="login-title">Log In</h1>
                        <div className="login-contain">
                            <div className="login-left">
                                <p className="login-description">Using social networking accounts</p>
                                <div className="login-social">
                                    <a className="btn btn-google" href="#">
                                        <svg id="Group_818" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="social-item-icon"><g id="Group_862" data-name="Group 862"><rect id="Rectangle_326" data-name="Rectangle 326" width={24} height={24} fill="none" /><path id="Path_3814" data-name="Path 3814" d="M261.529,3012.3a5.143,5.143,0,0,1,3.551,1.34l2.592-2.481a8.919,8.919,0,0,0-6.143-2.339,9.2,9.2,0,0,0-8.2,4.959l2.969,2.26a5.54,5.54,0,0,1,5.231-3.739" transform="translate(-249.345 -3005.818)" fill="#ff3e3e" fillRule="evenodd" /><path id="Path_3815" data-name="Path 3815" d="M270.345,3018.018a7.545,7.545,0,0,0-.194-1.84h-8.622v3.34h5.061a4.388,4.388,0,0,1-1.878,2.92l2.9,2.2a8.712,8.712,0,0,0,2.733-6.62" transform="translate(-249.345 -3005.818)" fill="#3b8aff" fillRule="evenodd" /><path id="Path_3816" data-name="Path 3816" d="M256.3,3019.6a5.423,5.423,0,0,1-.306-1.78,5.712,5.712,0,0,1,.3-1.781l-2.969-2.259a8.817,8.817,0,0,0,0,8.08Z" transform="translate(-249.345 -3005.818)" fill="#ffce12" fillRule="evenodd" /><path id="Path_3817" data-name="Path 3817" d="M261.529,3026.818a8.858,8.858,0,0,0,6.081-2.18l-2.9-2.2a5.677,5.677,0,0,1-8.408-2.84l-2.969,2.26a9.182,9.182,0,0,0,8.2,4.96" transform="translate(-249.345 -3005.818)" fill="#27b648" fillRule="evenodd" /></g></svg>
                                        <span>Connect with Google</span>
                                    </a>
                                    <a className="btn btn-facebook" href="#">
                                        <svg id="Group_817" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="social-item-icon"><g id="Group_816" data-name="Group 816"><g id="Group_786" data-name="Group 786" transform="translate(2.728 2.881)"><path id="Exclusion_1" data-name="Exclusion 1" d="M5776.945-352.489h-2.015a6.422,6.422,0,0,1-3.4-.59,3.99,3.99,0,0,1-1.669-1.667,6.448,6.448,0,0,1-.589-3.4v-7.075a6.44,6.44,0,0,1,.589-3.4,4.014,4.014,0,0,1,1.669-1.669,6.441,6.441,0,0,1,3.4-.588H5782a6.438,6.438,0,0,1,3.4.588,4.015,4.015,0,0,1,1.669,1.669,6.425,6.425,0,0,1,.59,3.4v7.075a6.433,6.433,0,0,1-.59,3.4,3.991,3.991,0,0,1-1.669,1.667,6.419,6.419,0,0,1-3.4.59h-2.144v-6.626h2.179l.407-2.689h-2.584V-363.6a1.4,1.4,0,0,1,1.4-1.4h1.28v-2.282a12.034,12.034,0,0,0-1.975-.194c-.2,0-.391.009-.56.025a3.223,3.223,0,0,0-2.9,2.346,5.7,5.7,0,0,0-.135,1.5c.016.43.007,1.383,0,1.773v.021H5774.6v2.689h2.341v6.626Z" transform="translate(-5769.272 370.881)" fill="#1877f2" stroke="rgba(0,0,0,0)" strokeMiterlimit={10} strokeWidth={1} /></g><rect id="Rectangle_308" data-name="Rectangle 308" width={24} height={24} fill="none" /></g></svg>
                                        <span>Conect with Facebook</span>
                                    </a>
                                    <a className="btn btn-apple" href="#">
                                        <svg id="Group_788" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="social-item-icon"><rect id="Rectangle_308" data-name="Rectangle 308" width={24} height={24} fill="none" /><g id="Group_781" data-name="Group 781" transform="translate(3 1.589)"><rect id="Rectangle_305" data-name="Rectangle 305" width={19} height={19} transform="translate(0 0.411)" fill="none" /><path id="Path_3806" data-name="Path 3806" d="M18.67,8.385a4.24,4.24,0,0,0-2.037,3.579,4.148,4.148,0,0,0,2.518,3.81,9.71,9.71,0,0,1-1.285,2.675c-.8,1.157-1.651,2.328-2.93,2.328s-1.614-.759-3.086-.759c-1.446,0-1.952.782-3.121.782S6.74,19.717,5.8,18.4a11.583,11.583,0,0,1-1.965-6.243c0-3.653,2.374-5.607,4.725-5.607,1.243,0,2.285.82,3.062.82.736,0,1.892-.868,3.315-.868A4.426,4.426,0,0,1,18.67,8.385M11.715,6.3a1.542,1.542,0,0,1-.253-.023,1.718,1.718,0,0,1-.037-.34,4.093,4.093,0,0,1,1.036-2.555,4.183,4.183,0,0,1,2.76-1.429,1.8,1.8,0,0,1,.037.375,4.256,4.256,0,0,1-.988,2.628A3.659,3.659,0,0,1,11.715,6.3Z" transform="translate(-2.678 -1.952)" /></g></svg>
                                        <span>Sign in with Apple</span>
                                    </a>
                                </div>
                            </div>
                            <div className="login-right">
                                <p className="login-description">Using Money Lover account</p>
                                <input name="userName" value = {userName} onChange = {(e) => setUserName(e.target.value)} type="text" className="email" placeholder="User Name" />
                                <input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)} className="password" placeholder="Password" />
                                <span className="forgot-password">
                                    <Link to = "/forgot-password">Forgot Password</Link>
                                </span>
                                <button type="submit" className="btn login-button">Login</button>
                                <p className="register-link">Don't have an account
                                    <Link to="/register"> Register</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
}
export default LoginPage;