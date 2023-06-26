import React from 'react';
import s from '../input/MyInput.module.css'

const MyInput = (props) => {
    return (
        <input className={s.input} {...props}>

        </input>
    );
};

export default MyInput;