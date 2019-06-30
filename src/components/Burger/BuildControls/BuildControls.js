import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const aControls = [
    {label: "Cheese", type: "cheese"},
    {label: "Salad", type: "salad"},
    {label: "Meat", type: "meat"},
    {label: "Bacon", type: "bacon"}
];
const buildControls = (props) => {
    return (
        <div className={styles.BuildControls} style={{textAlign: "center"}}>
            <p>Price: {props.price.toFixed(2)}</p>
            {aControls.map(oControl => (
                <BuildControl
                    key={oControl.label}
                    label={oControl.label}
                    added={() => props.addedIngredient(oControl.type)}
                    removed={() => props.removedIngredient(oControl.type)}
                    disabled={props.disabled[oControl.type]}/>
            ))}
            <button  className={styles.PurchaseButton}
                onClick={props.showOrder}
                disabled={props.purchasable}
                >Place Order</button>
        </div>
    );
};

export default buildControls;