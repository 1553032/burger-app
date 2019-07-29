import React, { Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar
                    toggleSideDrawer={this.toggleSideDrawer}
                    isAuth={this.props.isAuth}
                />
                <SideDrawer
                    show={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuth}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout);