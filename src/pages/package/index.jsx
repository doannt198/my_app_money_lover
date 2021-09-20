import { useEffect, useRef, useState } from 'react';
import HeaderComponent from '../../components/header';
import './index.scss';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ChooseIconComponent from '../../components/choose-icon';
import PackageModel from '../../models/package.model';
import PackageService from '../../services/package.service';
import { Toast } from 'primereact/toast';
import FilterModel from '../../models/filter.model';
import PackageItem from '../../components/package/package-item';
import PackageDetail from '../../components/package/package-detail';
import PackageForm from '../../components/package/package-form';

function PackagePage() {
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [isChooseIcon, setIsChooseIcon] = useState(false);
    const [isEditPackage, setIsEditPackage] = useState(false);
    const [packageModel, setPackageModel] = useState(new PackageModel());
    const [packageList, setPackageList] = useState([]);
    const [selectePackages, setSelectePackages] = useState(null)
    const toast = useRef(null);

    // Nhận vòa list từ api trả về
    const convertToTree = (data => {
        return data.filter(t => t.ParentId == null) // Lấy ra tất cả item mà parentid = null tức là thằng chia
            .map(item => { // Hàm map trong js dùng để tạo 1 mảng tương tự số lượng mảng ban đầu. nhưng các trường có thể khác
                item.Childs = data.filter(a => a.ParentId == item.Id)
                return item;
            });
    })

    useEffect(() => {
        getDataPackage();
    }, [])

    const getDataPackage = () => {
        let filterModel = new FilterModel();
        filterModel.pageSize = 500;
        PackageService.getPackages(filterModel)
            .then((response) => {
                const data = convertToTree(response.data.Data.Data);
                setPackageList(data);
            })
            .catch((error) => {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: error,
                });
            });
    };

    const chooseIcon = (value) => {
        setSelectePackages({ ...selectePackages, Icon: value });
        setIsChooseIcon(false);
    }

    const selectedItem = (pack) => {
        setPackageModel(pack);
        setIsShowDetail(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        PackageService.createorEditPackage(selectePackages)
            .then((response) => {
                toast.current.show({
                    severity: "success",
                    summary: "Thông báo ",
                    detail: "Thêm Nhóm thành công ",
                    life: 3000,
                });
                setIsEditPackage(false);
                getDataPackage();
                setPackageModel({...selectePackages});
                setSelectePackages(null);
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };

    const handleDelete = () => {
        PackageService.deletePackage(packageModel.Id)
        .then(response => {
            setIsShowDetail(false);
            toast.current.show({
                severity: 'success',
                summary: 'Thông báo ',
                detail: 'Xóa nhóm thành công ',
                life: 3000 });
            getDataPackage();
        }).catch(error => {
            console.log("error:", error);
        })
    }

    const handleAddPackage = () => {
        setIsEditPackage(true);
        setSelectePackages(new PackageModel());
    }

    const handleEdit = () => {
        setIsEditPackage(true);
        setSelectePackages(packageModel);
    }
    const packageIncomeElms = packageList.filter(t => t.IsIncome == true)
        .map(pack => (
            <PackageItem
                key={pack.Id}
                selectedItem={selectedItem}
                pack={pack}
            />
        ));

    const packageOutcomeElms = packageList.filter(t => t.IsIncome == false)
        .map(pack => (
            <PackageItem
                key={pack.Id}
                selectedItem={selectedItem}
                pack={pack}
            />
        ));

    return (
        <>
            <HeaderComponent center={null}
                right={
                    <Button className="btn-add-package" label="Thêm nhóm"
                    onClick={() => handleAddPackage()} />
                }
            >
            </HeaderComponent>
            <Toast ref={toast} />
            <div className={isShowDetail ? "package active  " : "package"}>
                <div className="package-left">
                    <div className="package-group">
                        <p className="title">Khoản chi</p>
                        <div className="package-list">
                            {packageIncomeElms}
                        </div>
                        <p className="title">Khoản thu</p>
                        <div className="package-list">
                            {packageOutcomeElms}
                        </div>
                    </div>
                </div>

                <div className={isShowDetail ? "package-right active" : "package-right"}>
                    <PackageDetail
                        setIsShowDetail={setIsShowDetail}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        setIsEditPackage={setIsEditPackage}
                        packageModel={packageModel} />
                </div>
            </div>
            <Dialog header="Nhóm" visible={isEditPackage} style={{ width: '450px' }}
                onHide={() => setIsEditPackage(false)} >
                {
                    isEditPackage ? 
                        <PackageForm
                            handleSubmit={handleSubmit}
                            selectePackages = {selectePackages}
                            setSelectePackages = {setSelectePackages}
                            setIsChooseIcon = {setIsChooseIcon}
                            setIsEditPackage = {setIsEditPackage}
                        /> : null
                }
            </Dialog>

            <Dialog header="Header" visible={isChooseIcon} style={{ width: '50vw' }}
                onHide={() => setIsChooseIcon(false)}>
                <ChooseIconComponent chooseIcon={chooseIcon} ></ChooseIconComponent>
            </Dialog>
        </>
    )
}
export default PackagePage;
