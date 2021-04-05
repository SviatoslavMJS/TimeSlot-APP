import s from "./Slot.module.css";
import React from "react";


export default function Slot (props) {
   
   
        return (
            <div className={s.slot}
                onMouseDown={(e) => {
                    e.preventDefault()
                    if (e.buttons === 1) props.mouseDown(props.day, props.indx)
                }}
                onMouseEnter={(e) => {
                    if (e.buttons === 1) props.mouseEnter(props.day, props.indx)
                }}>
            
                { props.busy
                    ? <div className={s.red}></div>
                    : <div>{" "}</div>}

            </div>
        )
    }
