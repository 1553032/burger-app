import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        // axios.get('https://my-burger-app-46081.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: error.message });
        //     });
        this.props.fetchIngredients();
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.history.push('/auth');
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        labels={this.props.ingredients}
                        addIngredient={this.props.onIngredientAdded}
                        lessIngredient={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                        order={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                    />
                </React.Fragment>
            )

            orderSummary = (<OrderSummary
                ingredients={this.props.ingredients}
                onCancel={this.cancelPurchaseHandler}
                onContinue={this.purchaseContinueHandler}
                price={this.props.price}
            />);
        }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    closeModal={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        fetchIngredients: () => dispatch(actions.initIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 