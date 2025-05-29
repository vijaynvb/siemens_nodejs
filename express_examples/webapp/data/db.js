import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  role: String,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create models for departments and employees
const Department = mongoose.model("Department", departmentSchema);
const Employee = mongoose.model("Employee", EmployeeSchema);
const User = mongoose.model("User", userSchema);

const addDefaultAdmin = async () => {
  const adminEmail = "admin@example.com";
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    await User.create({
      id: 1, // Default ID for admin
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: "admin123", // Will be hashed
      location: "Headquarters",
      role: "admin",
    });
  }
};

addDefaultAdmin();
// Export the models
export { Department, Employee, User };
