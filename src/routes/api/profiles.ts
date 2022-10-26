import { Router } from "express";
import { followProfile, getProfile } from "../../controllers/profileController";
import {
  authenticate,
  optionalAuthenticate,
} from "../../middleware/auth/authenticator";

const router = Router();

router.get("/:username", optionalAuthenticate, getProfile);

router.post("/:username/follow", authenticate, followProfile);

router.delete("/:username/follow", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
