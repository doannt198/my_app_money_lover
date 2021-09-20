import { Link } from 'react-router-dom';
import './index.scss';
function ForgotPasswordPage() {
    return (
        <div className="forgot">
            <div className="forgot-wrapper">
                <div className="logo">
                    <img src="./assets/dang-nhap/logo.svg" alt="logo" />
                </div>
                <div className="login">
                    <form className="login-wrapper">
                        <h1 className="login-title">Forgot Passwod</h1>
                        <div className="login-description">
                            Enter the email address you used to register, and we will send
                            you an email to recover your password in no time
                        </div>
                        <div className="login-contain">
                            <input type="text" className="email" placeholder="Email" />
                            <button className="btn login-button">Login</button>
                            <span>
                                <Link to="/login">Back to Login</Link> or <Link to = '/register'>Create Account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;