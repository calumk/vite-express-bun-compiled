import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Hello Vite + Vue!");
});

router.get("/api/list", (req, res) => {
  res.json({ items: [{
    id: 1,
    name: "Item 1",
  }, {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  }] });
});

export default router;