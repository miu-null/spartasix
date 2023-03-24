const { isSameDay } = require("date-fns");
const { format } = require("date-fns-tz");

//작성일 가입일 조정 (목록)
function reformAllPostsDate() {
  const currentDate = new Date();
  const dateSet = { isSameDay, format, currentDate };
  return dateSet;
}

// 게시글 상세보기에서 사용할 날짜 형식 변경(게시글, 댓글, 이전다음 글 안내)
function reformPostDate(postObjDate) {
  const currentDate = new Date();

  const postDate = new Date(postObjDate.setHours(postObjDate.getHours() +9));
//   gettimezoneoffset 60000????
  if (isSameDay(postDate, currentDate)) {
    return format(postDate, "kk:mm");
  } else {
    return format(postDate, "yyyy-MM-dd");
  } 
}

module.exports = {
  reformPostDate,
  reformAllPostsDate,
};
