function event_open() {
  $(`#event_modal1`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#event_modal1`).has(e.target).length === 0) {
      $(`#event_modal1`).hide();
    }
  });
}

function event_remind_modal_open() {
  $.ajax({
    type: "POST",
    url: "/auth/new-accessToken",
    success: function (response) {
      event_open()
    },
    error: function (request) {
      if (request.statusText === "Unauthorized") {
        alert("로그인이 필요한 기능입니다.");
        window.location.replace(`/sign`);
      }
    },
  });
}


function updateDateValidate() {
  let startDate = new Date($("#startDate").val());
  let endDate = new Date($("#endDate").val());
  console.log('날짜 값 확인', startDate, endDate)
  if (startDate > endDate) {
    alert("종료 날짜는 시작 날짜보다 커야 합니다.");
  }
}

function remindEvent() {
  const id = document.getElementById("event_id").innerText;
  const title = document.getElementById("event_title").innerText;
  const email = document.getElementById("event_modal_email").value;
  const startDate = document.getElementById("event_startDate").innerText;
  const endDate = document.getElementById("event_endDate").innerText;

  $.ajax({
    type: "POST",
    url: `/events/remindEvent`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    data: JSON.stringify({
      id: id,
      title: title,
      email: email,
      startDate: startDate,
      endDate: endDate,
    }),
    success: function (response) {
      alert("이벤트 알림 메일을 전송했습니다.");
      window.location.replace("/events/list");
    },
    error(request) {
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
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
                id: id,
                title: title,
                email: email,
                startDate: startDate,
                endDate: endDate,
              }),
              success: function (response) {
                alert("이벤트 알림 메일을 전송했습니다.");
                window.location.replace("/events/list");
              },
            });
          },
        });
      }
    },
  });
}

function eventNew() {
  const formData = new FormData();
  let startDate = new Date($("#eventStartDate").val());
  let endDate = new Date($("#eventEndDate").val());

  formData.append("title", $("#eventTitle").val());
  formData.append("startDate", $("#eventStartDate").val());
  formData.append("endDate", $("#eventEndDate").val());
  formData.append("content", $("#eventContent").val());
  formData.append("file", $("#eventPostImg")[0].files[0]);
  file = $("#eventPostImg")[0].files[0];

  if (startDate > endDate) {
    alert("종료 날짜는 시작 날짜보다 커야 합니다.");
    return false
  }

  $.ajax({
    type: "POST",
    url: "/events/newevent",
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (response) {
      alert("작성 완료");
      window.location.replace("/events/list");
    },
    error: function (request) {
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "POST",
              url: "/events/newevent",
              data: formData,
              enctype: "multipart/form-data",
              processData: false,
              contentType: false,
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
  const formData = new FormData();
  let startDate = new Date($("#eventStartDate").val());
  let endDate = new Date($("#eventEndDate").val());

  formData.append("title", $("#event_title").val());
  formData.append("startDate", $("#startDate").val());
  formData.append("endDate", $("#endDate").val());
  formData.append("content", $("#event_content").val());
  formData.append("file", $("#eventPostImg")[0].files[0]);

  if (startDate > endDate) {
    alert("종료 날짜는 시작 날짜보다 커야 합니다.");
    return false
  }


  $.ajax({
    type: "PATCH",
    url: `/events/list/${eventPostId}/update`,
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (response) {
      alert("수정 완료");
      window.location.replace(`/events/list/${eventPostId}`);
    },
    error: function (request) {
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "PATCH",
              url: `/events/list/${eventPostId}/update`,
              data: formData,
              enctype: "multipart/form-data",
              processData: false,
              contentType: false,
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
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
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
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
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
          error: function (request) {
            if (request.responseJSON["message"] === "로그인이 필요한 기능입니다.") {
              alert("로그인 후 이용 가능한 기능입니다.");
            }
          }
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

        if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
          alert("로그인 후 이용가능한 기능입니다.");
        }

        if (request.responseJSON["message"] === "Unauthorized") {
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

      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
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

      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
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
function event_report_modal_open() {
  $(`#report_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#report_modal`).has(e.target).length === 0) {
      $(`#report_modal`).hide();
    }
  });
}

function event_report_close() {
  $(`#report_modal`).hide();
}

function event_report_modal_open2() {
  $.ajax({
    type: "POST",
    url: "/auth/new-accessToken",
    success: function (response) {
      event_report_modal_open()
    },
    error: function (request) {
      console.log(request);
      if (request.statusText === "Unauthorized") {
        alert("로그인이 필요한 기능입니다.");
        window.location.replace(`/sign`);
      }
    },
  });
}

function event_report_submit() {
  const reportReason = $("#reprot_reason").val();
  const reportContent = $("#report_content").val();
  const id = location.pathname.split("list/")[1];
  const eventPostId = location.pathname.split("list/")[1];
  console.log(id, reportContent, reportReason);
  if (!reportReason || !reportContent) {
    alert("모든 항목을 작성해 주세요.");
    return false;
  }
  $.ajax({
    type: "POST",
    url: `/events/report/${id}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      reportReason: reportReason,
      reportContent: reportContent,
      eventPostId: eventPostId,
    }),
    success: function (response) {
      alert("신고 완료");
      window.location.replace(`/events/list/${id}`);
    },
    error: function (request) {
      if (request.responseJSON["message"] === "회원이 존재하지 않습니다.") {
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "POST",
              url: `/list/report/${id}`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                reportReason: reportReason,
                reportContent: reportContent,
                clubId: clubId,
              }),
              success: function (response) {
                alert("신고 완료");
                window.location.replace(`/events/list/${id}`);
              },
            });
          },
        });
      }
    },
  });
}
