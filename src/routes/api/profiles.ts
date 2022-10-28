import { Router } from "express";
import {
  followProfile,
  getProfile,
  unFollowProfile,
} from "../../controllers/profileController";
import {
  authenticate,
  optionalAuthenticate,
} from "../../middleware/auth/authenticator";

const router = Router();

router.get("/:username", optionalAuthenticate, getProfile);

router.post("/:username/follow", authenticate, followProfile);

router.delete("/:username/follow", authenticate, unFollowProfile);

export default router;
