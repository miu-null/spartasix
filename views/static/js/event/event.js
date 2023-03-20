$(document).ready(function () {
  const eventPostId = $("#comment_show_text").data("text")
  showComment(eventPostId);
 
  showlike()
})

function event_open() {
  $(`#event_modal1`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#event_modal1`).has(e.target).length === 0) {
      $(`#event_modal1`).hide();
    }
  });
}

function remindEvent() {

  const email=$('#event_modal_email').val();

  $.ajax({
    type: "POST",
    url: `/events/remindEvent`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      email: email,
    }),
    success: function (response) {
      alert("이벤트 알림 메일을 전송했습니다.");
    },
    errorfunction(request, status, error){
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });
 
}

function eventNew() {
  const title = $("#eventTitle").val();
  const startDate = $("#eventStartDate").val();
  const endDate = $("#eventEndDate").val();
  const content = $("#eventContent").val();
  const postIMG = $("#eventPostImg").val();
  
  $.ajax({
    type: "POST",
    url: "/events/newevent",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      startDate: startDate,
      endDate: endDate,
      content: content,
      postIMG:postIMG
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("/events/list");
    },
  });
}

function updateEvent(eventPostId) {
  const title = $("#title2").val();
  const date = $("#date2").val();
  const content = $("#content2").val();

  console.log("제목 : " + title);
  console.log("내용 : " + content);
  console.log(date);
  console.log(eventPostId);
  $.ajax({
    type: "PATCH",
    url: `/events/list/${eventPostId}/update`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      content: content,
      date: date,
    }),
    success: function (response) {
      alert("수정 완료");
      window.location.replace(`/events/list/${eventPostId}`);
    },
  });
}

function deleteEvent(eventPostId) {
  $.ajax({
    type: "DELETE",
    url: `/events/list/${eventPostId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: {},
    success: function (response) {
      alert("삭제완료");
      window.location.replace("/events/list");
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function showComment(eventPostId) {
  $.ajax({
    type: "GET",
    url: `/eventcomment/${eventPostId}/comments`,
    data: {},
    async: false,
    success: function (response) {
      let rows = response.comments;
      let user = response.user

      console.log(response)

      for(let i = 0; i < rows.length; i++) {
        const commentId = user[i]["eventCommentId"]
        const nickName = user[i].user["nickName"]
        const content = rows[i]["content"]
        let date = rows[i]["createdAt"]
        date = date.split("T")[0]

        let temp_html = `
        <div class="comment_text_box">
          <div class="comment_text_container">
            <div class="comment_nickname">
              ${nickName}
            </div>
            <div class="comment_content">
              ${content}
            </div>
            <div class="comment_date">
              ${date}
            </div>
            <div class="comment_like">
              <div>
              <image onclick="updateLike(${commentId})" class="comment_like_img" src="/img/likes.png">
              </div>
              <div data-like="" id="event_commentId" class="like_total">
              </div>
            </div>
          </div>
        </div>
        `
        $("#comment_show_text").append(temp_html)
      }
    }
  })
}

function showlike() {
  $.ajax({
    type: "GET",
    url: `/eventcomment/show_comment_like`,
    data: {},
    success: function (response) {
      console.log(response)

    },
  })
}

function updateLike(commentId) {
  $.ajax({
    type: "POST",
    url: `/eventcomment/update_event_like/${commentId}`,
    data: {},
    success: function (response) {
    }
  })
}