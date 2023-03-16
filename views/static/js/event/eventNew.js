function eventNew() {
    const title = $("#title").val();
    const startDate = $("#startDate").val();
    const endDate = $("#endDate").val();
    const comment = $("#comment").val();
    const userId= 1
    console.log(title, startDate, endDate, comment,userId);
    $.ajax({
      type: "POST",
      url: "/events/newevent",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        title: title,
        startDate: startDate,
        endDate: endDate,
        comment: comment,
        userId:userId
      }),
      success: function (response) {
        alert("작성 완료");
        window.location.replace("/events/list");
      },
    });
  }
  