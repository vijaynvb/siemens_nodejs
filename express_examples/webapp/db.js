import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// MongoDB connection URI
const MONGODB_URI = "mongodb://localhost:27017/ems";

mongoose.connect(MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});


// ==================
// User Schema
// ==================
const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  role: String,
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Add a default admin user if not exists
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


// ==================
// Employee Schema
// ==================
const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: String,
  depId: { type: Number, required: true }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

// ==================
// Department Schema
// ==================
const DepartmentSchema = new mongoose.Schema({
  depId: { type: Number, required: true, unique: true },
  depName: { type: String, required: true },
  location: { type: String, required: true }
});

const Department = mongoose.model("Department", DepartmentSchema);

export { User, Employee, Department };