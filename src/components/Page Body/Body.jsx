import "./Body.css";
import Chat from "../Chat Section/Chat";
import Selection from "../Selection Section/Selection";
import { useState } from "react";
const chatAPI = require("../../api/chat");

export default function Body() {
  const [checkedCount, setCheckedCount] = useState(0);
  const [textData, setTextData] = useState([]);
  const [imageData, setImageData] = useState([]);

  function post_on_linkedin(content) {
    chatAPI.postOnLinkedIn(content).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="body flex-item flex-container-row">
      <Chat
        setTextData={setTextData}
        setImageData={setImageData}
        setCheckedCount={setCheckedCount}
      />
      {checkedCount > 0 ? (
        <Selection
          post={post_on_linkedin}
          textData={textData}
          imageData={imageData}
        />
      ) : null}
    </div>
  );
}
