import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    const ingredients = []
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amout: props.ingredients[ingredientName]
        });
    };
    const ingrediendOutput = ingredients.map(ig => {
        return <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >{ig.name} ({ig.amout})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingrediendOutput}</p>
            <p>Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;