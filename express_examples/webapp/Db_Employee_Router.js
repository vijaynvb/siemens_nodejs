import express from "express"; // Importing the express module
import { Employee, Department } from "./data/db.js";

const EmpRouter = express.Router();

// Helper to enrich employee with department name
// Helper: remove depId and add full department object
async function enrichWithDepartment(empDoc) {
  // Department.findOne
  const department = await Department.findOne({ depId: empDoc.depId });
  const { depId, ...emp } = empDoc.toObject();
  return {
    ...emp,
    department: department || { depId, depName: "Unknown" }
  };
}

// GET all employees
EmpRouter.get("/api/v1/ems/employees", async (req, res) => {
  // #swagger.security = [{ bearerAuth: [] }] // Security definition for Swagger
  const employees = await Employee.find();
  const enriched = await Promise.all(employees.map(enrichWithDepartment));
  res.status(200).json(enriched);
});

// GET employee by ID
EmpRouter.get("/api/v1/ems/employees/:id", async (req, res) => {
    // #swagger.security = [{ bearerAuth: [] }] // Security definition for Swagger

  const emp = await Employee.findOne({ id: parseInt(req.params.id, 10) });
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.json(await enrichWithDepartment(emp));
});

// POST new employee
EmpRouter.post("/api/v1/ems/employees", async (req, res) => {
    // #swagger.security = [{ bearerAuth: [] }] // Security definition for Swagger

  const { id, first_name, depId } = req.body;
  if (!id || !first_name || !depId) {
    return res.status(400).json({ message: "Invalid employee data" });
  }
  //const emp = await Employee.insertOne(req.body); // Assuming the new employee data is sent in the request body
  const emp = new Employee(req.body);
  await emp.save();
  res.status(201).json(await enrichWithDepartment(emp));
});

// PUT update employee
EmpRouter.put("/api/v1/ems/employees/:id", async (req, res) => {
    // #swagger.security = [{ bearerAuth: [] }] // Security definition for Swagger

  const emp = await Employee.findOneAndUpdate(
    { id: parseInt(req.params.id, 10) },
    req.body,
    { new: true }
  );
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.status(202).json(await enrichWithDepartment(emp));
});

// DELETE employee
EmpRouter.delete("/api/v1/ems/employees/:id", async (req, res) => {
  
  const emp = await Employee.findOneAndDelete({ id: parseInt(req.params.id, 10) });
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.status(202).json(await enrichWithDepartment(emp));
});

export default EmpRouter;