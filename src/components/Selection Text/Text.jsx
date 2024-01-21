import { useEffect, useState } from "react";
import "./Text.css";

export default function Text(props) {
  const [isEdit, setEdit] = useState(false);
  const [text, setText] = useState(props.item);

  function resizeEdit() {
    const elements = document.getElementsByClassName("linkedin-content-edit");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.height = "auto";
      elements[i].style.height = elements[i].scrollHeight + "px";
    }
  }

  function handleEditClick(event) {
    setEdit(!isEdit);
    resizeEdit();
  }

  function handleSaveClick(event) {
    setEdit(!isEdit);
    props.setTextData((prevData) => {
      const newData = [...prevData];
      newData[props.index] = text;
      return newData;
    });
  }

  function handleDeleteClick(event) {
    props.setTextData((prev) =>
      prev.filter((item, index) => index !== props.index)
    );
    props.setCheckedCount((prev) => prev - 1);
  }

  function handleOnEnterHover(event) {
    const text_container = event.target.closest(".linkedin-content-text");
    const edit_container = text_container.querySelector(
      ".linkedin-text-edit-container"
    );
    edit_container.style.visibility = "visible";
  }

  function handleOnLeaveHover(event) {
    const text_container = event.target.closest(".linkedin-content-text");
    const edit_container = text_container.querySelector(
      ".linkedin-text-edit-container"
    );
    edit_container.style.visibility = "hidden";
  }

  function handleEdit(e) {
    setText(e.target.value);
    resizeEdit();
  }

  useEffect(() => {
    resizeEdit();
  }, [text, isEdit]);

  return (
    <div
      onMouseEnter={handleOnEnterHover}
      onMouseLeave={handleOnLeaveHover}
      key={props.key}
      className="linkedin-content-text flex-container-column flex-item"
    >
      {isEdit ? (
        <textarea
          onChange={handleEdit}
          value={text}
          className="linkedin-content-edit flex-item"
        />
      ) : null}
      {isEdit ? (
        <div className="linkedin-content-selection-action-cotainer flex-container-row">
          <div
            onClick={handleSaveClick}
            className="selection-action-save selection-action-button "
          >
            Save
          </div>
        </div>
      ) : (
        <p className="markdown-text">{props.item}</p>
      )}
      <div className="linkedin-text-edit-container flex-container-row">
        <img
          onClick={handleEditClick}
          src="/images/edit.png"
          className="linkedin-text-edit-button flex-item"
          alt="edit"
        />
        <img
          onClick={handleDeleteClick}
          src="/images/delete.png"
          className="linkedin-text-edit-button flex-item"
          alt="delete"
        />
      </div>
    </div>
  );
}
