function signin() {
  const email = $("#email").val();
  const password = $("#password").val();

  console.log(email, password)

  $.ajax({
    type: "POST",
    url: "user/sign-in",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    success: function (response) {
      window.location.replace("/")
    }
  })
}