import React from "react";
import Aux from "../../../hoc/Aux";

const orderSummary = (props) => {
    const oIngredientsSummary = {};
    props.ingredients.forEach(sIngredient => {
        if (sIngredient in oIngredientsSummary) {
            oIngredientsSummary[sIngredient]++;
        } else {
            oIngredientsSummary[sIngredient] = 1;
        }
    });
    const aIngredientsSummary = Object.keys(oIngredientsSummary).map(sIngredientKey => {
        return ( <li key={sIngredientKey}>
                    <span style={{textTransform: "capitalize"}}>{sIngredientKey}</span> {oIngredientsSummary[sIngredientKey]}
                </li>);
    });
    return (
        <Aux>
            <h3>Ingredients Summary</h3>
            <ul>
                {aIngredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
}

export default orderSummary;