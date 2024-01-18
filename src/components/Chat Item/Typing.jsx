import "./Item.css";
import "./Typing.css";

export default function Typing(props) {
  return (
    <div className="chat-item flex-container-row">
      <div className="chat-item-avatar-container flex-container-column">
        <img
          className="chat-item-avatar"
          src="/images/juggernot-logo.png"
          alt="avatar"
        />
      </div>
      <div className="chat-item-content-container flex-container-column">
        <section className="chat-item-content typing-animation-container flex-item flex-container-row">
          <div className="typing dot1"></div>
          <div className="typing dot2"></div>
          <div className="typing dot3"></div>
        </section>
      </div>
    </div>
  );
}
