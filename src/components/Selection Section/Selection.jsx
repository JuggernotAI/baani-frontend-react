import Actions from "../Actions Bar/Actions";
import Text from "../Selection Text/Text";
import "./Selection.css";
import Image from "../Selection Image/Image";

export default function Selection(props) {
  return !props.loading ? (
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
            <Image
              setCheckedCount={props.setCheckedCount}
              setImageData={props.setImageData}
              key={index}
              index={index}
              item={item}
            />
          ))}
          {props.textData.map((item, index) => (
            <Text
              setCheckedCount={props.setCheckedCount}
              setTextData={props.setTextData}
              key={index}
              index={index}
              item={item}
            />
          ))}
        </div>
      </div>
      <Actions textData={props.textData} post={props.post} />
    </div>
  ) : (
    <div className="selection-loader-container flex-container-column">
      <img
        src="/images/loading-white.gif"
        alt="loader"
        className="selection-loader"
      />
      <div className="selection-loader-text">Posting...</div>
    </div>
  );
}
