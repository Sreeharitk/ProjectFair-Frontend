import { Col, Container, Row } from "react-bootstrap";
import Header from "../Components/Header";
import ProjectCard from "../Components/ProjectCard";
import { useEffect, useState } from "react";
import { getAllProjectsAPI } from "../API/allAPI";

function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAllProjectsAPI(searchKey, reqHeader);
        if (result.status === 200) {
          setAllProjects(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(allProjects);
  useEffect(() => {
    getAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  return (
    <div>
      <Header />

      <Container fluid style={{ paddingTop: "130px" }}>
        <div className="d-flex flex-column align-items-center">
          <h1 className="mb-3">All Projects</h1>
          <input
            className="form-control w-25 p-2 shadow"
            type="text"
            placeholder="Search by technologies used"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <Row className="mt-5">
          {allProjects?.length > 0 ? (
            allProjects.map((projects, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                <ProjectCard projects={projects} />
              </Col>
            ))
          ) : (
            <h1 className="text-center" style={{ paddingBottom: "150px" }}>
              Nothing to see here....
            </h1>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
