import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editcategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", editcategory);
router.delete("/:id", deleteCategory);

export default router;
