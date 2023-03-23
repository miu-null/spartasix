function event_open() {
  $(`#event_modal1`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#event_modal1`).has(e.target).length === 0) {
      $(`#event_modal1`).hide();
    }
  });
}

function remindEvent() {
  const email = $("#event_modal_email").val();

  $.ajax({
    type: "POST",
    url: `/events/remindEvent`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      email: email,
    }),
    success: function (response) {
      alert("이벤트 알림 메일을 전송했습니다.");
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
              type: "POST",
              url: `/events/remindEvent`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              async: false,
              data: JSON.stringify({
                email: email,
              }),
              success: function (response) {
                alert("이벤트 알림 메일을 전송했습니다.");
              },
            });
          },
        });
      }
    },
  });
}

function eventNew() {
  const title = $("#eventTitle").val();
  const startDate = $("#eventStartDate").val();
  const endDate = $("#eventEndDate").val();
  const content = $("#eventContent").val();
  const postIMG = $("#eventPostImg").val();

  $.ajax({
    type: "POST",
    url: "/events/newevent",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      startDate: startDate,
      endDate: endDate,
      content: content,
      postIMG: postIMG,
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("/events/list");
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
              type: "POST",
              url: "/events/newevent",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                title: title,
                startDate: startDate,
                endDate: endDate,
                content: content,
                postIMG: postIMG,
              }),
              success: function (response) {
                alert("작성 완료");
                window.location.replace("/events/list");
              },
            });
          },
        });
      }
    },
  });
}

function updateEvent(eventPostId) {
  const title = $("#title2").val();
  const date = $("#date2").val();
  const content = $("#content2").val();

  console.log("제목 : " + title);
  console.log("내용 : " + content);
  console.log(date);
  console.log(eventPostId);
  $.ajax({
    type: "PATCH",
    url: `/events/list/${eventPostId}/update`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      content: content,
      date: date,
    }),
    success: function (response) {
      alert("수정 완료");
      window.location.replace(`/events/list/${eventPostId}`);
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
              url: `/events/list/${eventPostId}/update`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                title: title,
                content: content,
                date: date,
              }),
              success: function (response) {
                alert("수정 완료");
                window.location.replace(`/events/list/${eventPostId}`);
              },
            });
          },
        });
      }
    },
  });
}

function deleteEvent(eventPostId) {
  $.ajax({
    type: "DELETE",
    url: `/events/list/${eventPostId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: {},
    success: function (response) {
      alert("삭제완료");
      window.location.replace("/events/list");
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
              url: `/events/list/${eventPostId}`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: {},
              success: function (response) {
                alert("삭제완료");
                window.location.replace("/events/list");
              },
            });
          },
        });
      }
    },
  });
}

function createEventComment(postId) {
  const content = $("#comment_textarea").val();

  $.ajax({
    type: "POST",
    url: `/eventcomment/create-comment/${postId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      content: content,
    }),
    success: function (response) {
      alert("작성 완료 !");
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
              type: "POST",
              url: `/eventcomment/create-comment/${postId}`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              async: false,
              data: JSON.stringify({
                content: content,
              }),
              success: function (response) {
                alert("작성 완료 !");
                window.location.reload();
              },
            });
          },
        });
      }
    },
  });
}

function updateEventComment(commentId, content) {
  const content1 = document.querySelector(`#content_box_${commentId}`);
  const div = document.querySelector(`#content_${commentId}`);

  const delbutton = document.querySelector(`#comment_del_button${commentId}`);
  const delbutton1 = document.querySelector(`#comment_del_button1${commentId}`);
  const div2 = document.querySelector(`#event_comment_button${commentId}`);

  const deldiv = document.querySelector(`#comment_like${commentId}`);
  const div3 = document.querySelector(`#comment_text_container${commentId}`);

  const newcontent = document.createElement("input");
  const newbutton = document.createElement("input");

  div.removeChild(content1);
  div2.removeChild(delbutton);
  div2.removeChild(delbutton1);
  div3.removeChild(deldiv);

  div.appendChild(newcontent);
  div2.appendChild(newbutton);

  newcontent.setAttribute("class", "new_content");
  newcontent.setAttribute("id", `new_${commentId}`);
  newcontent.setAttribute("type", "text");
  newcontent.setAttribute("placeholder", `${content}`);

  newbutton.setAttribute("class", "new_comment_button");
  newbutton.setAttribute("type", "button");
  newbutton.setAttribute("value", "edit");
  newbutton.setAttribute("id", `new_comment`);

  let update_comment = document.querySelector("#new_comment");
  update_comment.addEventListener("click", function () {
    const new_comment = $(`#new_${commentId}`).val();

    $.ajax({
      type: "PATCH",
      url: `/eventcomment/update-comment/${commentId}`,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        content: new_comment,
      }),
      success: function (response) {
        alert("수정 완료");
        window.location.reload();
      },
      error: function (request) {
        if (request.responseJSON["message"] === "댓글이 존재하지 않습니다.") {
          alert("댓글이 존재하지 않습니다.");
          window.location.reload();
        }
        if (
          request.responseJSON["message"] ===
          "작성자만 사용할 수 있는 기능입니다."
        ) {
          alert("작성자만 사용할 수 있는 기능입니다.");
          window.location.reload();
        }

        if (
          request.responseJSON["message"] ===
          "로그인 후 이용 가능한 기능입니다."
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
                url: `/eventcomment/update-comment/${commentId}`,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                  content: new_comment,
                }),
                success: function (response) {
                  alert("수정 완료");
                  window.location.reload();
                },
                error: function (request) {
                  if (
                    request.responseJSON["message"] ===
                    "댓글이 존재하지 않습니다."
                  ) {
                    alert("댓글이 존재하지 않습니다.");
                    window.location.reload();
                  }
                  if (
                    request.responseJSON["message"] ===
                    "작성자만 사용할 수 있는 기능입니다."
                  ) {
                    alert("작성자만 사용할 수 있는 기능입니다.");
                    window.location.reload();
                  }
                },
              });
            },
          });
        }
      },
    });
  });
}

function deleteEventComment(eventcommentId) {
  $.ajax({
    type: "DELETE",
    url: `/eventcomment/delete-comment/${eventcommentId}`,
    data: {},
    success: function (response) {
      alert("삭제 성공 !");
      window.location.reload();
    },
    error: function (request) {
      if (request.responseJSON["message"] === "댓글이 존재하지 않습니다.") {
        alert("댓글이 존재하지 않습니다.");
        window.location.reload();
      }
      if (
        request.responseJSON["message"] ===
        "작성자만 사용할 수 있는 기능입니다."
      ) {
        alert("작성자만 사용할 수 있는 기능입니다.");
        window.location.reload();
      }

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
              url: `/eventcomment/delete-comment/${eventcommentId}`,
              data: {},
              success: function (response) {
                alert("삭제 성공 !");
                window.location.reload();
              },
              error: function (request) {
                if (
                  request.responseJSON["message"] ===
                  "댓글이 존재하지 않습니다."
                ) {
                  alert("댓글이 존재하지 않습니다.");
                  window.location.reload();
                }
                if (
                  request.responseJSON["message"] ===
                  "작성자만 사용할 수 있는 기능입니다."
                ) {
                  alert("작성자만 사용할 수 있는 기능입니다.");
                  window.location.reload();
                }
              },
            });
          },
        });
      }
    },
  });
}

function updateLike(commentId) {
  $.ajax({
    type: "POST",
    url: `/eventcomment/update_event_like/${commentId}`,
    data: {},
    success: function (response) {
      alert("좋아요 !");
      window.location.reload();
    },
    error: function (request) {
      if (request.responseJSON["message"] === "좋아요 취소") {
        alert("좋아요 취소 !");
        window.location.reload();
      }

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
              type: "POST",
              url: `/eventcomment/update_event_like/${commentId}`,
              data: {},
              success: function (response) {
                alert("좋아요 !");
                window.location.reload();
              },
              error: function (request) {
                if (request.responseJSON["message"] === "좋아요 취소") {
                  alert("좋아요 취소 !");
                  window.location.reload();
                }
              },
            });
          },
        });
      }
    },
  });
}
