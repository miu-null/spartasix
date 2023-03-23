function sign_modal_open() {
  $(`#modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#modal`).has(e.target).length === 0) {
      $(`#modal`).hide();
    }
  });
}

const hypenTel = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

function sign_up() {
  const email = $("#email").val();
  const nickname = $("#nickname").val();
  const password = $("#password").val();
  const confirmpassword = $("#password_chk").val();
  const phone = $("#phone").val();

  if (!email || !password || !nickname || !phone || !confirmpassword) {
    alert("모든 항목을 작성해 주세요.");
  }

  $.ajax({
    type: "POST",
    url: "/auth/sign-up",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      nickName: nickname,
      phone: phone,
    }),
    success: function (response) {
      alert("회원가입 성공 !");
      window.location.reload();
    },
    error: function (request, status, error) {
      alert(request.responseJSON["message"]);
      if (
        request.responseJSON["message"] ===
        "비밀번호와 비밀번호 확인란이 일치하지 않습니다."
      ) {
        alert("비밀번호와 비밀번호 확인란이 일치하지 않습니다.");
        window.location.reload();
      }

      if (request.responseJSON["message"] === "이미 존재하는 닉네임 입니다.") {
        alert("이미 존재하는 닉네임 입니다.");
        window.location.reload();
      }

      if (request.responseJSON["message"] === "이미 존재하는 이메일 입니다.") {
        alert("이미 존재하는 이메일 입니다.");
        window.location.reload();
      }
    },
  });
}

function sign_in() {
  const email = $("#log_email").val();
  const password = $("#log_password").val();

  $.ajax({
    type: "POST",
    url: "auth/sign-in",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    success: function (response) {
      alert("로그인 성공 !");
      window.location.replace("/");
      
    },
  });
}

function find_password() {
  const email = $("#email1").val();
  const phone = $("#phone1").val();

  $.ajax({
    type: "POST",
    url: "auth/find-password",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      email: email,
      phone: phone,
    }),
    success: function (response) {
      alert("발송된 인증번호를 입력해 주세요.");
      checkpass(response.data);
    },
  });
}

// 미완성
function checkpass(randompassword) {
  const button = document.querySelector("#div-check"); // 인증 번호 넣을 div
  const subbutton = document.querySelector("#onsubmit"); // 지울 버튼
  const form = document.querySelector("#login1"); // 최상위 form
  const textinput = document.createElement("input");
  const textbutton = document.createElement("input");

  form.removeChild(subbutton);

  button.appendChild(textinput);
  button.appendChild(textbutton);

  textinput.setAttribute("class", "input-field1");
  textinput.setAttribute("id", "rename_pass");
  textinput.setAttribute("placeholder", "authentication password");

  textbutton.setAttribute("class", "submit12");
  textbutton.setAttribute("id", "checkpass");
  textbutton.setAttribute("type", "button");
  textbutton.setAttribute("value", "인증 하기");
  textbutton.style.height = "50px";

  let checkpass = document.querySelector("#checkpass");
  checkpass.addEventListener("click", function () {
    const rename_pass = $("#rename_pass").val();

    if (rename_pass !== randompassword.randomPassword) {
      alert("유효하지 않은 인증번호 입니다.");
    }

    if (rename_pass === randompassword.randomPassword) {
      alert("인증 완료. 새로운 비밀번호를 입력해주세요.");
      const input1 = document.querySelector("#email1"); // 지울 input
      const input2 = document.querySelector("#phone1"); // 지울 input
      const input3 = document.querySelector("#rename_pass"); // 지울 input
      const button1 = document.querySelector("#checkpass"); // 지울 input
      const newpassinput = document.createElement("input");
      const newpassbutton = document.createElement("input");

      form.appendChild(newpassinput);
      form.appendChild(newpassbutton);

      form.removeChild(input1);
      form.removeChild(input2);
      button.removeChild(input3);
      button.removeChild(button1);

      newpassinput.setAttribute("class", "input-field1");
      newpassinput.setAttribute("id", "new_input");
      newpassinput.setAttribute("placeholder", "new password");

      newpassbutton.setAttribute("class", "submit12");
      newpassbutton.setAttribute("id", "new_passbtn");
      newpassbutton.setAttribute("type", "button");
      newpassbutton.setAttribute("value", "비밀번호 변경하기");
      newpassbutton.style.height = "50px";

      let newpass = document.querySelector("#new_passbtn");
      newpass.addEventListener("click", function () {
        const newpassword = $("#new_input").val();

        $.ajax({
          type: "PATCH",
          url: "auth/new-password",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          async: false,
          data: JSON.stringify({
            email: randompassword.findemail["email"],
            password: newpassword,
          }),
          success: function (response) {
            alert("비밀번호 수정 완료 !");
            window.location.reload();
          },
        });
      });
    }
  });
}

function test() {
  $.ajax({
    type: "GET",
    url: "/auth/test",
    success: function (response) {
      console.log(response)
    },
    error: function (request) {
      console.log(request.responseJSON["message"])

        $.ajax({
          type: "GET",
          url: "/auth/new-accessToken",
          async: false,
          success: function(response) {
          }
        })
    }
  })
}