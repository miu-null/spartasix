// $(function () {
//   //직접입력 인풋박스 기존에는 숨어있다가

//   $("#selboxDirect").hide();

//   $("#selbox").change(function () {
//     //직접입력을 누를 때 나타남

//     if ($("#selbox").val() == "direct") {
//       $("#selboxDirect").show();
//     } else {
//       $("#selboxDirect").hide();
//     }
//   });
// });
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
      window.location.replace("club");
    },
  });
}
