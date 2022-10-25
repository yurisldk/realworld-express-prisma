import { Router } from "express";
import { usersLogin } from "../../controllers/usersController";
import { userLoginValidator } from "../../middleware/userValidator";

const router = Router();

router.post("/login", userLoginValidator, usersLogin);

router.post("/", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
