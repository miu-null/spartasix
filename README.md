# spartasix

## sparta community club

### 1. 기본

1. **브랜치 방식 Trunk-Based**

- main - develop - 개인 branch

2. Commit, **push 사용시,**

- commit 전 ctrl + s 로 코드 컨벤션 후 커밋
- 파일 자동 추적(터미널 자동 재실행): `npm run start:dev`

3. **pull 및 실행 문제시**

- develop 브랜치에서 pull 후, 정상적으로 실행이 안 되는 경우: `npm install` (패키지 설치)

### 2. **커밋 메시지 컨벤션**

-m “[추가] 로그인 및 로그아웃 기능“

-m “[수정] 페이지네이션 작동 오류 수정”

-m “[삭제] 좋아요 기능 삭제”

### 3. **코드 변수명 컨벤션**

- Camel case

[코드 컨벤션 세부사항 (1)](https://www.notion.so/1-796cc944130846ad96a55f75d64e2b43)

### 4. **파일명 생성 규칙**

- 띄어쓰기 ‘.’ 으로 구분 → user.controller.ts / main.controller.ts 등등
- 가급적 클래스와 파일을 동일한 이름으로 명명

### 5. **Git flow**

1. 로컬에서 작업 브랜치를 생성한다 -> git branch -m "브랜치 이름"
2. 현재 작업중인 사항을 작업 브랜치에 커밋한다. -> git commit -m"커밋 메시지"
3. 최신화가 끝난 원격의 메인 브랜치로 이동한다. -> git checkout origin main
4. 메인 브랜치의 내용을 가져온다. -> git pull origin main
5. 작업하던 로컬 브랜치로 다시 되돌아온다. -> git checkout (작업 브랜치)
6. 현재까지 작업된 내용과 원격에서 받아온 코드의 커밋 히스토리를 정렬한다. -> git rebase main
7. 2번에서 작업중이었던 커밋을 현재까지의 깃 작업로그에서 찾는다. -> git log
8. 위에서 찾은 작업중 커밋 바로 직전의 커밋의 해시값을 복사한 후 git reset 다음에 붙여넣어 입력해 줌

- 여기까지의 내용이 현재 작업중인 사항을 지키면서 최신화된 코드들을 가져오는 것

---

내 하루의 작업을 마감하거나 기능개발이 완료되었을 때

1. 내 현재 깃 작업이 어떻게 되고 있는지 현황 파악 -> git status
2. 수정한 내역들을 코드 단위로 확인하며 스테이징 -> git add -p
3. 스테이징이 끝나면 커밋한다. git commit -m "커밋 메시지"
4. 원격 브랜치로 푸시 git push
5. 만약 원격 브랜치에 로컬과 동일한 이름의 브랜치가 없다면 upstream 에러 발생. 거기서 제공된 커맨드를 복사해서 붙여준다.
6. 깃헙 홈페이지에서 풀 리퀘스트를 연다
