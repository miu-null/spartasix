const { isSameDay } = require("date-fns");
const { format } = require("date-fns-tz");

// 게시글 정보 조회시 날짜 형식 변경(게시판, 게시글, 댓글, 이전다음 글 안내)
function reformPostDate(postObjDate) {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset()* 60000;
  const postDate = new Date(postObjDate - offset);
  // const postDate = new Date(postObjDate.setHours(postObjDate.getHours() +9));
  if (isSameDay(postDate, currentDate)) {
    return format(postDate, "kk:mm");
  } else {
    return format(postDate, "yyyy-MM-dd");
  } 
}

module.exports = {
  reformPostDate,
};
