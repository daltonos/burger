import React from "react";
import styles from "./Toolbar.module.css";
import LOGO from "../../Logo/Logo";
import Button from "../../UI/Button/Button";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <LOGO />
        <nav>
            <Button>Builder</Button>
            <Button>Checkout</Button>
        </nav>
    </header>
)

export default toolbar;