import { Router } from "express";
import ShelfController from "../controller/ShelfController.js";

const router = Router();

router.get("/", ShelfController.getAll);
router.get("/:id", ShelfController.getById);
router.post("/", ShelfController.create);
router.put("/:id", ShelfController.update);
router.delete("/:id", ShelfController.delete);

export default router;
