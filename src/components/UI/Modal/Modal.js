import React from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../Backdrop/Backdrop";

const modal = (props) => (
    <Aux>
        <BackDrop show={props.purchasing}/>
        <div className={styles.Modal}
            style={{
                transform: props.purchasing ? "translateY(0)" : "translateY(-100vh)",
                opactity: props.purchasing ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
)

export default modal;