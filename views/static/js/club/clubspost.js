function clubpost() {
  const title = $("#title").val();
  const maxMembers = $("#maxMembers").val();
  const content = $("#content").val();
  const userId = $("#userId").val();
  console.log(title, maxMembers, content, userId);
  $.ajax({
    type: "POST",
    url: "/club/clubspost",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      maxMembers: maxMembers,
      content: content,
      userId: userId,
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("http://localhost:3000/club/list");
    },
    error: function (error) {
      alert("error");
    },
  });
}

function clubupdate() {
  const title = $("#title").val();
  const maxMembers = $("#maxMembers").val();
  const content = $("#content").val();
  const userId = $("#userId").val();
  const clubId = location.pathname.split("clubs/")[1];
  console.log(title, maxMembers, content, userId, clubId);
  $.ajax({
    type: "PUT",
    url: `/club/clubs/${clubId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      clubId: clubId,
      title: title,
      maxMembers: maxMembers,
      content: content,
      userId: userId,
    }),
    success: function (response) {
      alert("수정 완료");
      window.location.replace("http://localhost:3000/club/list");
    },
    error: function (error) {
      alert("error");
    },
  });
}

function clubdelete() {
  const clubId = location.pathname.split("list/")[1];
  console.log(clubId);
  $.ajax({
    type: "DELETE",
    url: `/club/list/${clubId}`,
    success: function (response) {
      alert("삭제 완료");
      window.location.replace("http://localhost:3000/club/list");
    },
    error: function (error) {
      alert("권한이 없습니다");
    },
  });
}
