function modal_open1() {
  $(`#Appmodal`).fadeIn();
  $(document).mouseup(function (e) {
    if ($(`#Appmodal`).has(e.target).length === 0) {
      $(`#Appmodal`).hide();
    }
  });
}

//ajax selectApp
function selectApp(userId, clubMemberId) {
  $.ajax({
    type: "GET",
    url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    success: function (res) {
      console.log(res);
    },
  });
}
// const modal = document.getElementById("modal");
// const overlay = document.getElementById("overlay");
// const trigger = document.getElementById("trigger");
// const closeBtn = document.getElementById("close");

// trigger.addEventListener("click", () => {
//   overlay.classList.add("active");
//   modal.classList.add("active");
// });

// closeBtn.addEventListener("click", () => {
//   overlay.classList.remove("active");
//   modal.classList.remove("active");
// });
