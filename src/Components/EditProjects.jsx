/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SERVER_URL from "../API/serverURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProjectAPI } from "../API/allAPI";
import { updateResponseContext } from "../Context/ContextShare";
// import addImg from "../assets/addImg.png";

// eslint-disable-next-line react/prop-types
function EditProjects({ projects }) {
  const [projectData, setProjectData] = useState({
    id: projects?._id,
    title: projects?.title,
    languages: projects?.languages,
    overview: projects?.overview,
    github: projects?.github,
    website: projects?.website,
    projectImage: "",
  });
  // console.log(projectData);
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);
  const { setUpdateResponse } = useContext(updateResponseContext);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      id: projects?._id,
      title: projects?.title,
      languages: projects?.languages,
      overview: projects?.overview,
      github: projects?.github,
      website: projects?.website,
      projectImage: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);

  const handleProjectUpdate = async () => {
    const { id, title, languages, overview, github, website, projectImage } =
      projectData;

    if (!title || !languages || !overview || !github || !website) {
      toast.info("Please fill the details!!");
    } else {
      //proceed to api
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", projects.projectImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await updateProjectAPI(id, reqBody, reqHeader);
          if (result.status == 200) {
            handleClose();
            //share data to my projects
            setUpdateResponse(result.data);
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
  }, [projectData.projectImage]);

  return (
    <div>
      <button
        className="btn-link btn"
        style={{ color: "#f8bc07" }}
        onClick={handleShow}
      >
        <i className="fa-solid fa-pen-to-square fa-2xl"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
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
                    src={
                      preview
                        ? preview
                        : `${SERVER_URL}/uploads/${projects?.projectImage}`
                    }
                    alt="Project image"
                    height={"300px"}
                    width={"100%"}
                  />
                </label>
              </Col>
              <Col lg={6}>
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  <input
                    type="text"
                    className="w-100 form-control border-dark"
                    placeholder="Project title"
                    value={projectData?.title}
                    onChange={(e) =>
                      setProjectData({ ...projectData, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-100 form-control mt-3 border-dark"
                    placeholder="Language Used"
                    value={projectData?.languages}
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
                    value={projectData?.github}
                    onChange={(e) =>
                      setProjectData({ ...projectData, github: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-100 form-control mt-3 border-dark"
                    placeholder="Website Link"
                    value={projectData?.website}
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
                    value={projectData?.overview}
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
          <Button variant="warning" onClick={handleProjectUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
    </div>
  );
}

export default EditProjects;
