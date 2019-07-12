import React from "react";
import styles from "./Toolbar.module.css";
import LOGO from "../../Logo/Logo";
import Button from "../../UI/Button/Button";
import { NavLink } from 'react-router-dom';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <LOGO />
        <nav>
            <NavLink 
                to="/"
                exact={props.exact}><Button>New Burger</Button></NavLink>
            <NavLink 
                to="/orders"
                exact={props.exact}><Button>My Orders</Button></NavLink>
        </nav>
    </header>
)

export default toolbar;