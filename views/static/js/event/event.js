$(document).ready(function () {
  const id = $("#comment_show_text").data("text")
  showComment(id);
  showlike()
})

function dateValidate() {
  let startDate = new Date($("#eventStartDate").val());
  let endDate = new Date($("#eventEndDate").val());
  console.log("startDate:", startDate, "endDate:", endDate)

  if (startDate > endDate) {
    alert("종료 날짜는 시작 날짜보다 커야 합니다.");
  }
}

function event_open() {
  $(`#event_modal1`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#event_modal1`).has(e.target).length === 0) {
      $(`#event_modal1`).hide();
    }
  });
}
// 메일 알림
function remindEvent() {
  const id = document.getElementById("event_id").innerText;
  const title = document.getElementById("event_title").innerText;
  const email = document.getElementById("event_modal_email").value;
  const startDate = document.getElementById("event_startDate").innerText;
  const endDate = document.getElementById("event_endDate").innerText;
  // const postImg = document.getElementById("event_postIMG").val; 파일정보 빼오는법 찾아야함.

  console.log('info:', id, title, email, startDate, endDate)

  $.ajax({
    type: "POST",
    url: `/events/remindEvent`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      id: id,
      title: title,
      email: email,
      startDate: startDate,
      endDate: endDate,

    }),
    success: function (response) {
      alert("이벤트 알림 메일을 전송했습니다.");
    },
    errorfunction(request, status, error) {
      alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });

}


function deleteEvent(id) {
  $.ajax({
    type: "DELETE",
    url: `/events/delete/list/${id}`,
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

function showComment(id) {
  $.ajax({
    type: "GET",
    url: `/eventcomment/${id}/comments`,
    data: {},
    async: false,
    success: function (response) {
      let rows = response.comments;
      let user = response.user

      console.log(response)

      for (let i = 0; i < rows.length; i++) {
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



// 글 생성
function eventNew() {

  const formData = new FormData();
  formData.append("title", $("#title").val());
  formData.append("startDate", $("#eventStartDate").val());
  formData.append("endDate", $("#eventEndDate").val());
  formData.append("content", $("#eventContent").val());
  formData.append("file", $("#eventPostImg")[0].files[0]);
  console.log(FormData)

  $.ajax({
    type: "POST",
    url: "/events/newevent",
    // dataType: "json",
    // contentType: "application/json; charset=utf-8",
    data: formData,
    enctype: "multipart/form-data",
    processData: false, //프로세스 데이터 설정 : false 값을 해야 form data로 인식합니다
    contentType: false, //헤더의 Content-Type을 설정 : false 값을 해야 form data로 인식합니다
    success: function (response) {
      alert("작성 완료");
      window.location.replace("/events/list");
    },
  });

  //    data: JSON.stringify({
  //   title: title,
  //   startDate: startDate,
  //   endDate: endDate,
  //   content: content,
  //   postIMG:postIMG
  // }),
}

// function updateEvent(id) {
//   const title =document.getElementById("#event_title").innerText;
//   //const title = $("#event_title").innerText();
//   const startDate = $("#startDate").val();
//   const endDate = $("#endDate").val();
//   const content = $("#event_content").innerText();
//   const eventPostImg = $("#eventPostImg").val();
//   console.log(title,startDate,endDate,content,eventPostImg)

//   $.ajax({
//     type: "PATCH",
//     url: `/events/list/${id}/update`,
//     dataType: "json",
//     contentType: "application/json; charset=utf-8",
//     data: JSON.stringify({
//       title: title,
//       content: content,
//       startDate:startDate,
//       endDate:endDate,
//       eventPostImg:eventPostImg,
//     }),
//     success: function (response) {
//       alert("수정 완료");
//       window.location.replace(`/events/list/${id}`);
//     },
//   });
// }