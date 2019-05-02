import React from "react";
import styles from "./Backdrop.module.css";

const backDrop = (props) => {
    console.log(props, styles);
    return props.show ? <div className={styles.Backdrop}></div> : null
}

export default backDrop;