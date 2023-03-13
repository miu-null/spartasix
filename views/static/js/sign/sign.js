function modal_open() { 
  $(`#modal`).fadeIn();

  $(document).mouseup(function (e) {
      if($(`#modal`).has(e.target).length === 0) {
          $(`#modal`).hide();
      };
  });
};

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

  console.log(email, password);

  $.ajax({
    type: "POST",
    url: "auth/sign-in",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    success: function (response) {
      alert(response)
      window.location.replace("/")
    },
  });
}


function find_id() {

}

function find_password() {
  const email = $("#email1").val();
  const nickname = $("#nickname1").val();
  const phone = $("#phone1").val();

  console.log(email);
  console.log(nickname);
  console.log(phone);
}