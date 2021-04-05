import s from "./Slot.module.css";
import React from "react";


export default class Slot extends React.Component {
    constructor(props) {
        super(props)
    }

    

    render() {
        return (
            <div className={s.slot}
                onMouseDown={(e) => {
                    e.preventDefault()
                   
                    if (e.buttons === 1)  this.props.fn(this.props.day, this.props.indx)
                }}

                onMouseEnter={(e) => {
                    if (e.buttons === 1) this.props.fn(this.props.day, this.props.indx)
                }}

                onMouseOver={(e)=> {if (e.buttons === 1) console.log(e) }}
            >
                { this.props.busy
                    ? <div className={s.red}></div>
                    : <div>{" "}</div>}

            </div>
        )
    }
}