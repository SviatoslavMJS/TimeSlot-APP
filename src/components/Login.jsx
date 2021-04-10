import { useState } from 'react';
import s from "../styles/Login.module.css"

const Login = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = async () => {
        setErrorMessage('');
        const loggedIn = await props.login(name, password);
        props.setToken(loggedIn);

        setErrorMessage(loggedIn ? null : 'Something is wrong. Please try again');
    }

    return (
        <form className={s.login}>
            <div className={s.login__header}>
                Sign In
            </div>
            <input className={s.login__input} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
            <input className={s.login__input} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button type={'button'} disabled={!name || !password} className={s.login__btn} onClick={() => login()}>Login</button>
            <a className={s.login__link} onClick={() => props.setShowRegister(true)}>Go To Register</a>
            <div className={s.login__error}>{errorMessage}</div>
        </form>
    );
};

export default Login;
