/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";
import SERVER_URL from "../API/serverURL";

// eslint-disable-next-line react/prop-types
function ProjectCard({ projects }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card
        style={{ width: "25rem" }}
        className="mb-5 mt-3 shadow btn"
        onClick={handleShow}
      >
        <Card.Img
          variant="top"
          src={`${SERVER_URL}/uploads/${projects?.projectImage}`}
          alt="no image"
          height={"250px"}
          width={"100%"}
        />
        <Card.Body>
          <Card.Title>{projects?.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <img
                  height={"250px"}
                  width={"100%"}
                  src={`${SERVER_URL}/uploads/${projects?.projectImage}`}
                  alt="Project image"
                />
              </Col>
              <Col>
                <h3>{projects?.title}</h3>
                <p className="fw-bolder">
                  Project Overview:{" "}
                  <span className="text-justify fw-normal">
                    {projects?.overview}
                  </span>
                </p>
                <p className="fw-bolder">
                  Technologies Used:{" "}
                  <span className="fw-normal text-danger">
                    {projects?.languages}
                  </span>
                </p>
              </Col>
            </Row>
            <div className="mt-3">
              <a
                className="me-3"
                href={projects?.github}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github fa-2xl text-dark"></i>
              </a>
              <a href={projects?.website} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-link fa-2xl text-dark"></i>
              </a>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProjectCard;
