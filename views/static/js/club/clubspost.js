function modal_open() {
  $(`#club_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#club_modal`).has(e.target).length === 0) {
      $(`#club_modal`).hide();
    }
  });
}

function clubpost() {
  const title = $("#club_title").val();
  const maxMembers = $("#club_maxMembers").val();
  const content = $("#club_content").val();
  // maxMembers = Number(maxMembers);
  if (!title || !maxMembers || !content) {
    alert("모든 항목을 작성해 주세요.");
  }
  if (maxMembers == !Number) {
    alert("최대인원수는 숫자로 입력해주세요");
  }
  if (maxMembers < 2) {
    alert("최소 2명이상의 인원이 필요합니다");
  }
  $.ajax({
    type: "POST",
    url: "/club/clubspost",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      // maxMembers: Number(maxMembers),
      maxMembers: maxMembers,
      content: content,
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("http://localhost:3000/club/list");
    },
  });
}

function clubupdate() {
  const title = $("#club_title").val();
  const maxMembers = $("#club_maxMembers").val();
  const content = $("#club_content").val();
  const clubId = location.pathname.split("clubs/")[1];
  if (!title || !maxMembers || !content) {
    alert("모든 항목을 작성해 주세요.");
  }
  if (maxMembers != Number) {
    alert("최대인원수는 숫자로 입력해주세요");
  }
  if (maxMembers < 2) {
    alert("최소 2명이상의 인원이 필요합니다");
  }
  console.log(clubId);
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

function clubApp() {
  const clubId = location.pathname.split("list/")[1];
  const content = $("#club_modal_textarea").val();
  if (!content) {
    alert("모든 항목을 작성해 주세요.");
  }
  console.log(clubId);
  $.ajax({
    type: "POST",
    url: `/club/${clubId}`,
    data: JSON.stringify({
      clubId: clubId,
      content: content,
    }),
    success: function (response) {
      alert("신청 완료");
      window.location.replace("http://localhost:3000/club/list");
    },
    error: function (error) {
      alert("ERROR");
    },
  });
}
