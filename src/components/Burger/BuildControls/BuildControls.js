import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = (props) => {
    const controllers = Object.keys(props.labels).map((igKey) => {
        return <BuildControl
            label={igKey.toUpperCase()}
            disabled={props.labels[igKey] ? false : true}
            key={igKey}
            add={() => props.addIngredient(igKey)}
            less={() => props.lessIngredient(igKey)}
        />
    });
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{parseFloat(props.price).toFixed(2)}</strong></p>
            {controllers}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.order}
            >
                {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
            </button>
        </div>
    )
};

export default buildControls;