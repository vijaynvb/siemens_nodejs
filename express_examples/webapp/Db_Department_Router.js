import express from "express"; // Importing the express module
import { Department } from "./data/db.js";
const depRouter = express.Router();

depRouter.get("/api/v1/ems/departments", async (req, res) => {
  try {
    const dept = await Department.find();
    res.status(200).json(dept);
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments", error: err.message });
  }
});

// model binding when a request is reaching to the endpoint 
// url, body, headers, version, method
depRouter.get("/api/v1/ems/departments/:depId", async (req, res) => {
    try {
      const department = await Department.findOne({depId: req.params.depId});
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching department", error: err.message });
    }
});

depRouter.post("/api/v1/ems/departments", async (req, res) => {
  const newdepartment = req.body;
  if (!newdepartment || !newdepartment.depName || !newdepartment.depId) {
    return res.status(400).json({ message: "Invalid department data" });
  }
  const freshdepartment = await Department.insertOne(newdepartment); // Assuming the new department data is sent in the request body
  if (!freshdepartment) {
    return res.status(500).json({ message: "Error creating department" });
  }
  else if (freshdepartment) {
    console.log("New department created:", freshdepartment);
    res.status(201).json(freshdepartment);
  }
});

depRouter.put("/api/v1/ems/departments/:depId", async (req, res) => {
  // customize your swagger document to show the request body structure
  // #swagger.parameters['body'] = { in: 'body', schema: {depId: 1, depName: 'HR', depLocation: 'New York'}}
  const departmentId = parseInt(req.params.depId, 10);
  const updateddepartment = req.body; // Assuming the updated department data is sent in the request body

  const updatedepartment = await Department.findOneAndUpdate({ depId: departmentId }, updateddepartment, { new: true });

  if (updatedepartment) {
    // Respond with the updated department
    res.status(202).json(updatedepartment); // Respond with the updated department
  } else {
    res.status(404).json({ message: "department not found" });
  }
});

depRouter.delete("/api/v1/ems/departments/:depId", async (req, res) => {
  const departmentId = parseInt(req.params.depId, 10);
  const deleteddepartment = await Department.findOneAndDelete({ depId: departmentId });

  if (deleteddepartment) {
    // Respond with the deleted department
    res.status(202).json(deleteddepartment);
  } else {
    res.status(404).json({ message: "department not found" });
  }
});

export default depRouter;