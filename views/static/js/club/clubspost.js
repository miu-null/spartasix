function modal_open() {
  $(`#club_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#club_modal`).has(e.target).length === 0) {
      $(`#club_modal`).hide();
    }
  });
}

function report_modal_open() {
  $(`#report_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#report_modal`).has(e.target).length === 0) {
      $(`#report_modal`).hide();
    }
  });
}

function report_close() {
  $(`#report_modal`).hide();
}

function clubpost() {
  const title = $("#club_title").val();
  const maxMembers = $("#club_maxMembers").val();
  const content = $("#club_content").val();
  const category = $("#club_category").val();
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
      category: category,
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
  const category = $("#club_category").val();
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
      maxMemberes: maxMembers,
      content: content,
      category: category,
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

function showClubComment(clubPostId) {
  $.ajax({
    type: "GET",
    url: `/clubcomment/${clubPostId}/comments`,
    data: {},
    success: function (response) {
      console.log(response);
      let rows = response;

      for (let i = 0; i < rows.length; i++) {
        const commentId = rows[i]["id"];
        const nickName = rows[i]["user"]["nickName"];
        const content = rows[i]["content"];
        const like = rows[i]["clubCommentLikes"].length;
        let date = rows[i]["createdAt"];
        date = date.split("T")[0];

        let temp_html = `
        <div class="comment_text_box">
          <div id="club_text_container${commentId}" class="comment_text_container">
            <div class="comment_nickname">
              ${nickName}
            </div>
            <div id="club_content_${commentId}" class="comment_content">
              <div id="club_content_box_${commentId}" class="comment_content_box">
              ${content}
              </div>
            </div>
            <div class="comment_date">
              ${date}
            </div>
            <div id="club_like${commentId}" class="comment_like">
              <div>
                <image onclick="club_updateLike(${commentId})" class="comment_like_img" src="/img/likes.png">
              </div>
              <div id="club_commentId" class="like_total">
                ${like}
              </div>
            </div>
          </div>
          <div id="club_comment_button${commentId}" class="event_comment_button">
            <button id="club_del_button${commentId}" class="comment_button" onclick="updateClubComment('${commentId}','${content}')">edit</button>
            <button id="club_del_button1${commentId}" class="comment_button" onclick="deleteClubComment(${commentId})">delete</button>
          </div>
        </div>
        `;
        $("#club_show_text").append(temp_html);
      }
    },
  });
}

function createClubComment(postId) {
  const content = $("#club_textarea").val();
  $.ajax({
    type: "POST",
    url: `/clubcomment/create-comment/${postId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      content: content,
    }),
    success: function (response) {
      alert("작성 완료 !");
      window.location.reload();
    },
    error: function (response) {
      console.log(response)
      alert("로그인 후 이용가능한 기능입니다.")
    }
  });
}

function updateClubComment(commentId, content) {
  const content1 = document.querySelector(`#club_content_box_${commentId}`);
  const div = document.querySelector(`#club_content_${commentId}`);

  const delbutton = document.querySelector(`#club_del_button${commentId}`);
  const delbutton1 = document.querySelector(`#club_del_button1${commentId}`);
  const div2 = document.querySelector(`#club_comment_button${commentId}`);

  const deldiv = document.querySelector(`#club_like${commentId}`);
  const div3 = document.querySelector(`#club_text_container${commentId}`);

  const newcontent = document.createElement("input");
  const newbutton = document.createElement("input");

  div.removeChild(content1);
  div2.removeChild(delbutton);
  div2.removeChild(delbutton1);
  div3.removeChild(deldiv);

  div.appendChild(newcontent);
  div2.appendChild(newbutton);

  newcontent.setAttribute("class", "new_content");
  newcontent.setAttribute("id", `club_new_${commentId}`);
  newcontent.setAttribute("type", "text");
  newcontent.setAttribute("placeholder", `${content}`);

  newbutton.setAttribute("class", "new_club_button");
  newbutton.setAttribute("type", "button");
  newbutton.setAttribute("value", "edit");
  newbutton.setAttribute("id", `club_new_comment`);

  let update_comment = document.querySelector("#club_new_comment");
  update_comment.addEventListener("click", function () {
  const new_comment = $(`#club_new_${commentId}`).val();

    $.ajax({
      type: "PATCH",
      url: `/clubcomment/update-comment/${commentId}`,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        content: new_comment,
      }),
      success: function (response) {
        alert("수정 완료");
        window.location.reload();
      },
      error: function (request, status, error) {
        if (request.responseJSON["message"] === "댓글이 존재하지 않습니다.") {
          alert("댓글이 존재하지 않습니다.");
          window.location.reload();
        }
        if (
          request.responseJSON["message"] ===
          "작성자만 사용할 수 있는 기능입니다."
        ) {
          alert("작성자만 사용할 수 있는 기능입니다.");
          window.location.reload();
        }
      },
    });
  });
}

function deleteClubComment(clubcommentId) {
  $.ajax({
    type: "DELETE",
    url: `/clubcomment/delete-comment/${clubcommentId}`,
    data: {},
    success: function (response) {
      alert("삭제 성공 !");
      window.location.reload();
    },
    error: function (response) {
      if (request.responseJSON["message"] === "댓글이 존재하지 않습니다.") {
        alert("댓글이 존재하지 않습니다.");
        window.location.reload();
      }
      if (
        request.responseJSON["message"] ===
        "작성자만 사용할 수 있는 기능입니다."
      ) {
        alert("작성자만 사용할 수 있는 기능입니다.");
        window.location.reload();
      }
    },
  })
}
  function club_updateLike(commentId) {
    $.ajax({
      type: "POST",
      url: `/clubcomment/update_club_like/${commentId}`,
      data: {},
      success: function (response) {
        alert("좋아요 !");
        window.location.reload();
      },
      error: function (err) {
        alert("좋아요 취소 !");
        window.location.reload();
      },
    });
  }