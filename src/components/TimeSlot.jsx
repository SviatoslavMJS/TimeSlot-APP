import Registration from "./Registration";
import Login from "./Login";
import { useState } from 'react';

const TimeSlot = (props) => {

    const showRegiter = true;
    const token = props.token > 0;
    const [isToken, setToken] = useState(token);
    const [showRegister, setShowRegister] = useState(showRegiter);

    return (
        isToken
            ? <div className="App">
                <span className="title">PLEASE SELECT TIMESLOT</span>
                <div className="container">
                    <div className="aside">{props.aside}</div>
                    <div className="header">{props.header}</div>
                    <div className="table">{props.slotsRow}</div>
                </div>
                <button className="button" onClick={props.saveData}>SAVE</button>
            </div>
            : (
                showRegister
                    ? <Registration registration={props.register} setShowRegister={setShowRegister} />
                    : <Login login={props.login} setToken={setToken} setShowRegister={setShowRegister} />
            )
    )
}

export default TimeSlot;
