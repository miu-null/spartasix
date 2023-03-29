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

function start_commue_club() {
  const objString = window.localStorage.getItem("team_sparta_header");
  const obj = JSON.parse(objString);
  if (obj === null || Date.now() > obj.expire) {
    window.location.href = "/sign";
  }

  if (obj !== null || Date.now() < obj.expire) {
    alert("이미 로그인한 상태입니다.");
    return;
  }
}

function sign_up() {
  const reg = new RegExp(
    /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
  );

  const email = $("#email").val();
  const nickname = $("#nickname").val();
  const password = $("#password").val();
  const confirmpassword = $("#password_chk").val();
  const phone = $("#phone").val();

  if (!email || !password || !nickname || !phone || !confirmpassword) {
    alert("모든 항목을 작성해 주세요");
  }

  if (!reg.test(password)) {
    alert(
      "비밀번호는 최소8글자, 하나이상의 문자 및 숫자, 특수문자가(!@#$%^&+=]) 들어가야 합니다. ",
    );
    return false;
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
    url: "/auth/sign-in",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    success: function (response) {
      const obj = {
        value: response,
        expire: Date.now() + 432000000,
      };
      const objString = JSON.stringify(obj);
      window.localStorage.setItem("team_sparta_header", objString);

      alert("로그인 성공 !");
      window.location.replace("/");
    },
    error: function (request) {
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("회원이 존재하지 않습니다.");
      }

      if (request.responseJSON["message"] === "비밀번호가 올바르지 않습니다.") {
        alert("비밀번호가 올바르지 않습니다.");
      }
    },
  });
}

function logout() {
  $.ajax({
    type: "POST",
    url: "/auth/logout",
    success: function (response) {
      window.localStorage.removeItem("team_sparta_header");
      window.location.reload();
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
      alert("발송된 인증번호를 입력해 주세요 !");
      checkpass(response.data);
    },
    error: function (request) {
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("이메일 혹은 전화번호가 올바르지 않습니다.");
      }
    },
  });
}

function checkpass(randompassword) {
  const button = document.querySelector("#div-check");
  const subbutton = document.querySelector("#onsubmit");
  const form = document.querySelector("#sign_login1");
  const textinput = document.createElement("input");
  const textbutton = document.createElement("input");

  form.removeChild(subbutton);

  button.appendChild(textinput);
  button.appendChild(textbutton);

  textinput.setAttribute("class", "sign_input-field1");
  textinput.setAttribute("id", "rename_pass");
  textinput.setAttribute("placeholder", "authentication password");

  textbutton.setAttribute("class", "sign_submit12");
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
      const input1 = document.querySelector("#email1");
      const input2 = document.querySelector("#phone1");
      const input3 = document.querySelector("#rename_pass");
      const button1 = document.querySelector("#checkpass");
      const newpassinput = document.createElement("input");
      const newpassbutton = document.createElement("input");

      form.appendChild(newpassinput);
      form.appendChild(newpassbutton);

      form.removeChild(input1);
      form.removeChild(input2);
      button.removeChild(input3);
      button.removeChild(button1);

      newpassinput.setAttribute("class", "sign_input-field1");
      newpassinput.setAttribute("id", "new_input");
      newpassinput.setAttribute("placeholder", "new password");
      newpassinput.setAttribute("type", "password");

      newpassbutton.setAttribute("class", "sign_submit12");
      newpassbutton.setAttribute("id", "new_passbtn");
      newpassbutton.setAttribute("type", "button");
      newpassbutton.setAttribute("value", "비밀번호 변경하기");
      newpassbutton.style.height = "50px";

      let newpass = document.querySelector("#new_passbtn");
      newpass.addEventListener("click", function () {
        const newpassword = $("#new_input").val();

        $.ajax({
          type: "PATCH",
          url: "/auth/new-password",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          async: false,
          data: JSON.stringify({
            email: randompassword.findemail["email"],
            password: newpassword,
          }),
          success: function (response) {
            alert("비밀번호 수정 완료");
            window.location.reload();
          },
        });
      });
    }
  });
}
