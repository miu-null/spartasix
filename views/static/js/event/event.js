function eventNew() {
  const userId = 1;
  const title = $("#title").val();
  const date = $("#startDate").val();
  const content = $("#content").val();

  console.log(userId, title, date, content);
  $.ajax({
    type: "POST",
    url: "/events/newevent",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      date: date,
      // endDate: endDate,
      content: content,
      userId: userId,
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("/events/list");
    },
  });
}

function deleteEvent(eventPostId) {
  $.ajax({
    type: "DELETE",
    url: `events/list/${eventPostId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: {},
    success: function (response) {
      alert("삭제완료");
      location.replace(``);
    },
    error: function (response) {
      console.log(response);
    },
  });
}
