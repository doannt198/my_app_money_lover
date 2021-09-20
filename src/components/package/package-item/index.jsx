import './index.scss';

function PackageItem(props) {
    const {selectedItem, pack} = props;
    return (
        <div className="package-parent">
            <div className="package-parent-item"
                 onClick={() => selectedItem(pack)} >
                <img src={`./assets/items/${pack.Icon}`} alt="icon" />
                <p> {pack?.Name} </p>
            </div>
            <div className="package-child-list">
                {
                    pack.Childs.map(subPack => (
                        <div className="package-child-item"  key = {subPack.Id}
                             onClick={() => selectedItem(subPack)}>
                            <img src={`./assets/items/${subPack.Icon}`} alt="icon" />
                            <p>{subPack?.Name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PackageItem;