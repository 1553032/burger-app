import React from 'react';
import logoPath from '../../../assets/images/burger-logo.png';
import classes from './Logo.module.css'

const logo = (props) => {
    return (
        <div className={ classes.Logo } style={{height: props.height}}>
            <img src={logoPath} alt="Burger" />
        </div>
    );
};

export default logo;