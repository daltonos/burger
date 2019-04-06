import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let aTransformedIngredients = Object.keys(props.ingredients)
    .map(sKey => {
        return [...Array(props.ingredients[sKey])].
        map((_, i) => {
            return <BurgerIngredient key={sKey + i} type={sKey} />
        });
    }).reduce((aReduced, oEl) => {
        return aReduced.concat(oEl);
    }, []);

    if(!aTransformedIngredients.length) {
        aTransformedIngredients = (<p>No ingredients yet.</p>);
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {aTransformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;