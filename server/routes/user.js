const express = require("express");
const jwt = require("jsonwebtoken");
const {
  modifyNickname,
  getUserInfo,
  checkUser,
} = require("../middleware/auth");
const router = express.Router();

//사용자 정보 불러오기
router.post("/", async (req, res) => {
  try {
    const userId = await checkUser(req.body.token);
    if (!userId) return res.status(400).end();
    const userInfo = await getUserInfo(userId);

    res.json(userInfo);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

//사용자 정보 수정하기
router.post("/modify", async (req, res) => {
  const { id, nickname, age, gender } = req.body.profile;
  const getAnswer = await modifyNickname(id, nickname, age, gender);

  if (getAnswer) {
    res.status(200).json({ modify: true });
  } else {
    //실패시
    res.status(400).end();
  }
});

module.exports = router;
