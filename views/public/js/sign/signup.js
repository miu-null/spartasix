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
      console.log(response)
    },
    error: function (request, status, error) {
      console.log(request.status);  // 스테이터스 코드
      console.log(request.responseText) // 에러 메시지
      console.log(error)
    }
  });
}
