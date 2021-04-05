import Slot from "./Slot"
import s from "./SlotRow.module.css"

function SlotRow (props) {
    let slots = props.obj.map((hour, indx) => <Slot key={`${hour}${indx}`} busy={hour} indx={indx} fn={props.fn} day={props.id}/>)
return (
    <div className={s.container}>{slots}</div>
    
)
}

export default SlotRow