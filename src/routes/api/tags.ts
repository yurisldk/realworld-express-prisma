import { Router } from "express";

const router = Router();

router.get("/", function (_req, res) {
  return res.sendStatus(501);
});

export default router;
