import "./Preview.css";

export default function Preview(props) {
  function removeImage(e) {
    props.setImagePreviewData((prev) => {
      const index = e.target.getAttribute("data");
      const newPreviewData = [...prev];
      newPreviewData.splice(index, 1);
      return newPreviewData;
    });
  }

  return (
    <div className="preview-container flex-item flex-container-row">
      {props.imagePreviewData.map((imageData, index) => (
        <div className="preview-image-container">
          <span
            className="image-remove-button"
            data={index}
            onClick={removeImage}
          >
            X
          </span>
          <img className="preview-image" src={imageData} alt="preview" />
        </div>
      ))}
    </div>
  );
}
