import { Router } from "express";
import {
  generateNewShortID,
  redirectToOriginalURL,
} from "../controllers/urlController.js";
import { verifyIt } from "../middlewares/auth.js";

const router = Router();

router.post("/url/generate", verifyIt, generateNewShortID);
router.get("/:shortId", redirectToOriginalURL);

export default router;
