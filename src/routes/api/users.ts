import { Router } from "express";
import { usersLogin, usersRegister } from "../../controllers/usersController";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../../middleware/userValidator";

const router = Router();

router.post("/login", userLoginValidator, usersLogin);

router.post("/", userRegisterValidator, usersRegister);

export default router;
