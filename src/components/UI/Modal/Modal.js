import React, { Component } from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../Backdrop/Backdrop";

class Modal extends Component  {
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.purchasing !== this.props.purchasing
        || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <Aux>
                <BackDrop show={this.props.purchasing} clicked={this.props.hideModal}/>
                <div className={styles.Modal}
                    style={{
                        transform: this.props.purchasing ? "translateY(0)" : "translateY(-100vh)",
                        opactity: this.props.purchasing ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
        
}

export default Modal;