import mongoose from "mongoose";

// MongoDB connection URI
const MONGODB_URI = "mongodb://localhost:27017/ems";

mongoose.connect(MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// schema definition = what fields are in the collection
const departmentSchema = new mongoose.Schema({
  depId: { type: Number, required: true, unique: true },
  depName: { type: String, required: true },
  depLocation: { type: String, required: true }
});

//employee schema definition
const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: String,
  depId: { type: Number, required: true }
});

// Create models for departments and employees
const Department = mongoose.model("Department", departmentSchema);
const Employee = mongoose.model("Employee", EmployeeSchema);
// Export the models
export { Department, Employee };
