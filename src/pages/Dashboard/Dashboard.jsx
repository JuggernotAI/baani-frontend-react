import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/Page Body/Body";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Baani | Juggernot.ai";
  }, []);

  return (
    <div className="dashboard flex-container-column">
      <Navbar />
      <Body />
    </div>
  );
}
