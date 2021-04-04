import Slot from "./Slot"

function SlotRow (props) {
    let slots = props.obj.map((hour, indx)=> <Slot key={`${hour}${indx}`} busy={hour} indx={indx} fn={props.fn} day={props.id}/>)
return (
    <div>{slots}</div>
    
)
}

export default SlotRow