import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import addImg from "../assets/addImg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from "../API/allAPI";
import { addResponseContext } from "../Context/ContextShare";

function AddProjects() {
  const {setAddResponse} = useContext(addResponseContext)
  const [projectData, setProjectData] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectImage: "",
  });
  // console.log(projectData);

  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [preview, setPreview] = useState(addImg);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectImage: "",
    });
    setPreview(addImg);
  };
  const handleShow = () => setShow(true);

  const handleAddProject = async () => {
    const { title, languages, overview, github, website, projectImage } =
      projectData;
    if (title && languages && overview && github && website && projectImage) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("projectImage", projectImage);

      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            // toast.success(`New project ${result.data.title} has been added`)
            //share data to context
            setAddResponse(result.data)
            handleClose();
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }

        console.log("proceed to add project api");
      }
    } else {
      toast.warning("please provide all project details");
    }
  };

  useEffect(() => {
    if (
      projectData.projectImage?.type == "image/png" ||
      projectData.projectImage?.type == "image/jpg" ||
      projectData.projectImage?.type == "image/jpeg"
    ) {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setImageFileStatus(false);
      setProjectData({ ...projectData, projectImage: "" });
      setPreview(addImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData.projectImage]);

  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        Add projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col lg={6}>
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectImage: e.target.files[0],
                      })
                    }
                  />
                  <img
                    src={preview}
                    alt="Project image"
                    className="img-fluid"
                  />
                </label>
                {!imageFileStatus && (
                  <div className="text-danger">
                    *Upload only the given file types (jpeg, jpg, png)*
                  </div>
                )}
              </Col>
              <Col lg={6}>
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  <input
                    type="text"
                    className="w-100 form-control border-dark"
                    placeholder="Project Title"
                    value={projectData.title}
                    onChange={(e) =>
                      setProjectData({ ...projectData, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-100 form-control mt-3 border-dark"
                    placeholder="Language Used"
                    value={projectData.languages}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        languages: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="w-100 form-control mt-3 border-dark"
                    placeholder="Github Link"
                    value={projectData.github}
                    onChange={(e) =>
                      setProjectData({ ...projectData, github: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-100 form-control mt-3 border-dark"
                    placeholder="Website Link"
                    value={projectData.website}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        website: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="w-100 form-control mt-3 border-dark"
                    placeholder="Project Overview"
                    value={projectData.overview}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        overview: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
    </div>
  );
}

export default AddProjects;
