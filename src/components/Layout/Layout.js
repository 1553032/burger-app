import React, { Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                <div>Toolbar, Sidebar, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
};

export default Layout;