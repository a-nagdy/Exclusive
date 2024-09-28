// Node.js built-in modules
import path from "path";
import { fileURLToPath } from "url";

// Third-party modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Internal modules
import Admin from "../../models/auth/admin.js";
import Store from "../../models/store/store.js";
// Setup __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const adminAuthController = {
  register: async (req, res) => {
    const { email, password, role } = req.body;
    const currentAdmin = req.admin; // Assuming req.admin contains the authenticated admin's info
    // const storeId = req.admin.storeId;
    try {
      if (currentAdmin.role === "admin" && role === "super-admin") {
        return res
          .status(403)
          .json({ message: "Admins cannot assign the super-admin role" });
      }

      // Check if the current admin is allowed to register new admins
      if (currentAdmin.role !== "super-admin" && role === "super-admin") {
        return res.status(403).json({
          message: "Only super-admins can assign the super-admin role",
        });
      }

      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }
      // if (!storeId) {
      //   return res.status(400).json({ message: "Store is required" });
      // }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new admin
      const newAdmin = new Admin({
        email,
        password: hashedPassword,
        role,
      });

      await newAdmin.save();

      res
        .status(201)
        .json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: "Invalid email" });
      }

      // Verify the password
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid  password" });
      }

      // Generate a JWT token

      const store = await Store.findById(admin.store || admin.storeId);
      console.log(admin);
      console.log(store);

      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }

      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ message: "Login successful", token, admin, store });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  whitelistIP: async (req, res) => {
    const currentIp = req.ip; // Get the IP address from the request
    const { email, ipAddress = currentIp, newRole } = req.body;

    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (!ipAddress) {
        return res.status(400).json({ message: "IP address is required" });
      }

      if (await Admin.findOne({ adminId: admin._id, ipAddress })) {
        return res.status(400).json({
          message: "IP address already whitelisted",
        });
      }
      if (newRole) {
        admin.role = newRole;
        await admin.save();
      }
      const newAdmin = new Admin({
        adminId: admin._id,
        adminRole: admin.role,
        ipAddress,
      });
      await newAdmin.save();
      res.status(201).json({
        message: "IP address whitelisted successfully",
        newAdmin,
      });
    } catch (error) {
      console.error("Failed to whitelist IP address:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteAdmin: async (req, res) => {
    const { email } = req.body;
    try {
      const admin = await Admin({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      if (admin.role === "admin") {
        admin.role = "admin";
      }
      await Admin.deleteMany({ adminId: admin._id });
      await admin.deleteOne();
      res.json({ message: "Admin deleted successfully" });
    } catch (error) {
      console.error("Failed to delete admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default adminAuthController;
