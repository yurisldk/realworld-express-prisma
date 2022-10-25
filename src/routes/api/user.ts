import { Router } from "express";
import { userGet } from "../../controllers/userController";
import { authenticate } from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", authenticate, userGet);

router.put("/", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
