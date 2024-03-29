import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css'

const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, idx) => {
            return <BurgerIngredient key={igKey + idx} type={igKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, [])

    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Please start adding ingredients</p>; 
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;