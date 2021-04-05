import React from "react";
import './App.css';
import SlotRow from "./SlotRow";
import { state } from './state';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...state };
    this.triger = false;
    this.startDay = "";
    this.start = 0;
    this.next = 0;
    this.nextDay = "";

  }

  onMouseDownHandler = (startDay, start) => {

    this.startDay = startDay;
    this.start = start;
    let slotStatus = this.state[startDay][start];
    if (!slotStatus) { this.triger = true }
    else { this.triger = false }
    let arr = [...this.state[startDay]];
    arr[start] = this.triger;
    this.setState({ [startDay]: [...arr] });
  }

  onMouseEnterHandler = (nextDay, next) => {

    this.next = next;
    this.nextDay = nextDay;
    this.check();
  }

  leftAndUp = () => {

    let start = this.start;
    let next = this.next;
    let count = Object.keys(this.state);
    let from = count.indexOf(this.nextDay, 0);
    let to = count.indexOf(this.startDay, 0) + 1;
    let arrDays;
    if (to === 7) {
      arrDays = count.slice(from)
    } else { arrDays = count.slice(from, to) }

    for (let d of arrDays) {

      let range = [];
      let arr = [...this.state[d]];
      for (let i = next; i <= start; i++) range.push(this.triger)
      arr.splice(next, range.length, ...range);
      this.setState({ [d]: [...arr] });

    }
  }

  rightAndUp = () => {

    let start = this.start;
    let next = this.next;
    let count = Object.keys(this.state);
    let from = count.indexOf(this.nextDay, 0);
    let to = count.indexOf(this.startDay, 0) + 1;
    let arrDays;
    if (to === 7) {
      arrDays = count.slice(from)
    } else { arrDays = count.slice(from, to) }

    for (let d of arrDays) {

      let range = [];
      let arr = [...this.state[d]];
      for (let i = next; i >= start; i--) range.push(this.triger)
      arr.splice(start, range.length, ...range);
      this.setState({ [d]: [...arr] });

    }
  }

  rightAndDown = () => {

    let start = this.start;
    let next = this.next;
    let count = Object.keys(this.state);
    let from = count.indexOf(this.startDay, 0);
    let to = count.indexOf(this.nextDay, 0) + 1;
    let arrDays = count.slice(from, to);

    for (let d of arrDays) {

      let range = [];
      let arr = [...this.state[d]];
      for (let i = next; i >= start; i--) range.push(this.triger)
      arr.splice(start, range.length, ...range);
      this.setState({ [d]: [...arr] });

    }
  }

  leftAndDown = () => {

    let start = this.start;
    let next = this.next;
    let count = Object.keys(this.state);
    let from = count.indexOf(this.startDay, 0);
    let to = count.indexOf(this.nextDay, 0) + 1;
    let arrDays = count.slice(from, to);

    for (let d of arrDays) {

      let range = [];
      let arr = [...this.state[d]];
      for (let i = next; i <= start; i++) range.push(this.triger)
      arr.splice(next, range.length, ...range);
      this.setState({ [d]: [...arr] });

    }
  }


  check = () => {

    let start = this.start;
    let next = this.next;
    let count = Object.keys(this.state);
    let nextD = count.indexOf(this.nextDay, 0);
    let startD = count.indexOf(this.startDay, 0);

    if ((start >= next) && (startD <= nextD)) return this.leftAndDown();
    if ((start <= next) && (startD <= nextD)) return this.rightAndDown();
    if ((start >= next) && (startD >= nextD)) return this.leftAndUp();
    if ((start <= next) && (startD >= nextD)) return this.rightAndUp();
  }

  saveData = () => {
    const data = {...this.state};
    console.log(Object.entries(data))
  }

  render() {

    let state = Object.entries(this.state);
    let keys = Object.keys(this.state);
    let values = Object.values(this.state);

    let slotsRow = state.map(item => 
    < SlotRow
      key={item[0]}
      id={item[0]}
      obj={item[1]}
      mouseDown={this.onMouseDownHandler}
      mouseEnter={this.onMouseEnterHandler}
    />);

    let aside = keys.map(day => <div key={day}>{day}</div>)
    let header = values[0].map((hour, ind )=> <div key={`${ind}${String(hour)}`}>{ind + 1}</div>)

    return (
      <div className="App">
        <span className="title">PLEASE SELECT TIMESLOT</span>
        <div className="container">
        <div className="aside">{aside}</div>  
        <div className="header">{header}</div>
        <div className="table">{slotsRow}</div> 
        </div>
        <button className="button" onClick={this.saveData}>SAVE</button>
      </div>
    );
  }
}
export default App;

