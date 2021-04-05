import React from "react";
import './App.css';
import SlotRow from "./SlotRow";
import { state } from './state';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...state };
    this.changeHourStatus = this.changeHourStatus.bind(this);
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  changeHourStatus(day, indx) {
    let slotStatus = this.state[day][indx];
    let arr = [...this.state[day]];
    arr[indx] = !slotStatus;
  
    let vector = this.vector();
    vector()
  }



  vector = (start = 20, startDay = "sunday", next = 0, nextDay = "wednesday") => {

    let count = Object.keys(this.state);
    let nextD = count.indexOf(nextDay, 0);
    let startD = count.indexOf(startDay, 0);

    let leftAndUp = () => {
      let count = Object.keys(this.state);
      let from = count.indexOf(nextDay, 0);
      let to = count.indexOf(startDay, 0) + 1;
      let arrDays;
      if (to === 7) {
        arrDays = count.slice(from)
      } else { arrDays = count.slice(from, to) }

      for (let d of arrDays) {

        let range = [];
        let triger = true;
        let arr = [...this.state[d]];
        for (let i = next; i <= start; i++) range.push(triger)
        arr.splice(next, range.length, ...range);
        this.setState({ [d]: [...arr] });

      }
    }


    let rightAndUp = () => {
      let count = Object.keys(this.state);
      let from = count.indexOf(nextDay, 0);
      let to = count.indexOf(startDay, 0) + 1;
      let arrDays;
      if (to === 7) {
        arrDays = count.slice(from)
      } else { arrDays = count.slice(from, to) }

      for (let d of arrDays) {

        let range = [];
        let triger = true;
        let arr = [...this.state[d]];
        for (let i = next; i >= start; i--) range.push(triger)
        arr.splice(start, range.length, ...range);
        this.setState({ [d]: [...arr] });

      }
    }


    let rightAndDown = () => {
      let count = Object.keys(this.state);
      let from = count.indexOf(startDay, 0);
      let to = count.indexOf(nextDay, 0) + 1;
      let arrDays = count.slice(from, to);

      for (let d of arrDays) {

        let range = [];
        let triger = true;
        let arr = [...this.state[d]];
        for (let i = next; i >= start; i--) range.push(triger)
        arr.splice(start, range.length, ...range);
        this.setState({ [d]: [...arr] });

      }
    }

    let leftAndDown = () => {
      let count = Object.keys(this.state);
      let from = count.indexOf(startDay, 0);
      let to = count.indexOf(nextDay, 0) + 1;
      let arrDays = count.slice(from, to);

      for (let d of arrDays) {

        let range = [];
        let triger = true;
        let arr = [...this.state[d]];
        for (let i = next; i <= start; i++) range.push(triger)
        arr.splice(next, range.length, ...range);
        this.setState({ [d]: [...arr] });

      }
    }

    if ((start > next) && (startD < nextD)) return leftAndDown//console.log( "<=" );
    if ((start < next) && (startD < nextD)) return rightAndDown//console.log( "=>" ) ;
    if ((start > next) && (startD > nextD)) return leftAndUp//console.log( "down" );
    if ((start < next) && (startD > nextD)) return rightAndUp//console.log( "up" );
  }

  render() {
    let state = Object.entries(this.state);


    let slotsRow = state.map(item => <div key={item}><div key={item} className="day">{item}</div>< SlotRow key={item[0]} id={item[0]} obj={item[1]} fn={this.changeHourStatus} /></div>)

    return (
      <div className="App">
        <span>Please select timeslot</span>

        <div className="container">{slotsRow}</div>


      </div>
    );
  }
}
export default App;

