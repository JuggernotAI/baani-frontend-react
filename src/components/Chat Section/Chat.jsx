import "./Chat.css";
import Input from "../Chat Input/Input";
import Log from "../Chat Log/Log";
import Preview from "../Media Preview/Preview";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const chatAPI = require("../../api/chat");

export default function Chat(props) {
  const [imagePreviewData, setImagePreviewData] = useState([]);
  const [logs, setLogs] = useState([
    {
      role: "assistant",
      content: "Hello, I'm Juggernot. How can I help you today?",
      type: "text",
    },
  ]);
  const [textAnimation, setTextAnimation] = useState(true);
  const [typing, setTyping] = useState(false);
  const [disableSend, setDisableSend] = useState(true);

  function formatMessage(originalMessage) {
    var urlPattern = /\((https?:\/\/\S+?)\)/g;
    var urls = originalMessage.match(urlPattern);
    let imagesData = [];
    if (urls) {
      urls.forEach(function (url) {
        imagesData.push(url.slice(1, -1));
      });
    } else {
      imagesData = null;
    }
    const text = originalMessage.replace(urlPattern, "");
    return { text, images: imagesData };
  }

  function sendMessage(message) {
    setTyping(true);
    setTextAnimation(true);

    if (cookies.get("init") === undefined) {
      chatAPI.getInit().then((response) => {
        cookies.set("init", response, { path: "/" });
        const newLogs = [
          response,
          ...logs,
          {
            role: "user",
            content: message,
            type: "text",
          },
        ];

        chatAPI.getResponse(newLogs).then((response) => {
          const formattedResponse = formatMessage(response.content);
          let addLogs = [];
          if (formattedResponse.images !== null) {
            formattedResponse.images.forEach((image) => {
              addLogs.push({
                role: "assistant",
                content: image,
                type: "image",
              });
            });
          }
          addLogs.push({
            role: "assistant",
            content: formattedResponse.text,
            type: "text",
          });
          setLogs((prev) => [...prev, ...addLogs]);
          setTyping(false);
        });
      });
    } else {
      const init = cookies.get("init");
      const newLogs = [
        init,
        ...logs,
        {
          role: "user",
          content: message,
          type: "text",
        },
      ];
      chatAPI.getResponse(newLogs).then((response) => {
        const formattedResponse = formatMessage(response.content);
        let addLogs = [];
        if (formattedResponse.images !== null) {
          formattedResponse.images.forEach((image) => {
            addLogs.push({
              role: "assistant",
              content: image,
              type: "image",
            });
          });
        }
        addLogs.push({
          role: "assistant",
          content: formattedResponse.text,
          type: "text",
        });
        setLogs((prev) => [...prev, ...addLogs]);
        setTyping(false);
      });
    }
  }

  return (
    <div className="chat flex-item flex-container-column">
      <Log
        setTextData={props.setTextData}
        setImageData={props.setImageData}
        setCheckedCount={props.setCheckedCount}
        logs={logs}
        setLogs={setLogs}
        animation={textAnimation}
        setAnimation={setTextAnimation}
        typing={typing}
        setTyping={setTyping}
      />
      {imagePreviewData.length > 0 ? (
        <Preview
          imagePreviewData={imagePreviewData}
          setImagePreviewData={setImagePreviewData}
        />
      ) : null}
      <Input
        setLogs={setLogs}
        sendMessage={sendMessage}
        setImagePreviewData={setImagePreviewData}
        disableSend={disableSend}
        setDisableSend={setDisableSend}
        typing={typing}
      />
    </div>
  );
}
