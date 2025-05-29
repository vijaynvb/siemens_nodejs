import express from "express"; // Importing the express module
import { Employee, Department } from "./db.js";
import { authenticateJWT,authorizeAdmin } from "./authMiddleware.js";

const EmpRouter = express.Router();
EmpRouter.use(authenticateJWT);

// Helper: MongoDB aggregation with $lookup
async function getEmployeesWithDepartments(filter = {}) {
  return Employee.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "departments",
        localField: "depId",
        foreignField: "depId",
        as: "department"
      }
    },
    {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        depId: 0 // optional: hide depId
      }
    }
  ]);
}

// GET all employees
EmpRouter.get("/api/v1/ems/employees", async (req, res) => {
  // Employee.find
  // #swagger.tags = ['Employees']
  // #swagger.security = [{"bearerAuth": [] }]
  const employees = await getEmployeesWithDepartments();
  res.json(employees);
});

// model binding when a request is reaching to the endpoint 
// url, body, headers, version, method
// GET employee by ID
EmpRouter.get("/api/v1/ems/employees/:id", async (req, res) => {
  // #swagger.tags = ['Employees']
  // #swagger.security = [{"bearerAuth": [] }]
  const id = parseInt(req.params.id, 10);
  const [employee] = await getEmployeesWithDepartments({ id });

  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);

});

// POST new employee
EmpRouter.post("/api/v1/ems/employees", async (req, res) => {
  // #swagger.tags = ['Employees']
  // #swagger.security = [{"bearerAuth": [] }]
  const { id, first_name, depId } = req.body;
  if (!id || !first_name || !depId) {
    return res.status(400).json({ message: "Invalid employee data" });
  }

  const emp = new Employee(req.body);
  await emp.save();

  const [created] = await getEmployeesWithDepartments({ id });
  res.status(201).json(created);
});


// PUT update employee
EmpRouter.put("/api/v1/ems/employees/:id", async (req, res) => {
  // #swagger.parameters['body'] = { in: 'body', schema: { first_name: 'New Name', last_name: 'New Last Name', email: 'newemail@example.com', depId: 1 } }
  // Employee.findOneAndUpdate
  // #swagger.tags = ['Employees']
  // #swagger.security = [{"bearerAuth": [] }]
  const id = parseInt(req.params.id, 10);

  const emp = await Employee.findOneAndUpdate({ id }, req.body, { new: true });
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  const [updated] = await getEmployeesWithDepartments({ id });
  res.status(202).json(updated);
});

// DELETE employee
EmpRouter.delete("/api/v1/ems/employees/:id", authorizeAdmin, async (req, res) => {
  // Employee.findOneAndDelete
  // #swagger.tags = ['Employees']
  // #swagger.security = [{"bearerAuth": [] }]
  const id = parseInt(req.params.id, 10);

  const emp = await Employee.findOneAndDelete({ id });
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  const [deleted] = await getEmployeesWithDepartments({ id });
  res.status(202).json(deleted);
});

export default EmpRouter;