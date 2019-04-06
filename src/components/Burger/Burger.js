import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    const aTransformedIngredients = Object.keys(props.ingredients)
    .map(sKey => {
        return [...Array(props.ingredients[sKey])].
        map((_, i) => {
            return <BurgerIngredient key={sKey + i} type={sKey} />
        });
    })
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {aTransformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;