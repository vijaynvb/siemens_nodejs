import express from "express"; // Importing the express module
import { Department } from "./db.js";// Importing the departments data
import { authenticateJWT,authorizeAdmin } from "./authMiddleware.js";

const depRouter = express.Router();
depRouter.use(authenticateJWT);

// Get all departments
depRouter.get("/api/v1/ems/departments", async (req, res) => {
  // #swagger.tags = ['Departments']
  // #swagger.security = [{"bearerAuth": [] }]
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments", error: err.message });
  }
});

// Get department by depId
depRouter.get("/api/v1/ems/departments/:depId", async (req, res) => {
  // #swagger.tags = ['Departments']
  // #swagger.security = [{"bearerAuth": [] }]
  // Department.findOne
  const dep = await Department.findOne({ depId: parseInt(req.params.depId, 10) });
  if (!dep) return res.status(404).json({ message: "Department not found" });
  res.json(dep);
});

// POST new department
depRouter.post("/api/v1/ems/departments", async (req, res) => {
  // #swagger.tags = ['Departments']
  // #swagger.security = [{"bearerAuth": [] }]
  const { depId, depName } = req.body;
  if (!depId || !depName) {
    return res.status(400).json({ message: "Invalid department data" });
  }
  // new Department & dep.save
  const dep = new Department(req.body);
  await dep.save();
  res.status(201).json(dep);
});

// PUT update department by depId
depRouter.put("/api/v1/ems/departments/:depId", async (req, res) => {
  // #swagger.tags = ['Departments']
  // #swagger.parameters['body'] = { in: 'body', schema: { depName: 'New Name', location: 'New Location' } }
  // Department.findOneAndUpdate
  // #swagger.security = [{"bearerAuth": [] }]
  const dep = await Department.findOneAndUpdate(
    { depId: parseInt(req.params.depId, 10) },
    req.body,
    { new: true }
  );
  if (!dep) return res.status(404).json({ message: "Department not found" });
  res.status(202).json(dep);
});

// DELETE department by depId
depRouter.delete("/api/v1/ems/departments/:depId", authorizeAdmin, async (req, res) => {
  // #swagger.tags = ['Departments']
  // Department.findOneAndDelete
  // #swagger.security = [{"bearerAuth": [] }]
  const dep = await Department.findOneAndDelete({ depId: parseInt(req.params.depId, 10) });
  if (!dep) return res.status(404).json({ message: "Department not found" });
  res.status(202).json(dep);
});

export default depRouter;