import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingredients) {
            const purchasedRedirected = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirected}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancelCheckout={this.cancelCheckoutHandler}
                        continueCheckout={this.continueCheckoutHandler}
                    />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary;
    }
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps, null)(Checkout);