import { Router } from "express";

const router = Router();

router.get("/", function (_req, res) {
  res.sendStatus(501);
});

router.get("/feed", function (_req, res) {
  res.sendStatus(501);
});

router.get("/:slug", function (_req, res) {
  res.sendStatus(501);
});

router.post("/", function (_req, res) {
  res.sendStatus(501);
});

router.put("/:slug", function (_req, res) {
  res.sendStatus(501);
});

router.delete("/:slug", function (_req, res) {
  res.sendStatus(501);
});

router.post("/:slug/comments", function (_req, res) {
  res.sendStatus(501);
});

router.get("/:slug/comments", function (_req, res) {
  res.sendStatus(501);
});

router.delete("/:slug/comments/:id", function (_req, res) {
  res.sendStatus(501);
});

router.post("/:slug/favorite", function (_req, res) {
  res.sendStatus(501);
});

router.delete("/:slug/favorite", function (_req, res) {
  res.sendStatus(501);
});

export default router;
