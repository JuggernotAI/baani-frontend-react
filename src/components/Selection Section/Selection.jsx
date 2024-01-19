import Actions from "../Actions Bar/Actions";
import "./Selection.css";

export default function Selection(props) {
  return (
    <div className="selection flex-container-column">
      <section className="flex-item selection-header">Selection</section>
      <div className="flex-item linkedin-container">
        <div className="linkedin-header flex-container-row">
          <div className="flex-container-row flex-item">
            <div className="linkedin-avatar-container flex-container-column">
              <img
                className="linkedin-avatar flex-item"
                src="/images/juggernot-logo.png"
                alt="linkedin-icon"
              />
            </div>
            <div className="linkedin-name-container flex-container-column flex-item">
              <div className="linkedin-name">Juggernot</div>
              <div className="linkedin-title">Intern at Juggernot</div>
            </div>
          </div>
          <img
            className="linkedin-icon flex-item"
            src="/images/linkedin-icon.png"
            alt="linkedin-icon"
          />
        </div>
        <div className="linkedin-content flex-container-column">
          {props.imageData.map((item, index) => (
            <img
              key={index}
              className="linkedin-content-image flex-item"
              src={item}
              alt="linkedin-content"
            />
          ))}
          {props.textData.map((item, index) => (
            <div key={index} className="linkedin-content-text flex-item">
              {item}
            </div>
          ))}
        </div>
      </div>
      <Actions post={props.post} />
    </div>
  );
}
