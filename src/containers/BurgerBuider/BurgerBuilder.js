import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 4,
        purchasable: false,
        purchasing: false
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
        alert('You Continue !');
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
        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    closeModal={this.cancelPurchaseHandler}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        onCancel={this.cancelPurchaseHandler}
                        onContinue={this.purchaseContinueHandler}
                        price={this.state.price}
                    />
                </Modal>
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
    }
};

export default BurgerBuilder