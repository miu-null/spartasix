const { isSameDay } = require("date-fns");
const { format } = require("date-fns-tz");

// 게시글 정보 조회시 날짜 형식 변경(게시판, 게시글, 댓글, 이전다음 글 안내)
function reformPostDate(postObjDate) {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset()* 60000;
  const postDate = new Date(postObjDate - offset);
  
  if (isSameDay(postDate, currentDate)) {
    return format(postDate, "kk:mm");
  } else {
    return format(postDate, "yyyy-MM-dd");
  } 
}

// 페이지네이션 처리 
async function paginatedResults(page, selectedData) {
  const take = 6;
  const totalDataCount = selectedData.length; //불러온 데이터 목록 수
  const startIndex = (page - 1) * take;
  const endIndex = page * take;

  const slicedData = selectedData.slice(startIndex, endIndex); // 페이지당 조회할 데이터 묶음
  const lastPage = Math.ceil(totalDataCount / take); //생성될 페이지 수

  const unitSize = 3; // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6>
  const numOfUnits = Math.floor((page - 1) / unitSize); //<1 2 3> 페이지는 0 번째 index
  const unitStart = numOfUnits * unitSize + 1; //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
  const unitEnd = unitStart + (unitSize - 1); //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
  const paginatedDemand = { page, slicedData, lastPage, unitStart, unitEnd };

  return {
    ...paginatedDemand,
  };
}


module.exports = {
  reformPostDate,
  paginatedResults
};
