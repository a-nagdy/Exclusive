import express from "express";
import adminAuthController from "../../controllers/auth/adminAuth.js";
import authMiddleware from "../../middleware/authMiddleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/register", authMiddleware, adminAuthController.register);
router.post("/admin/login", adminAuthController.login);
router.post("/admin/whitelist-ip", adminAuthController.whitelistIP);

export default router;
