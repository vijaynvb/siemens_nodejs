import express from "express"; // Importing the express module
import { employees } from "./data/employees.js"; // Importing the employees data
const EmpRouter = express.Router();

EmpRouter.get("/api/v1/ems/employees", (req, res) => {
  res.json(employees);
});
// model binding when a request is reaching to the endpoint 
// url, body, headers, version, method
EmpRouter.get("/api/v1/ems/employees/:id", (req, res) => {
    //console.log(req);
  const employeeId = parseInt(req.params.id, 10);
  const employee = employees.find(emp => emp.id === employeeId);
  
  if (employee) {
    res.header("Content-Type", "application/json").status(200).json(employee);
    // headers connect-type: application/json, stringification of the object status code 200
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

EmpRouter.post("/api/v1/ems/employees", (req, res) => {
  const newEmployee = req.body; 
  //console.log(req.body);
  if (!newEmployee || !newEmployee.first_name || !newEmployee.id) {
    return res.status(400).json({ message: "Invalid employee data" });
  }
  
  employees.push(newEmployee); // Add the new employee to the employees array
  res.status(201).json(newEmployee); // Respond with the created employee
});

EmpRouter.put("/api/v1/ems/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const updatedEmployee = req.body; // Assuming the updated employee data is sent in the request body

  const oldEmployeeIndex = employees.findIndex(emp => emp.id === employeeId);

  if (oldEmployeeIndex !== -1) {
    // Respond with the updated employee
    employees.splice(oldEmployeeIndex, 1); // Remove the old employee
    employees.push(updatedEmployee);
    res.status(202).json(updatedEmployee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});
EmpRouter.delete("/api/v1/ems/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const oldEmployee = employees.find(emp => emp.id === employeeId);
  const oldEmployeeIndex = employees.findIndex(emp => emp.id === employeeId);

  if (oldEmployeeIndex !== -1) {
    // Respond with the updated employee
    employees.splice(oldEmployeeIndex, 1); // Remove the old employee
    res.status(202).send(oldEmployee); // Respond with no content
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

export default EmpRouter;