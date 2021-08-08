import React from 'react';
import './css/InfoBank.css';
import Logo from '../../../Assets/Images/Logo.svg';
import ImgInfoBank from '../../../Assets/Images/pay.svg';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

export default function InfoBank() {
    return (
        <div className="div-info-bank">
            <header className="header-info-bank">
                <img src={Logo} alt="Logo da ZED Bank" />
            </header>
            <div>
                <div className="desktop-title-div-info-bank">
                    <h1>Complete os campos ao lado para criar sua primeira conta</h1>
                </div>
                <div className="mobile-title-div-info-bank">
                    <h1>Complete os campos abaixo para criar sua primeira conta</h1>
                </div>
                <div className="div-img-info-bank">
                    <img src={ImgInfoBank} alt="Ilustração de pessoas acessando suas contas bancárias pelo computador e celular" />
                </div>
                <div className="mobile-footer-div-info-bank">
                    <p>Arraste para baixo</p>
                    <ArrowDropDownCircleIcon className="icon-arrow" />
                </div>
            </div>
        </div>
    );
}