import { useEffect, useState } from 'react';
import './index.scss';
import HelpItem from '../../components/help-item';
import SupportService from '../../services/support.service';
function HelpPage() {
    const [supports, setSupports] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        getFaq();
    }
    const getFaq = () => {
        SupportService.getSupports('', 0, 1000).then((response) => {
            setSupports(response.data.Data.Data);
            const items = document.querySelectorAll('.faq-item .title');
            items.forEach((item) => {
                item.addEventListener('click', function () {
                    if (item.parentNode.classList.contains('active')) {
                        item.parentNode.classList.remove('active');
                    } else {
                        item.parentNode.classList.add('active');
                    }
                })
            })
        })
        .catch((error) => {
            console.log("error", error);
        })
    }
    const supportElms = supports.map((faq) => {
        return (
            <div className="faq-item" key={faq.Id}>
                <div className="title">
                    <img src="./assets/down-chevron.svg" alt="" />
                    {faq?.Name}
                </div>
                <div className="content"
                dangerouslySetInnerHTML={{ __html: faq?.Description}} />
            </div>
        )
    })
    return (
        <>
            <div className="faq">
                <div className="faq-wrapper">
                    <div className="faq-header">
                        <img src="./assets/faq/top_image.jpg" alt="" />
                        <div className="crop-flip" />
                        <div className="header-body">
                            <h1>Our Support Center</h1>
                            <span>Get the most our of software. Contact us if you don't find what you're looking for</span>
                            <a className="btn btn-send-message">Send message</a>
                        </div>
                    </div>
                    <div className="faq-menu">
                        <ul>
                            <HelpItem
                                img="./assets/faq/rsz_ios-home.png"
                                title="IOS"
                                id="ios"
                            ></HelpItem>
                            <HelpItem
                                img="./assets/faq/rsz_mac-home.png"
                                title="MAC"
                                id="mac"
                            ></HelpItem>
                            <HelpItem
                                img="./assets/faq/rsz_android-home.png"
                                title="Android"
                                id="android"
                            ></HelpItem>
                            <HelpItem
                                img="./assets/faq/rsz_windows-home.png"
                                title="Windows"
                                id="window"
                            ></HelpItem>
                            <HelpItem
                                img="./assets/faq/rsz_windowphone-home.png"
                                title="Window phone"
                                id="Windowphone"
                            ></HelpItem>

                            <HelpItem
                                img="./assets/faq/rsz_web-home.png"
                                title="Web"
                                id="Web"
                            ></HelpItem>
                        </ul>
                    </div>
                    <div className="faq-content">
                        <div className="faq-content-group">
                            <div className="group-title">BASIC QUESTIONS</div>
                            {supportElms}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HelpPage;
