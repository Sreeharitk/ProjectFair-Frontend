import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../Context/AuthContext";

// eslint-disable-next-line react/prop-types
function Header({ insideDash }) {
  const { setIsAuthorised } = useContext(tokenAuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.clear();
    setIsAuthorised(false);
    navigate("/");
  };
  return (
    <div>
      <Navbar
        className="p-4"
        style={{
          backgroundColor: "#91ed91",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "5",
        }}
      >
        <Container>
          <Link to={"/"} style={{ textDecoration: "none", color: "#121212" }}>
            <h1
              className="fw-bolder"
              style={{ fontSize: "30px", marginBottom: "0" }}
            >
              <i
                className="fa-brands fa-stack-overflow fa-bounce me-2"
                style={{ color: "#121212" }}
              ></i>
              Project Fair
            </h1>
          </Link>
          {insideDash && (
            <div>
              <button
                onClick={handleLogOut}
                className="btn btn-link"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                Log Out
                <i className="fa-solid fa-right-from-bracket fa-beat ms-2"></i>
              </button>
            </div>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
