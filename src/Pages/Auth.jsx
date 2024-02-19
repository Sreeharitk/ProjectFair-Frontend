import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authenticationImg from "../assets/authenticationImg.png";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../API/allAPI";
import { tokenAuthContext } from "../Context/AuthContext";
// eslint-disable-next-line react/prop-types
function Auth({ insideRegister }) {
  const { setIsAuthorised } = useContext(tokenAuthContext);
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userInput;
    if (!username || !email || !password) {
      toast.info("Please fill in all data", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      try {
        const result = await registerAPI(userInput);
        console.log(result);
        if (result.status === 200) {
          toast.success(`Wlcome ${result.data.username}!`, {
            position: "top-center",
            autoClose: 3000,
          });
          setUserInput({ username: "", email: "", password: "" });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.error(`${result.response.data}`, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;
    if (!email || !password) {
      toast.info("Please fill in all data", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      try {
        const result = await loginAPI({ email, password });
        console.log(result);
        if (result.status === 200) {
          //store username and token for future use
          sessionStorage.setItem("username", result.data.existingUser.username);
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem(
            "userDetails",
            JSON.stringify(result.data.existingUser)
          );
          setLoginStatus(true);
          setIsAuthorised(true);
          setTimeout(() => {
            setUserInput({ email: "", password: "" });
            // navigate to landing/home page
            navigate("/");
            setLoginStatus(false);
          }, 2000);
        } else {
          toast.error(`${result.response.data}`, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      style={{
        height: "100svb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="w-75">
        <Link to={"/"} className="btn btn-warning mb-2">
          <i className="fa-solid fa-arrow-left fa-beat me-2"></i>Back to home
        </Link>
        <Container
          className="rounded text-light p-5 shadow-lg"
          style={{ backgroundColor: "#3db24b" }}
        >
          <Row>
            <Col lg={6} className="d-flex justify-content-center">
              <img
                src={authenticationImg}
                alt="authImg"
                height="400px"
                width="90%"
              />
            </Col>
            <Col lg={6}>
              <div>
                <h1 className="fw-bolder mb-4 text-center">
                  <i
                    className="fa-brands fa-stack-overflow fa-bounce me-2"
                    style={{ color: "white" }}
                  ></i>
                  Project Fair
                </h1>
                <h3 className="text-center mb-4">
                  Sign {insideRegister ? "up" : "in"} to your Account
                </h3>
                <Form className="mb-4">
                  {insideRegister && (
                    <Form.Group className="mb-4" controlId="formBasicName">
                      <Form.Control
                        type="text"
                        placeholder="Enter User Name"
                        value={userInput.username}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            username: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter email ID"
                      value={userInput.email}
                      onChange={(e) =>
                        setUserInput({ ...userInput, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={userInput.password}
                      onChange={(e) =>
                        setUserInput({ ...userInput, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  {insideRegister ? (
                    <div>
                      <Button
                        variant="light"
                        type="submit"
                        className="mb-3"
                        onClick={handleRegister}
                      >
                        Register
                      </Button>
                      <p>
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-warning">
                          Login
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      {loginStatus ? (
                        <Spinner
                          animation="border"
                          variant="danger"
                          className="mb-3"
                        />
                      ) : (
                        <Button
                          variant="light"
                          type="submit"
                          className="mb-3"
                          onClick={handleLogin}
                        >
                          Login
                        </Button>
                      )}
                      <p>
                        Don&apos;t have an account?{" "}
                        <Link to={"/register"} className="text-warning">
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default Auth;
