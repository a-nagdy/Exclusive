import express from "express";
import storeController from "../../controllers/store/store.js";

const router = express.Router();

router.post("/admin/createStore", storeController.createStore);

router.get("/admin", storeController.getStoreBySlug);

export default router;
