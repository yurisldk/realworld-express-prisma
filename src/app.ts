import express from "express";

const app = express();

app.use((_req, res) => {
  res.send("Express server working.");
});

export default app;
