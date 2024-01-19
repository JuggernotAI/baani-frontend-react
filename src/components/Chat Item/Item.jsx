import { useEffect, useState } from "react";
import "./Item.css";

export default function Item(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let index = 0;
    const messageLength = props.data.content.length;

    if (
      props.data.role === "assistant" &&
      props.animation
      // props.key === props.length - 1
    ) {
      const animateMessage = () => {
        if (index <= messageLength) {
          setMessage(props.data.content.substring(0, index));
          index++;
        }
      };

      const intervalId = setInterval(animateMessage, 50);

      return () => {
        clearInterval(intervalId);
        props.setAnimation(false);
      };
    } else setMessage(props.data.content);
  }, []);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    handleSelections();
    props.setCheckedCount((prev) => {
      if (isChecked) return prev - 1;
      else return prev + 1;
    });
  }

  function handleSelections() {
    if (!isChecked) {
      if (props.type === "text") {
        // if props.data.content starts with [Final Content Twitter] or [Final Content LinkedIn], then remove the brackets and the text inside
        if (props.data.content.startsWith("[Final Content")) {
          const index = props.data.content.indexOf("]");
          const content = props.data.content.substring(index + 1);
          props.setTextData((prev) => [...prev, content]);
        } else props.setTextData((prev) => [...prev, props.data.content]);
      } else props.setImageData((prev) => [...prev, props.data.content]);
    } else {
      if (props.type === "text") {
        if (props.data.content.startsWith("[Final Content")) {
          const index = props.data.content.indexOf("]");
          const content = props.data.content.substring(index + 1);
          props.setTextData((prev) => prev.filter((item) => item !== content));
        } else
          props.setTextData((prev) =>
            prev.filter((item) => item !== props.data.content)
          );
      } else
        props.setImageData((prev) =>
          prev.filter((item) => item !== props.data.content)
        );
    }
  }

  function handleOnEnterHover(event) {
    const chat_item = event.target.closest(".chat-item");
    const checkbox_container = chat_item.querySelector(
      ".chat-item-checkbox-container"
    );
    checkbox_container.style.visibility = "visible";
  }

  function handleOnLeaveHover(event) {
    const chat_item = event.target.closest(".chat-item");
    const checkbox_container = chat_item.querySelector(
      ".chat-item-checkbox-container"
    );
    if (!isChecked) checkbox_container.style.visibility = "hidden";
  }

  return (
    <div
      onMouseEnter={handleOnEnterHover}
      onMouseLeave={handleOnLeaveHover}
      className="chat-item flex-container-row"
    >
      <div className="chat-item-avatar-container flex-container-column">
        <img
          className="chat-item-avatar"
          src={
            props.data.role === "user"
              ? "/images/user-light.png"
              : "/images/juggernot-logo.png"
          }
          alt="avatar"
        />
      </div>
      <div className="chat-item-content-container flex-container-column">
        <section className="chat-item-content flex-item flex-container-column">
          {props.type === "text" ? (
            <div>{message}</div>
          ) : (
            <img
              className="chat-item-content-image"
              src={props.data.content}
              alt="check"
            />
          )}
        </section>
      </div>
      <div className="chat-item-checkbox-container flex-container-column">
        <input
          onInput={handleCheckboxChange}
          type="checkbox"
          className="chat-item-checkbox flex-item"
        />
      </div>
    </div>
  );
}
