import { Container, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NotFoundPic from "../assets/error_404_head_hit.gif";
import { FaArrowCircleRight } from "react-icons/fa";
import { GoBug } from "react-icons/go";

export default function NoPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found 404</title>
        <meta
          name="description"
          content="Page has not been found. Page Not Found 404 Error. "
        />
      </Helmet>

      <div className="body-404">
        <Container className="centered width-60">
          <img
            className="width-50"
            src={NotFoundPic}
            alt="Person hitting is head"
          />
          <h1 className="h1-error">
            Page Not Found 404 
            {/* <GoBug className="error-icon"></GoBug> */}
          </h1>
        </Container>
        <Link to="/" className="not-underlined">
          <div className="centered">
            <Button variant="outline-secondary" className="button-go-back ">
              <FaArrowCircleRight className="error-icon"></FaArrowCircleRight> Go to the main page
            </Button>
          </div>
        </Link>
      </div>
    </>
  );
}
