import "./Actions.css";

export default function Actions(props) {
  function post_on_linkedin() {
    const content = props.textData.join("\n");
    props.post(content);
  }

  return (
    <div className="actions-bar flex-container-row">
      <section
        onClick={post_on_linkedin}
        className="action-button send-button flex-item"
      >
        <img className="send-icon" src="/images/send.png" alt="send"></img>Send
      </section>
    </div>
  );
}
