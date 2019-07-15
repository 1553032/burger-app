import React, { Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    toggleSideDrawer = () => {
        this.setState((prevState, props) => ({
            showSideDrawer: !prevState.showSideDrawer
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
                <SideDrawer show={this.state.showSideDrawer} close={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
};

export default Layout;