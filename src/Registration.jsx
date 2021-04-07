import {useState} from 'react';

const Registration = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='authorization'>
            <div className="authorization__header">Registration</div>
            <input value={name} setValue={setName} type="text" placeholder= "Enter name"/>
            <input value={password} setValue={setPassword} type="password" placeholder="Password"/>
            <button className="authorization__btn" onClick={props.registration(name, password)}>Registration</button>
        </div>
    );
};

export default Registration;