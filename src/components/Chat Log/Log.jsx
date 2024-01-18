import Item from "../Chat Item/Item";
import Typing from "../Chat Item/Typing";
import "./Log.css";

export default function Log(props) {
  return (
    <div className="chat-log-container flex-item flex-container-column">
      <div className="chat-log flex-item flex-container-column">
        {props.logs.map((log, index) => (
          <Item
            key={index}
            type="text"
            data={log}
            length={props.logs.length}
            setCheckedCount={props.setCheckedCount}
            setTextData={props.setTextData}
            setImageData={props.setImageData}
            animation={props.animation}
            setAnimation={props.setAnimation}
          />
        ))}
        {props.typing ? <Typing /> : null}
      </div>
    </div>
  );
}
