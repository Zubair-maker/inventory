import { Router } from "express";
import {
  createItem,
  deleteItem,
  editItem,
  getItem,
  getItems,
} from "../controllers/itemController.js";

const router = Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", editItem);
router.delete("/:id", deleteItem);

export default router;
