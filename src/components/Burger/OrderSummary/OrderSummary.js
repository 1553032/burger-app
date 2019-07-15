import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    render() {
        let ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        })
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicous Burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{parseFloat(this.props.price).toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.onCancel}
                >CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={this.props.onContinue}
                >CONTINUE</Button>
            </React.Fragment>
        )
    }
};

export default OrderSummary;