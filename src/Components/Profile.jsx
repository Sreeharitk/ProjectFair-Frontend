import { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import ProfileImgDummy from "../assets/ProfileImgDummy.png";
import SERVER_URL from "../API/serverURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfileAPI } from "../API/allAPI";

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    github: "",
    linkedin: "",
    profile: "",
  });

  const [existingImage, setExistingImage] = useState("");
  const [preview, setPreview] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const { username, password, email, github, linkedin, profile } = userData;
    if (!github || !linkedin) {
      toast.info("Please provide your github and linkedin links");
    } else {
      //proceed to api call
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("password", password);
      reqBody.append("email", email);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", existingImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${token}`,
        };
        //api call
        try {
          const result = await updateProfileAPI(reqBody, reqHeader);
          if (result.status == 200) {
            setOpen(!open);
            sessionStorage.setItem("userDetails", JSON.stringify(result.data));
            toast.success("Updated profile successfully");
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
    if (sessionStorage.getItem("userDetails")) {
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      setUserData({
        ...userData,
        username: userDetails.username,
        password: userDetails.password,
        email: userDetails.email,
        github: userDetails.github,
        linkedin: userDetails.linkedin,
      });
      setExistingImage(userDetails.profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (userData.profile) {
      setPreview(URL.createObjectURL(userData.profile));
    } else {
      setPreview("");
    }
  }, [userData.profile]);

  // console.log(userData);

  return (
    <div className="shadow p-2 rounded">
      <div className="d-flex justify-content-between">
        <h2>Profile</h2>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-light btn-outline-warning"
        >
          <i className="fa-solid fa-caret-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="text-center">
            <label style={{ cursor: "pointer" }}>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) =>
                  setUserData({ ...userData, profile: e.target.files[0] })
                }
              />
              {existingImage == "" ? (
                <img
                  height={"200px"}
                  width={"200px"}
                  className="rounded-circle cursor-pointer"
                  src={preview ? preview : ProfileImgDummy}
                  alt="Upload image"
                />
              ) : (
                <img
                  height={"200px"}
                  width={"200px"}
                  className="rounded-circle cursor-pointer"
                  src={
                    preview ? preview : `${SERVER_URL}/uploads/${existingImage}`
                  }
                  alt="Upload image"
                />
              )}
            </label>
            <form>
              <div className="d-flex justify-content-center mb-3 mt-3">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Paste your Github link here"
                  value={userData.github}
                  onChange={(e) =>
                    setUserData({ ...userData, github: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-center mb-3">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Paste your Linkdin link here"
                  value={userData.linkedin}
                  onChange={(e) =>
                    setUserData({ ...userData, linkedin: e.target.value })
                  }
                />
              </div>
              <div>
                <button
                  className="btn btn-warning w-50"
                  type="submit"
                  onClick={handleProfileUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Collapse>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
    </div>
  );
}

export default Profile;
