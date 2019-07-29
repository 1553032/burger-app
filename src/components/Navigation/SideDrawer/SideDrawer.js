import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const attachedClass = [classes.SideDrawer];
    props.show ? attachedClass.push(classes.Open) : attachedClass.push(classes.Close);
    return (
        <React.Fragment>
            <Backdrop show={props.show} cancel={props.close} />
            <div className={attachedClass.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;