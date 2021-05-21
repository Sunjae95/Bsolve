const express = require("express");
const { getProblem } = require("../middleware/problem");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getProblem();
    console.log(typeof data);
    res.json(data);
  } catch (e) {
    console.log("getProblem Error:", e);
  }
});
module.exports = router;
