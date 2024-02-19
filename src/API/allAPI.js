import { commonAPI } from "./commonAPI";
import SERVER_URL from "./serverURL";

// register
export const registerAPI = async (user) => {
  return await commonAPI("POST", `${SERVER_URL}/register`, user, "");
};

//login
export const loginAPI = async (user) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, user, "");
};

//add a project
export const addProjectAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/add-project`,
    reqBody,
    reqHeader
  );
};

//get home projects
export const getHomeProjectsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/get-home-projects`,"","");
};

//get all projects
export const getAllProjectsAPI = async (searchKey,reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/get-all-projects?search=${searchKey}`,"",reqHeader);
  //here we pass the search key has a query paramenter("?")
};

//get user projects
export const getUserProjectsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/get-user-projects`,"",reqHeader);
};

//update profile
export const updateProfileAPI = async(reqBody,reqHeader)=>{
  return await commonAPI("PUT", `${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

//update project
export const updateProjectAPI = async(projectID,reqBody,reqHeader)=>{
  return await commonAPI("PUT", `${SERVER_URL}/project/edit/${projectID}`, reqBody, reqHeader)
}

//remove project
export const deleteProjectAPI = async(projectID,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectID}`,{},reqHeader)
  //since we are not using any special axios methods to delete we should set the request body as empty object while deleting.
}