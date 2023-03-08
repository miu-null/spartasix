const hypenTel = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

function signup() {
  const email = $("#email").val();
  const nickname = $("#nickname").val();
  const password = $("#password").val();
  const confirmpassword = $("#password_chk").val();
  const phone = $("#phone").val();
  $.ajax({
    type: "POST",
    url: "/user/sign-up",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      nickName: nickname,
      phone: phone,
    }),
    success: function (response) {
      console.log(response);
    },
    error: function (request, status, error) {
      alert("닉네임 또는 비밀번호가 올바르지 않습니다.")
    },
  });
}

function check_nickname() {
  const nickname = $("#nickname").val();

  $.ajax({
    type: "POST",
    url: "user/check-nickname",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      nickName: nickname,
    }),
    success: function (response) {
      if (response) {
        alert("이미 존재하는 닉네임 입니다.");
      }
    },
    error: function () {
      alert("사용 가능한 닉네임 입니다.");
    },
  });
}
