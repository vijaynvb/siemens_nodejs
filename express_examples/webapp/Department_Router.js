import express from "express"; // Importing the express module
import { departments } from "./data/departments.js"; // Importing the departments data
const depRouter = express.Router();

depRouter.get("/api/v1/ems/departments", (req, res) => {
  res.json(departments);
});
// model binding when a request is reaching to the endpoint 
// url, body, headers, version, method
depRouter.get("/api/v1/ems/departments/:depId", (req, res) => {
    //console.log(req);
  const departmentId = parseInt(req.params.depId, 10);
  const department = departments.find(dep => dep.depId === departmentId);

  if (department) {
    res.header("Content-Type", "application/json").status(200).json(department);
    // headers connect-type: application/json, stringification of the object status code 200
  } else {
    res.status(404).json({ message: "department not found" });
  }
});

depRouter.post("/api/v1/ems/departments", (req, res) => {
  const newdepartment = req.body; 
  //console.log(req.body);
  if (!newdepartment || !newdepartment.depName || !newdepartment.depId) {
    return res.status(400).json({ message: "Invalid department data" });
  }
  
  departments.push(newdepartment); // Add the new department to the departments array
  res.status(201).json(newdepartment); // Respond with the created department
});

depRouter.put("/api/v1/ems/departments/:depId", (req, res) => {
  const departmentId = parseInt(req.params.depId, 10);
  const updateddepartment = req.body; // Assuming the updated department data is sent in the request body

  const olddepartmentIndex = departments.findIndex(dep => dep.depId === departmentId);

  if (olddepartmentIndex !== -1) {
    // Respond with the updated department
    departments.splice(olddepartmentIndex, 1); // Remove the old department
    departments.push(updateddepartment);
    res.status(202).json(updateddepartment);
  } else {        
    res.status(404).json({ message: "department not found" });
  }
});
depRouter.delete("/api/v1/ems/departments/:depId", (req, res) => {
  const departmentId = parseInt(req.params.depId, 10);
  const olddepartment = departments.find(dep => dep.depId === departmentId);
  const olddepartmentIndex = departments.findIndex(dep => dep.depId === departmentId);

  if (olddepartmentIndex !== -1) {
    // Respond with the updated department
    departments.splice(olddepartmentIndex, 1); // Remove the old department
    res.status(202).send(olddepartment); // Respond with no content
  } else {
    res.status(404).json({ message: "department not found" });
  }
});

export default depRouter;