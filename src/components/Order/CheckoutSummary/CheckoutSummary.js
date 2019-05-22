import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => (
    <div className={styles.CheckoutSummary}>
        <span>Enjoy your meal!</span>
        <span style={{width: '300px', height: '300px', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </span>
        <span style={{textAlign: "center"}}>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </span>
    </div>
);
export default CheckoutSummary;