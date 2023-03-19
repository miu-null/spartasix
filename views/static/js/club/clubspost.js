function modal_open() {
  $(`#club_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#club_modal`).has(e.target).length === 0) {
      $(`#club_modal`).hide();
    }
  });
}


function clubpost() {
  const title = $("#title").val();
  let maxMembers = $("#maxMembers").val();
  const content = $("#content").val();
  maxMembers = Number(maxMembers);
  $.ajax({
    type: "POST",
    url: "/club/clubspost",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      maxMembers: Number(maxMembers),
      content: content,
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("http://localhost:3000/club/list");
    },
  });
}

function clubupdate() {
  const title = $("#title").val();
  const maxMembers = $("#maxMembers").val();
  const content = $("#content").val();
  const clubId = location.pathname.split("clubs/")[1];
  $.ajax({
    type: "PUT",
    url: `/club/clubs/${clubId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      clubId: clubId,
      title: title,
      maxMembers: Number(maxMembers),
      content: content,
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
