const db = require("../db/index");

//혹시 모르니 남겨 두기
// const getUserProblems = async (id) => {
//   try {
//     const userProblems = await db.query(
//       "SELECT P.no, P.grade, P.title, PU.solve FROM problems_users as PU JOIN problems as P ON PU.myno = P.no WHERE PU.myid = ? ",
//       [id]
//     );
//     return userProblems[0];
//   } catch (e) {
//     return false;
//   }
// };

const getUserProblem = async (id, solved) => {
  const isSolved = solved ? 1 : 0;
  try {
    const problem = await db.query(
      "SELECT P.no, P.grade, P.title, PU.solve FROM problems_users as PU JOIN problems as P ON PU.myno = P.no WHERE PU.myid = ? AND PU.solve=?",
      [id, isSolved]
    );
    return problem[0];
  } catch (e) {
    return false;
  }
};

const changeProblem = async (id, problemNo, solve) => {
  const changeSolve = solve === 0 ? 1 : 0;

  try {
    await db.query(
      "UPDATE problems_users SET solve= ? WHERE myid =? AND myno=?",
      [changeSolve, id, problemNo]
    );
    return true;
  } catch (e) {
    return false;
  }
};
//문제 뽑기
const getProblem = async (userId) => {
  //id값 받기
  try {
    //현재 사용자에게 등록되지 않은 문제 불러오기
    const unregisterdProblems = await db.query(
      "SELECT * FROM problems WHERE no NOT IN (SELECT myno FROM problems_users WHERE myid = ?) ORDER BY rand() limit 3",
      [userId]
    );

    const problem = unregisterdProblems[0].map((v) => v.no);

    db.query(
      'INSERT INTO problems_users (myno, myid, solve) values(?,?,"0"),(?,?,"0"),(?,?,"0")',
      [problem[0], userId, problem[1], userId, problem[2], userId]
    )
      .then(console.log("사용자에게 문제 등록성공"))
      .catch((e) => console.log("문제 등록실패 오류: ", e));

    return unregisterdProblems[0];
  } catch (e) {
    console.log("getProblem Error:", e);
  }
};

module.exports = {
  getProblem,
  getUserProblem,
  changeProblem,
};
