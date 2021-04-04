import s from "./Slot.module.css";
import React from "react";


export default class Slot extends React.Component {
   constructor(props){
       super(props)
   }

   handleEnter = () => { this.props.fn(this.props.day, this.props.indx);
console.log(this.props.day, this.props.indx) }

    render(){
    return (
      <div className={s.slot} onClick={this.handleEnter}>
          { this.props.busy 
          ? <div className={s.red}>{this.props.indx}</div> 
          : <div >{this.props.indx}</div> }

       </div>
    )}
  }