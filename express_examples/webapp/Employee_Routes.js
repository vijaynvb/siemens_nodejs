import express from "express"; // Importing the express module
import { employees } from "./data/employees.js"; // Importing the employees data
import { departments } from "./data/departments.js";

const EmpRouter = express.Router();

// Helper to enrich employee with department name
// Helper: remove depId and add full department object
function enrichWithDepartment(emp) {
  const department = departments.find(dep => dep.depId === emp.depId);
  const { depId, ...employeeWithoutDepId } = emp;

  return {
    ...employeeWithoutDepId,
    department: department || { depId, depName: "Unknown" }
  };
}

EmpRouter.get("/api/v1/ems/employees", (req, res) => {
  const enrichedEmployees = employees.map(enrichWithDepartment);
  res.json(enrichedEmployees);
});
// model binding when a request is reaching to the endpoint 
// url, body, headers, version, method
EmpRouter.get("/api/v1/ems/employees/:id", (req, res) => {
    //console.log(req);
  const employeeId = parseInt(req.params.id, 10);
  const employee = employees.find(emp => emp.id === employeeId);
  
  if (employee) {
    res.header("Content-Type", "application/json").status(200).json(enrichWithDepartment(employee));
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
  res.status(201).json(enrichWithDepartment(newEmployee)); // Respond with the created employee
});

EmpRouter.put("/api/v1/ems/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const updatedEmployee = req.body; // Assuming the updated employee data is sent in the request body

  const oldEmployeeIndex = employees.findIndex(emp => emp.id === employeeId);

  if (oldEmployeeIndex !== -1) {
    // Respond with the updated employee
    employees.splice(oldEmployeeIndex, 1); // Remove the old employee
    employees.push(updatedEmployee);
    res.status(202).json(enrichWithDepartment(updatedEmployee));
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
    res.status(202).send(enrichWithDepartment(oldEmployee)); // Respond with no content
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

export default EmpRouter;