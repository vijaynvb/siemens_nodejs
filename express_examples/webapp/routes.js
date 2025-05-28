import express from "express"; // Importing the express module
import { employees } from "./data/employees.js"; // Importing the employees data
const router = express.Router();

router.get("/api/v1/ems/employees", (req, res) => {
  res.json(employees);
});
// model binding when a request is reaching to the endpoint 
// url, body, headers, version, method
router.get("/api/v1/ems/employees/:id", (req, res) => {
    //console.log(req);
  const employeeId = parseInt(req.params.id, 10);
  const employee = employees.find(emp => emp.id === employeeId);
  
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

export default router;