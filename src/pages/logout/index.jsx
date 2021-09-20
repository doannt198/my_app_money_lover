import './index.scss';
import { Button } from 'primereact/button';
function LogoutPage() {
    return (
        <div className = "logout-wrapper">
            <img className="logout-image" src="./assets/logout.png" alt="logout" />
            <Button label="Sign In" className="btn-login"/>
        </div>
    );
}

export default LogoutPage;