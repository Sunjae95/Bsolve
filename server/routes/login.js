const express = require("express");
const router = express.Router();
const {
  getAccessToken,
  getKakaoId,
  getJWT,
  checkUser,
} = require("../middleware/auth");

router.get("/", (req, res) => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
  res.json({ url });
});

router.post("/auth", async (req, res) => {
  const code = req.body.authCode;
  const bodyData = {
    grant_type: "authorization_code",
    client_id: process.env.REST_API_KEY,
    redirect_uri: process.env.REDIRECT_URI,
    code,
  };

  try {
    const accessToken = await getAccessToken(process.env.KAKAO_URL, bodyData);
    const kakaoId = await getKakaoId(accessToken);
    const token = await getJWT(kakaoId);

    res.json({ token });
  } catch (e) {
    console.log("에러", e);
    res.status(404).end();
  }
});

router.post("/checkLogin", async (req, res) => {
  const isLogged = await checkUser(req.body.token);
  if (isLogged) return res.json({ success: true });
  res.status(400).end();
});

module.exports = router;
