import { Router } from "express";

const router = Router();

router.get("/:username", function (_req, res) {
  return res.sendStatus(501);
});

router.post("/:username/follow", function (_req, res) {
  return res.sendStatus(501);
});

router.delete("/:username/follow", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
