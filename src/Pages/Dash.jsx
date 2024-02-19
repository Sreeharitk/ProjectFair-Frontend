import { Col, Container, Row } from "react-bootstrap";
import Header from "../Components/Header";
import MyProjects from "../Components/MyProjects";
import Profile from "../Components/Profile";
import { useEffect, useState } from "react";

function Dash() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"));
    } else {
      setUsername("");
    }
  }, []);
  return (
    <div>
      <Header insideDash />
      <Container fluid style={{ paddingTop: "130px", paddingBottom: "77px" }}>
        <h1 className="mb-5">
          Welcome{" "}
          <span className="text-warning">{username?.split(" ")[0]}</span>
        </h1>
        <Row>
          <Col lg={8}>
            <MyProjects/>
          </Col>
          <Col lg={4}>
            <Profile />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dash;
