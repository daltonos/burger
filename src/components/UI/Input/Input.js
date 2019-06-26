import React from 'react';
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    switch (props.elType) {
        case ('input'):
            inputElement = <input {...props.elConfig} className={styles.InputElement} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elConfig} className={styles.InputElement} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select value={props.value} className={styles.InputElement} onChange={props.changed}>
                    {props.elConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default: 
            inputElement = <textarea {...props.elConfig} className={styles.InputElement} value={props.value} onChange={props.changed}/>;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;