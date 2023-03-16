function modal_open1(i) {
  $(`#Appmodal`).fadeIn();
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

      for (let i = 0; i < rows.length; i++) {
        let nickname = res["userNamesArray"][i];
        let clubMemberId = rows[i]["clubMemberId"];
        let userId = rows[i]["userId"];
        let date = rows[i]["createdAt"];
        date = date.split("T")[0];

        let temp_html = `
        <div class="app_body_container" onclick="modal_open2(); show_one_user(${userId}, ${clubMemberId}, '${nickname}');">
          <div class="member_name">
            <div class="member_body_name">
              ${nickname}
            </div>
          </div>
          <div class="member_body">
            <div class="member_body_content">
              내용
            </div>
          </div>
          <div class="member_date">
            <div class="member_body_date">
              ${date}
            </div>
          </div>
        </div>
        `;

        $(".app_body").append(temp_html);
      }
    },
  });
}

function show_one_user(userId, clubMemberId, nickname) {
  $.ajax({
    type: "GET",
    url: `/userpage/${userId}/clubs/app/${clubMemberId}`,
    async: false,
    success: function (res) {
      console.log(res);

      let temp_html = `
      <div class="app_title2">
          ${nickname}
      </div>
      <div class="app_body2">
        <div class="app_body2_content">
          ${res[0]["application"]}
        </div>
      </div>
      <div class="app_button2">
        <button type="button" class="app_btn" onclick="update_accepted(${userId}, ${clubMemberId})">수락</button>
        <button type="button" class="app_btn" onclick="delete_accepted(${userId}, ${clubMemberId})">거절</button>
      </div>
      `;
      $(".application2").append(temp_html);
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
  });
}

// function editInfo(userId) {
//   $.ajax({
//     type: "PATCH",

//     async: true,
//     success: function (res) {},
//   });
// }
