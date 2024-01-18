import "./Body.css";
import Chat from "../Chat Section/Chat";
import Selection from "../Selection Section/Selection";
import { useState } from "react";

export default function Body() {
  const [checkedCount, setCheckedCount] = useState(0);
  const [textData, setTextData] = useState([]);
  const [imageData, setImageData] = useState([]);

  return (
    <div className="body flex-item flex-container-row">
      <Chat
        setTextData={setTextData}
        setImageData={setImageData}
        setCheckedCount={setCheckedCount}
      />
      {checkedCount > 0 ? (
        <Selection textData={textData} imageData={imageData} />
      ) : null}
    </div>
  );
}
