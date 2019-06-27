import React from 'react';
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.Input];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    switch (props.elType) {
        case ('input'):
            inputElement = <input {...props.elConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select value={props.value} className={inputClasses.join(' ')} onChange={props.changed}>
                    {props.elConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default: 
            inputElement = <textarea {...props.elConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;