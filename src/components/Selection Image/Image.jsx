import "./Image.css";

export default function Image(props) {
  function handleDeleteClick(event) {
    props.setImageData((prev) =>
      prev.filter((item, index) => index !== props.index)
    );
    props.setCheckedCount((prev) => prev - 1);
  }

  function handleOnEnterHover(event) {
    const text_container = event.target.closest(".linkedin-content-images");
    const edit_container = text_container.querySelector(
      ".linkedin-text-edit-container"
    );
    edit_container.style.visibility = "visible";
  }

  function handleOnLeaveHover(event) {
    const text_container = event.target.closest(".linkedin-content-images");
    const edit_container = text_container.querySelector(
      ".linkedin-text-edit-container"
    );
    edit_container.style.visibility = "hidden";
  }

  return (
    <div
      onMouseEnter={handleOnEnterHover}
      onMouseLeave={handleOnLeaveHover}
      key={props.key}
      className="linkedin-content-images flex-container-column flex-item"
    >
      <img
        className="linkedin-content-image flex-item"
        src={props.item}
        alt="linkedin-content"
      />
      <div className="linkedin-text-edit-container flex-container-row">
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
