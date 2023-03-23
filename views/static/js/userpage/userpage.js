function modal_open1(userId) {
  $(`#Appmodal`).fadeIn();
  selectApp(userId);
  $(document).mouseup(function (e) {
    if ($(`#Appmodal`).has(e.target).length === 0) {
      $(`#Appmodal`).hide();

      window.location.reload();
    }
  });
}

function modal_open2() {
  $(`#Appmodal2`).fadeIn();
  $(document).mouseup(function (e) {
    if ($(`#Appmodal2`).has(e.target).length === 0) {
      $(`#Appmodal2`).hide();
      window.location.reload();
    }
  });
}

//ajax selectApp
function selectApp(userId) {
  $.ajax({
    type: "GET",
    url: `/userpage/${userId}/clubs/app`,
    async: false,
    success: function (res) {
      let rows = res["myApps"];

      console.log(rows);

      let full_html = "";

      for (let i = 0; i < rows.length; i++) {
        let nickname = rows[i]["nickName"];
        let clubMemberId = rows[i]["id"];
        let userId = rows[i]["userId"];
        let date = rows[i]["createdAt"];
        date = date.split("T")[0];

        let temp_html = `
        <div class="app_body_container" onclick="show_one_user(${userId}, ${clubMemberId}, '${nickname}');">
          <div class="member_name">
            <div class="member_body_name">
              ${clubMemberId}
            </div>
          </div>
          <div class="member_body">
            <div class="member_body_content">
              ${nickname}
            </div>
          </div>
          <div class="member_date">
            <div class="member_body_date">
              ${date}
            </div>
          </div>
        </div>
        `;
        full_html += temp_html;
      }

      $(".app_body").html(full_html);
    },
  });
}

function show_one_user(userId, clubMemberId, nickname) {
  $.ajax({
    type: "GET",
    url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
    async: false,
    success: function (res) {
      let temp_html = `
      <div class="app_body2">
        <div class="app_body2_content">
          ${res["application"]}
        </div>
		<div class="app_body2_from">
		  <span class="from_label">From</span>
		  <span class="nickname">${res["nickName"]}</span>
		</div>
      </div>
      <div class="app_button2">
        <button type="button" class="app_btn app_btn_confirm" onclick="update_accepted(${userId}, ${clubMemberId})">Accept!</button>
        <button type="button" class="app_btn app_btn_reject" onclick="delete_accepted(${userId}, ${clubMemberId})">Mehh-</button>
      </div>
      `;
      $(".app_action").html(temp_html);
    },
  });
}

function update_accepted(userId, clubMemberId) {
  $.ajax({
    type: "PATCH",
    url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
    async: false,
    success: function (res) {
      alert("수락 완료 !");
      window.location.reload();
    },
    error: function (request) {
      if (
        request.responseJSON["message"] === "로그인 후 이용 가능한 기능입니다."
      ) {
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "토큰이 만료되었습니다.") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "PATCH",
              url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
              async: false,
              success: function (res) {
                alert("수락 완료 !");
                window.location.reload();
              },
            });
          },
        });
      }
    }
  });
}

function delete_accepted(userId, clubMemberId) {
  $.ajax({
    type: "DELETE",
    url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
    async: false,
    success: function (res) {
      alert("거절 완료 !");
      window.location.reload();
    },
    error: function (request) {
      if (
        request.responseJSON["message"] === "로그인 후 이용 가능한 기능입니다."
      ) {
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "토큰이 만료되었습니다.") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "DELETE",
              url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
              async: false,
              success: function (res) {
                alert("거절 완료 !");
                window.location.reload();
              },
            });
          },
        });
      }
    }
  });
}

// function editInfo(userId) {
//   $.ajax({
//     type: "PATCH",

//     async: true,
//     success: function (res) {},
//   });
// }
