import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{ backgroundColor: "#91ed91", color: "black", padding: "20px" }}
      className="mt-5"
    >
      <Container>
        <Row>
          <Col style={{ paddingRight: "30px" }}>
            <h4 className="fw-bolder">
            <i className="fa-brands fa-stack-overflow fa-bounce me-2" style={{color: "#121212"}}></i>Project Fair
            </h4>
            <p>
              Desinged and built with React.js with atmost care and affection
            </p>
            <p>Currently v1.0.0</p>
          </Col>
          <Col>
            <h4 className="fw-bolder">Links</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "16px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "16px",
                }}
                to={"/"}
              >
                Home
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "16px",
                }}
                to={"/login"}
              >
                Login
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/register"}
              >
                Register
              </Link>
            </div>
          </Col>
          <Col>
            <h4 className="fw-bolder">Guides</h4>
            <p>React</p>
            <p>React Bootstrap</p>
            <p>Routing</p>
          </Col>
          <Col>
            <h4 className="fw-bolder">Contact us</h4>
            <Form.Control type="email" placeholder="Enter email" />
            <Button variant="warning" className="w-100 mt-2">
              Submit
            </Button>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <i className="fa-brands fa-lg fa-linkedin-in"></i>
              <i className="fa-brands fa-lg fa-twitter"></i>
              <i className="fa-brands fa-lg fa-facebook-f"></i>
              <i className="fa-solid fa-lg fa-envelope"></i>
              <i className="fa-brands fa-lg fa-github"></i>
            </div>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        <p style={{ margin: "0" }}>
          Copyright &copy; 2024 Project Fair. Built with React.{" "}
        </p>
      </div>
    </div>
  );
}

export default Footer;
