import React from "react";
import styles from "./Toolbar.module.css";
import LOGO from "../../Logo/Logo";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <LOGO />
        <nav>...</nav>
    </header>
)

export default toolbar;