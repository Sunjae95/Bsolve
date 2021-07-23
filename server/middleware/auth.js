const fetch = require("node-fetch");
const db = require("../db/index");
const jwt = require("jsonwebtoken");

const getAccessToken = async (url, bodyData) => {
  const body = Object.keys(bodyData)
    .map((k) => encodeURIComponent(k) + "=" + encodeURI(bodyData[k]))
    .join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  };
  const getData = await fetch(url, requestOptions);
  const accessToken = await getData.json();

  return accessToken;
};

//accessToken을 활용해 ID를 받아옴
const getKakaoId = async (accessToken) => {
  const data = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`,
    },
  });
  const kakaoUser = await data.json();

  return kakaoUser.id;
};

//ID가 없다면 DB에 ID추가
const saveUser = async (id) => {
  const checkUser = await db.query("SELECT id FROM users WHERE id = ?", [id]);

  if (checkUser[0].length === 0) {
    db.query("INSERT INTO users(id) VALUES (?)", [id]);
  }
};

const checkUser = (token) => {
  const isChecked = jwt.verify(token, process.env.JWT_SECRET);
  if (isChecked) return isChecked.id;
  return false;
};

//JWT토큰 생성
const getJWT = async (id) => {
  const payload = {
    id: id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  saveUser(id);

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

  return jwtToken;
};

const getUserProblems = async (token) => {
  try {
    const id = await checkUser(token);
    const userProblems = await db.query(
      "SELECT P.no, P.grade, P.title, PU.solve FROM problems_users as PU JOIN problems as P ON PU.myno = P.no WHERE PU.myid = ? ",
      [id]
    );
    return userProblems[0];
  } catch (e) {
    return false;
  }
};

//jwt토큰 인증하고 id를 통해 현재 유저 정보 불러오기(id, nickname)
const curUser = async (token, password) => {
  try {
    const jwtAuth = jwt.verify(token, password);
    const id = jwtAuth.id;
    const response = await db.query(
      "SELECT id, nickname, age, gender FROM users WHERE id = ?",
      [id]
    );

    return response[0][0];
  } catch (e) {
    console.log("토큰인증실패", e);
    throw e;
  }
};

const getAccessTokenFromDB = async (id) => {
  const accessToken = await db.query(
    "SELECT access_token FROM users WHERE id = ?",
    [id]
  );
  return accessToken;
};

const modifyNickname = async (id, nickname, age, gender) => {
  try {
    const res = await db.query(
      "UPDATE users SET nickname = ?, age= ?, gender = ?  WHERE id =?",
      [nickname, age, gender, id]
    );
    return res;
  } catch (e) {
    return false;
  }
};

module.exports = {
  getAccessToken,
  getKakaoId,
  saveUser,
  getJWT,
  checkUser,
  curUser,
  getUserProblems,
  getAccessTokenFromDB,
  modifyNickname,
};
