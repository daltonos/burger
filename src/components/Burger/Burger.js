import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let aTransformedIngredients = props.ingredients
    .map((sKey, i) => (<BurgerIngredient key={sKey + i} type={sKey} />));

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