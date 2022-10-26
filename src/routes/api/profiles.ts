import { Router } from "express";
import { getProfile } from "../../controllers/profileController";
import { optionalAuthenticate } from "../../middleware/auth/authenticator";

const router = Router();

router.get("/:username", optionalAuthenticate, getProfile);

router.post("/:username/follow", function (_req, res) {
  return res.sendStatus(501);
});

router.delete("/:username/follow", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
