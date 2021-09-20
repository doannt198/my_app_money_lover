import { useSelector } from 'react-redux';
import './index.scss';

function LoadingComponent(props) {
    const loading = useSelector(state => state.loading);
    const renderElm = loading ? (
            <div className="loading-wrapper" >
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <h2>Loading...</h2>
                </div>
            </div>
        ) : null

    return renderElm
  
}

export default LoadingComponent;