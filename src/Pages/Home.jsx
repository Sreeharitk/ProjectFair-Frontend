import { Col, Container, Row } from "react-bootstrap";
import landingImg from "../assets/landingImg.png";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import "./home.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHomeProjectsAPI } from "../API/allAPI";

function Home() {
  const navigate = useNavigate();
  const [isLoged, setIsLoged] = useState(false);
  const [homeProjects, setHomeProjects] = useState([]);
  const handleNavigate = () => {
    if (isLoged === true) {
      navigate("/projects");
    } else {
      toast.warning("Please log into view more projects");
    }
  };

  //since using an async function directly inside useffect is not standard, we create a seperate function for it
  const getHomeProjects = async () => {
    try {
      const result = await getHomeProjectsAPI();
      if (result.status === 200) {
        setHomeProjects(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(homeProjects);
  useEffect(() => {
    getHomeProjects();
    if (sessionStorage.getItem("token")) {
      setIsLoged(true);
    } else {
      setIsLoged(false);
    }
  }, []);

  return (
    <div>
      {/* landing part */}
      <div
        style={{
          height: "100svb",
          backgroundColor: "#91ed91",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Row>
            <Col lg={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h1 className="fw-bolder mb-4" style={{ fontSize: "70px" }}>
                  <i
                    className="fa-brands fa-stack-overflow fa-bounce me-2"
                    style={{ color: "#121212" }}
                  ></i>
                  Project Fair
                </h1>
                <p style={{ textAlign: "justify" }}>
                  Stop Destination for all Software Development Projects. Where
                  User can add and manage their projects. As well as access all
                  projects available in our website. What are you waiting for! !
                  !
                </p>
                {isLoged ? (
                  <Link
                    to={"/dashboard"}
                    className="btn btn-warning text-light fs-5 shadow-lg"
                  >
                    Manage your projects{" "}
                    <i
                      className="fa-solid fa-arrow-right fa-beat ms-2"
                      style={{ color: "#f7f9fd" }}
                    ></i>
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="btn btn-warning text-light fs-5 shadow-lg"
                  >
                    Start to Explore{" "}
                    <i
                      className="fa-solid fa-arrow-right fa-beat ms-2"
                      style={{ color: "#f7f9fd" }}
                    ></i>
                  </Link>
                )}
              </div>
            </Col>
            <Col lg={6} style={{ display: "flex", justifyContent: "center" }}>
              <img src={landingImg} alt="no image" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>
      {/* projects part */}
      <div className="mt-5">
        <h1 className="text-center">Explore our projects</h1>
        <marquee>
          <div className="Home-projects">
            {homeProjects?.length > 0 ? (
              homeProjects.map((projects, index) => (
                <div key={index} className="d-inline me-5">
                  <ProjectCard projects={projects} />
                </div>
              ))
            ) : (
              <h1>No Projects Available....</h1>
            )}
          </div>
        </marquee>
        <div className="text-center">
          <button
            onClick={handleNavigate}
            className="btn btn-link text-warning fs-4"
          >
            View more projects
          </button>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
    </div>
  );
}

export default Home;
