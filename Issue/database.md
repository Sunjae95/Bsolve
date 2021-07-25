# database query

## 문제 상황

관계데이터베이스의 정보를 가져오고 추가하는데 코드가 복잡해지고 어려운상황이 발생했다.
내가 하고싶은 방향은 아래 코드와 같다.

```javascript
//자신의 아이디가 problems_users인 관계테이블에 있다면 문제들을 검색해서 할당
const tmpMyData = await db.query(
  "SELECT problems_no FROM problems_users where users_id = ? ",
  [id]
);
//tmpMyData의 문제번호를 뽑아서 배열로 만듬
const myData = tmpMyData[0].map((v) => v.problems_no);
//문제테이블 문제 문항불러오기
const getData = await db.query("select * from problems");
//문제테이블에서 현재유저에 있는 문제 제거
const problems = getData[0]
  .map((v) => v.no)
  .filter((no) => !myData.includes(no));
//순서대로 3문제 뽑아 추가하기
for (let i = 0; i < 3; i++) {
  //문제를 추가해주는 함수
  inputProblem(problems[i], id);
}
```

1. 문제-유저 테이블에서 문제를 뽑기
2. 문제테이블에서 문제 뽑기
3. 1번과 2번이 중복되는 문제를 제거한 배열을 만들기
4. 배열에서 문제3개(랜덤이지만 아직 미구현)를 뽑아 추가하기

## 해결방법

각 테이블에서 문제를 뽑고 비교하여 문제를 제거하는 배열을 만드는것을 나는 뽑지 않은 문제를 선택하는 방향으로 문제를 해결했다.
나는 문제를 불러올 때 문제번호를 불러올 때 추가되지않은 문제를 NOT IN으로 3번까지를 하나의 쿼리문으로 해결했다.
그 이후 불러온 3개의 문제를 INSERT문을 활용하여 한번에 3개씩 등록했다.

```javascript
//등록되지 않은 문제를 랜덤하게 뽑기
const unregisterdProblems = await db.query(
  "SELECT * FROM problems WHERE no NOT IN (SELECT myno FROM problems_users WHERE myid = ?) ORDER BY rand() limit 3",
  [1687864298]
);
//문제번호를 임의의 배열로 할당
const tmp = unregisterdProblems[0].map((v) => v.no);
//뽑은 문제를 삽입
db.query(
  'INSERT INTO problems_users (myno, myid, solve) values(?,?,"0"),(?,?,"0"),(?,?,"0")',
  [tmp[0], 1687864298, tmp[1], 1687864298, tmp[2], 1687864298]
)
  .then(console.log("사용자에게 문제 등록성공"))
  .catch((e) => console.log("문제 등록실패 오류: ", e));
```
