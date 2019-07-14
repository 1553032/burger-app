import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    let ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicous Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{parseFloat(props.price).toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button
                btnType="Danger"
                clicked={props.onCancel}
            >CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.onContinue}
            >CONTINUE</Button>
        </React.Fragment>
    )
};

export default orderSummary;