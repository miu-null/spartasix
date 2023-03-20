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
    url: "events/remindEvent",
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
