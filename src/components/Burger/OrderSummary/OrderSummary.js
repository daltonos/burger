import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
    const oIngredientsSummary = {};
    if (props.ingredients && props.ingredients.length) {
        props.ingredients.forEach(sIngredient => {
            if (sIngredient in oIngredientsSummary) {
                oIngredientsSummary[sIngredient]++;
            } else {
                oIngredientsSummary[sIngredient] = 1;
            }
        });
    }
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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.orderCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinued}>CONFIRM</Button>
        </Aux>
    );
}

export default orderSummary;