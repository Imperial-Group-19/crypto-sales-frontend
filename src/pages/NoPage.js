import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotFoundPic from "../components/components_graphics/error_404_head_hit.gif";
import "../App.css";

export default function NoPage() {
  return (
    <div className="body_404">
      <Container className="centered width_60">
        <img
          className="width_50"
          src={NotFoundPic}
          alt="Person hitting is head"
        />
        <h1 className="font">Page Not Found 404</h1>
      </Container>
      <br></br>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="centered">
          <Button variant="outline-secondary" className="font_go_back">
            Go to the main page
          </Button>
        </div>
      </Link>
    </div>
  );
}
