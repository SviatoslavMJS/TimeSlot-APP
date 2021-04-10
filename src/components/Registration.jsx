import { useState } from 'react';
import s from "../styles/Registration.module.css"

const Registration = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const register = async () => {
        setErrorMessage('');
        const registered = await props.registration(name, password);

        setErrorMessage(registered ? null : 'Something is wrong. Please try again');

        props.setShowRegister(!registered);
    };

    const isPasswordValid = () => {
        return password && passwordConfirm && passwordConfirm === password;
    }   

    return (
        <form className={s.registration}>
            <div className={s.registration__header}>
                Registration
            </div>
            <input required={true} className={s.registration__input} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
            <input required={true} className={s.registration__input} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
            <input required={true} className={s.registration__input} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="Confirm Password" />

            <button type={'button'} disabled={!name || !password || !passwordConfirm} className={s.registration__btn} onClick={() => register()}>Register</button>
            <a className={s.registration__link} onClick={() => props.setShowRegister(false)}>Go To Sign In</a>
            <div className={s.registration__error}>
                {errorMessage}
                {isPasswordValid() ? '' : 'Passwords are not equal.'}
            </div>

        </form>
    );
};

export default Registration;
