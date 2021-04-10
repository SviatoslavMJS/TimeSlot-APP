import React from "react";
import '../styles/App.css';
import SlotRow from "./SlotRow";
import { state } from '../state';
import TimeSlot from "./TimeSlot";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { ...state };
    this.triger = false;
    this.startDay = "";
    this.start = 0;
    this.next = 0;
    this.nextDay = "";
    this.token = "";
    this.user_id = null;
  }

  get isAuthorized() { return !!this.token; }

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

  saveData = async () => {
    const authorization = this.token ? { 'Authorization': `Bearer ${this.token}` } : {};

    const response = await (fetch('http://localhost:5000/timeslot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...authorization,
      },
      body: JSON.stringify({ value: JSON.stringify(this.state) })
    }));

    alert(response.ok ? 'Saved suceessfully' : 'Something is wrong');

  }

  getSlots = async () => {
    try {
      const authorization = this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
      const response = await (fetch('http://localhost:5000/timeslot', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          ...authorization,
        },
      }));

      const data = await response.json();

      if (!data.length) {
        return;
      }

      this.setState(data[0].value);

    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  login = async (name, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth', {
        method: "POST",
        body: JSON.stringify({ username: name, password }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (!response.ok) { return false; }

      const json = await response.json();

      this.token = json.token;

      await this.getSlots();
      return true;

    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  register = async (name, password) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: "POST",
        body: JSON.stringify({ username: name, password }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      return response?.ok;

    } catch (error) {
      alert(JSON.stringify(error));
    }
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
    let header = values[0].map((hour, ind) => <div key={`${ind}${String(hour)}`}>{ind + 1}</div>)

    return (
      <div className="App">
        <TimeSlot aside={aside}
          header={header}
          slotsRow={slotsRow}
          saveData={this.saveData}
          login={this.login}
          register={this.register}
        />
      </div>
    );
  }
}

export default App;

