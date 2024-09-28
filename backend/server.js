// third party imports
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./database/connectDB.js";

// Routes imports
import adminAuthRoutes from "./routes/auth/adminAuth.js";
import authRoutes from "./routes/auth/auth.js";
import productRoutes from "./routes/products/products.js";
import storeRoutes from "./routes/stores/stores.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", storeRoutes);
app.set("trust proxy", true);
// get user ip address

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
