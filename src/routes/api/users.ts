import { Router } from "express";

const router = Router();

router.post("/login", function (_req, res) {
  return res.sendStatus(501);
});

router.post("/", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
