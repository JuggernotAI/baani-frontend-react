import "./Navbar.css";

export default function Navbar() {
  function reDirectToCompanySite() {
    window.open("https://juggernot.ai/", "_blank");
  }

  return (
    <nav className="navbar flex-container-row">
      <img
        onClick={reDirectToCompanySite}
        className="navbar-logo flex-item"
        src="images/logo.png"
        alt="logo"
      />
    </nav>
  );
}
