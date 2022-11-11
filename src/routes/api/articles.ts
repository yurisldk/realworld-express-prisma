import { Router } from "express";
import * as articles from "../../controllers/articlesController";
import * as validator from "../../middleware/articlesValidator";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get(
  "/",
  auth.optionalAuthenticate,
  validator.articlesListValidator,
  articles.articlesList
);

router.get(
  "/feed",
  auth.authenticate,
  validator.articlesFeedValidator,
  articles.articlesFeed
);

router.get("/:slug", auth.optionalAuthenticate, articles.articlesGet);

router.post(
  "/",
  auth.authenticate,
  validator.articlesCreateValidator,
  articles.articlesCreate
);

router.put(
  "/:slug",
  auth.authenticate,
  validator.articlesUpdateValidator,
  articles.articlesUpdate
);

router.delete("/:slug", auth.authenticate, articles.articlesDelete);

router.post("/:slug/comments", function (_req, res) {
  res.sendStatus(501);
});

router.get("/:slug/comments", function (_req, res) {
  res.sendStatus(501);
});

router.delete("/:slug/comments/:id", function (_req, res) {
  res.sendStatus(501);
});

router.post("/:slug/favorite", auth.authenticate, articles.articlesFavorite);

router.delete(
  "/:slug/favorite",
  auth.authenticate,
  articles.articlesUnFavorite
);

export default router;
