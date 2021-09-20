import './index.scss';
import MenuComponent from '../../components/menu';
function DefaultLayout(props) {
    return (
        <div className="container">
            <div className="container-wrapper">
                <MenuComponent></MenuComponent>
                <div className="right">
                    <div className="right-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;