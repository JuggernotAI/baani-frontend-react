import "./Body.css";
import Chat from "../Chat Section/Chat";
import Selection from "../Selection Section/Selection";
import { useState } from "react";
const chatAPI = require("../../api/chat");

export default function Body() {
  const [checkedCount, setCheckedCount] = useState(0);
  const [textData, setTextData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [selectionLoading, setSelectionLoading] = useState(false);

  function post_on_linkedin(content) {
    setSelectionLoading(true);
    if (imageData.length === 0)
      chatAPI.postOnLinkedIn(content, null).then((response) => {
        setSelectionLoading(false);
        if (response.status === 200) {
          setCheckedCount(0);
          setTextData([]);
          setImageData([]);
          alert("The Content is Successfully Posted on LinkedIn!");
          return true;
        } else {
          alert("Error: " + response.data.message);
          return false;
        }
      });
    else
      chatAPI.postOnLinkedIn(content, imageData[0]).then((response) => {
        setSelectionLoading(false);
        if (response.status === 200) {
          setCheckedCount(0);
          setTextData([]);
          setImageData([]);
          alert("The Content is Successfully Posted on LinkedIn!");
          return true;
        } else {
          alert("Error: " + response.data.message);
          return false;
        }
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
          setTextData={setTextData}
          setImageData={setImageData}
          setCheckedCount={setCheckedCount}
          imageData={imageData}
          loading={selectionLoading}
        />
      ) : null}
    </div>
  );
}
