import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "admin",
        "super-admin",
        "vendor",
        "marketing",
        "content-creator",
        "customer-service",
      ],
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already compiled
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;