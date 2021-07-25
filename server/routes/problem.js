const express = require("express");
const { checkUser } = require("../middleware/auth");
const {
  getProblem,
  getUserProblem,
  changeProblem,
} = require("../middleware/problem");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const id = await checkUser(req.body.token);
    const unsolvedProblem = await getUserProblem(id, false);
    const solvedProblem = await getUserProblem(id, true);

    res.json({ unsolvedProblem, solvedProblem });
  } catch (e) {
    res.status(400).end();
  }
});

router.post("/change", async (req, res) => {
  const { no: problemNo, solve } = req.body.problem;
  try {
    const id = await checkUser(req.body.token);
    const isChanged = await changeProblem(id, problemNo, solve);

    if (isChanged) {
      return res.json({ success: true });
    }

    res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

router.post("/createProblem", async (req, res) => {
  try {
    const id = checkUser(req.body.token);
    if (!id) return res.status(500).json({ isVerify: false });

    const data = await getProblem(id);

    return res.status(200).send(data);
  } catch (e) {
    console.log("getProblem Error:", e);
  }
});

module.exports = router;
