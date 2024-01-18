import { useRef, useState } from "react";
import "./Input.css";

export default function Input(props) {
  const [message, setMessage] = useState("");

  function resizeInput() {
    const elements = document.getElementsByClassName("input-text");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.height = elements[i].style.fontSize;
      elements[i].style.height = elements[i].scrollHeight + "px";
    }
  }

  function handleInput(e) {
    setMessage(e.target.value);
    if (e.target.value.trim() === "") props.setDisableSend(true);
    else props.setDisableSend(false);
    resizeInput();
  }

  function checkKey(e) {
    if (e.key === "Enter") sendMessage();
  }

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        props.setImagePreviewData((prev) => [...prev, reader.result]);
        console.log(reader.result); //to be removed
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      props.setLogs((prev) => [
        ...prev,
        {
          role: "user",
          content: message,
        },
      ]);
      setMessage("");
      resizeInput();
      props.sendMessage(message);
      props.setDisableSend(true);
    }
  };

  return (
    <div className="input-container flex-container-row">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <img
        className="attachment-icon flex-item"
        src="images/attachment.png"
        alt="attachment"
        onClick={handleImageClick}
      />
      <textarea
        className="input-text flex-item"
        type="text"
        id="chatbot-input-text"
        onChange={handleInput}
        onKeyDown={checkKey}
        value={message}
        placeholder="Type a message"
      />
      <img
        onClick={sendMessage}
        className={`send-icon flex-item ${
          props.disableSend || props.typing ? "disabled" : ""
        }`}
        src="images/send.png"
        alt="send"
      />
    </div>
  );
}
