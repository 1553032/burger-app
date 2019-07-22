import React from 'react';
import logoPath from '../../../assets/images/burger-logo.png';
import classes from './Logo.module.css';
import { withRouter } from 'react-router-dom';

class logo extends React.Component {
    toNavHomepage = () => {
        this.props.history.replace('/');
    }
    render() {
        return (
            <div onClick={this.toNavHomepage} className={classes.Logo} style={{ height: this.props.height }}>
                <img src={logoPath} alt="Burger" />
            </div>
        );
    }
};

export default withRouter(logo);