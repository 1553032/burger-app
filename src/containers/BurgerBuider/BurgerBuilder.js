import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://my-burger-app-46081.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push([i] + '=' + this.state.ingredients[i]);
        }

        queryParams.push('price=' + this.state.price);

        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    addIngredient = (igKey) => {
        const oldCount = this.state.ingredients[igKey];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[igKey] = oldCount + 1;
        const updatedPrice = this.state.price + INGREDIENT_PRICES[igKey];
        this.setState({
            ingredients: updatedIngredients,
            price: updatedPrice
        });
        this.updatePurchasable(updatedIngredients);
    }

    lessIngredient = (igKey) => {
        const oldCount = this.state.ingredients[igKey];
        if (oldCount <= 0) {
            return;
        }
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[igKey] = oldCount - 1;
        const updatedPrice = this.state.price - INGREDIENT_PRICES[igKey];
        this.setState({
            ingredients: updatedIngredients,
            price: updatedPrice
        });
        this.updatePurchasable(updatedIngredients);
    }

    render() {
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        labels={this.state.ingredients}
                        addIngredient={this.addIngredient}
                        lessIngredient={this.lessIngredient}
                        price={this.state.price}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}
                    />
                </React.Fragment>
            )

            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                onCancel={this.cancelPurchaseHandler}
                onContinue={this.purchaseContinueHandler}
                price={this.state.price}
            />);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios); 