import { useContext, useEffect, useState } from "react";
import AddProjects from "./AddProjects";
import EditProjects from "./EditProjects";
import { deleteProjectAPI, getUserProjectsAPI } from "../API/allAPI";
import {
  addResponseContext,
  updateResponseContext,
} from "../Context/ContextShare";

function MyProjects() {
  const { addResponse } = useContext(addResponseContext);
  const { updateResponse } = useContext(updateResponseContext);
  const [userProjects, setUserProjects] = useState([]);

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token");
    try {
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const result = await getUserProjectsAPI(reqHeader);
        if (result.status === 200) {
          setUserProjects(result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userProjects);

  const handleDeleteProject = async (projectID) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await deleteProjectAPI(projectID, reqHeader);
        if (result.status == 200) {
          getUserProjects();
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserProjects();
  }, [addResponse, updateResponse]);
  return (
    <div className="rounded p-3 border border-dark">
      <div className="d-flex justify-content-between">
        <h2>Project Details</h2>
        <AddProjects />
      </div>
      <div className="mt-5">
        {userProjects?.length > 0 ? (
          userProjects.map((projects, index) => (
            <div
              key={index}
              className="d-flex justify-content-between border p-2 rounded mb-3 shadow-lg"
            >
              <h3>{projects?.title}</h3>
              <div className="d-flex align-items-center">
                <EditProjects projects={projects} />
                <a
                  className="me-3 ms-3"
                  href={projects?.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-github fa-2xl text-dark"></i>
                </a>
                <button
                  className="btn"
                  onClick={() => handleDeleteProject(projects?._id)}
                >
                  <i
                    className="fa-solid fa-trash fa-xl"
                    style={{ color: "#111212" }}
                  ></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-between border p-2 rounded">
            <h3>Project name</h3>
            <div className="d-flex align-items-center">
              <EditProjects />
              <a
                className="me-3 ms-3"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github fa-2xl text-dark"></i>
              </a>
              <button className="btn">
                <i
                  className="fa-solid fa-trash fa-xl"
                  style={{ color: "#111212" }}
                ></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProjects;
