import React from "react";
import './App.css';
import SlotRow from "./SlotRow";
import { state } from './state';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...state};
    this.changeHourStatus = this.changeHourStatus.bind(this);
  }

  changeHourStatus(day, indx){
    let slotStatus = this.state[day][indx];
    let arr = [...this.state[day]];
    arr[indx] = !slotStatus;
   this.setState({ [day]:[...arr] })
  }

componentWillMount(){
 
}

  render() {
    let state = Object.entries(this.state);
   

   let slotsRow = state.map( item => < SlotRow key={item[0]} id={item[0]} obj={ item[1] } fn={this.changeHourStatus}/>)
  
    return (
      <div className="App">
        <span>Please select timeslot</span>
        
        <div className="container">{ slotsRow }</div>


      </div>
    );
  }
}
export default App;

