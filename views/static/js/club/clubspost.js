function modal_open() {
  const cardContainer = document.querySelector("#card-container");
  const cardCount = cardContainer.querySelectorAll(".card").length;
  console.log(`카드 개수: ${cardCount}`);
  const maxMembers = document.querySelector("#club_maxMember");
  const maxMembersCount = maxMembers.textContent;
  const numberOnly = parseInt(maxMembersCount.match(/\d+/));
  if (cardCount === numberOnly) {
    alert("모집이 마감되었습니다.");
    return false;
    window.location.reload();
  }
  $(`#club_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#club_modal`).has(e.target).length === 0) {
      $(`#club_modal`).hide();
    }
  });
}

function modal_open2() {
  $.ajax({
    type: "POST",
    url: "/auth/new-accessToken",
    success: function (response) {
      modal_open();
    },
    error: function (request) {
      if (request.responseJSON["message"] === "로그인이 필요한 기능입니다.") {
        alert("로그인이 필요한 기능입니다.");
        window.location.replace(`/sign`);
      }
    },
  });
}

function club_report_modal_open() {
  $(`#report_modal`).fadeIn();

  $(document).mouseup(function (e) {
    if ($(`#report_modal`).has(e.target).length === 0) {
      $(`#report_modal`).hide();
    }
  });
}

function report_close() {
  $(`#report_modal`).hide();
}

function club_report_modal_open2() {
  $.ajax({
    type: "POST",
    url: "/auth/new-accessToken",
    success: function (response) {
      club_report_modal_open();
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
function newPost() {
  $.ajax({
    type: "POST",
    url: "/auth/new-accessToken",
    success: function (response) {
      window.location.href = "/club/clubspost";
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

function clubpost() {
  const title = $("#club_title").val();
  const maxMembers = $("#club_maxMembers").val();
  const content = $("#club_content").val();
  const category = $("#club_category").val();
  // maxMembers = Number(maxMembers);
  if (!title || !maxMembers || !content) {
    alert("모든 항목을 작성해 주세요.");
    return false;
  }
  if (maxMembers < 2) {
    alert("최소 2명이상의 인원이 필요합니다");
    return false;
  }
  if (category == "카테고리") {
    alert("카테고리를 선택해주세요");
    return false;
  }
  $.ajax({
    type: "POST",
    url: "/club/clubspost",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      title: title,
      // maxMembers: Number(maxMembers),
      maxMembers: maxMembers,
      content: content,
      category: category,
    }),
    success: function (response) {
      alert("작성 완료");
      window.location.replace("/club/list");
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
              url: "/club/clubspost",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                title: title,
                maxMembers: maxMembers,
                content: content,
                category: category,
              }),
              success: function (response) {
                alert("작성 완료");
                window.location.replace("/club/list");
              },
            });
          },
        });
      }
    },
  });
}

function clubupdate() {
  const title = $("#club_title").val();
  const maxMembers = $("#club_maxMembers").val();
  const content = $("#club_content").val();
  const clubId = location.pathname.split("clubs/")[1];
  const category = $("#club_category").val();

  if (!title || !maxMembers || !content) {
    alert("모든 항목을 작성해 주세요.");
    return false;
  }
  if (maxMembers == String) {
    alert("최대인원수는 숫자로 입력해주세요");
    return false;
  }
  if (maxMembers < 2) {
    alert("최소 2명이상의 인원이 필요합니다");
    return false;
  }
  if (category == "카테고리") {
    alert("카테고리를 선택해주세요");
    return false;
  }

  console.log(clubId);
  $.ajax({
    type: "PUT",
    url: `/club/clubs/${clubId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      clubId: clubId,
      title: title,
      maxMembers: maxMembers,
      content: content,
      category: category,
    }),
    success: function (response) {
      alert("수정 완료");
      window.location.replace(`/club/list/${clubId}`);
    },
    error: function (request) {
      if (request.responseJSON["message"] === "게시글이 존재하지 않습니다.") {
        alert("게시글이 존재하지 않습니다.");
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
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "PUT",
              url: `/club/clubs/${clubId}`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                clubId: clubId,
                title: title,
                maxMemberes: maxMembers,
                content: content,
                category: category,
              }),
              success: function (response) {
                alert("수정 완료");
                window.location.replace(`/club/list/${clubId}`);
              },
            });
          },
        });
      }
    },
  });
}

function clubdelete() {
  const clubId = location.pathname.split("list/")[1];
  console.log(clubId);
  $.ajax({
    type: "DELETE",
    url: `/club/list/${clubId}`,
    success: function (response) {
      alert("삭제 완료");
      window.location.replace("/club/list");
    },
    error: function (request) {
      if (request.responseJSON["message"] === "게시글이 존재하지 않습니다.") {
        alert("게시글이 존재하지 않습니다.");
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
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "DELETE",
              url: `/club/list/${clubId}`,
              success: function (response) {
                alert("삭제 완료");
                window.location.replace("/club/list");
              },
            });
          },
        });
      }
    },
  });
}

function clubApp() {
  const clubId = location.pathname.split("list/")[1];
  const application = $("#club_modal_textarea").val();
  if (!application) {
    alert("모든 항목을 작성해 주세요.");
    return false;
  }
  $.ajax({
    type: "POST",
    url: `/club/${clubId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      application: application,
    }),
    success: function (response) {
      alert("신청 완료");
      window.location.replace(`/club/list/${clubId}`);
    },
    error: function (request) {
      if (request.responseJSON["message"] === "게시글이 존재하지 않습니다.") {
        alert("게시글이 존재하지 않습니다.");
        window.location.reload();
      }
      if (request.responseJSON["message"] === "중복 신청은 불가능합니다.") {
        alert("중복 신청은 불가능합니다.");
        window.location.reload();
      }
      if (
        request.responseJSON["message"] === "본인 모임에는 신청할 수 없습니다."
      ) {
        alert("본인 모임에는 신청할 수 없습니다.");
        window.location.reload();
      }
      if (
        request.responseJSON["message"] === "이미 참가하고 있는 모임입니다."
      ) {
        alert("이미 참가하고 있는 모임입니다.");
        window.location.reload();
      }
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
              url: `/club/${clubId}`,
              data: JSON.stringify({
                clubId: clubId,
                content: content,
              }),
              success: function (response) {
                alert("신청 완료");
                window.location.replace(`/club/list/${clubId}`);
              },
            });
          },
        });
      }
    },
  });
}

function createClubComment(postId) {
  const content = $("#club_textarea").val();

  $.ajax({
    type: "POST",
    url: `/clubcomment/create-comment/${postId}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      content: content,
    }),
    success: function (response) {
      alert("작성 완료 !");
      window.location.reload();
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
              url: `/clubcomment/create-comment/${postId}`,
              dataType: "json",
              contentType: "application/json; charset=utf-8",
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

function updateClubComment(commentId, content) {
  const content1 = document.querySelector(`#club_content_box_${commentId}`);
  const div = document.querySelector(`#club_content_${commentId}`);

  const delbutton = document.querySelector(`#club_del_button${commentId}`);
  const delbutton1 = document.querySelector(`#club_del_button1${commentId}`);
  const div2 = document.querySelector(`#club_comment_button${commentId}`);

  const deldiv = document.querySelector(`#club_like${commentId}`);
  const div3 = document.querySelector(`#club_text_container${commentId}`);

  const newcontent = document.createElement("input");
  const newbutton = document.createElement("input");

  div.removeChild(content1);
  div2.removeChild(delbutton);
  div2.removeChild(delbutton1);
  div3.removeChild(deldiv);

  div.appendChild(newcontent);
  div2.appendChild(newbutton);

  newcontent.setAttribute("class", "new_content");
  newcontent.setAttribute("id", `club_new_${commentId}`);
  newcontent.setAttribute("type", "text");
  newcontent.setAttribute("placeholder", `${content}`);

  newbutton.setAttribute("class", "new_club_button");
  newbutton.setAttribute("type", "button");
  newbutton.setAttribute("value", "edit");
  newbutton.setAttribute("id", `club_new_comment`);

  let update_comment = document.querySelector("#club_new_comment");
  update_comment.addEventListener("click", function () {
    const new_comment = $(`#club_new_${commentId}`).val();

    $.ajax({
      type: "PATCH",
      url: `/clubcomment/update-comment/${commentId}`,
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
          alert("로그인 후 이용 가능한 기능입니다.");
        }

        if (request.responseJSON["message"] === "Unauthorized") {
          $.ajax({
            type: "POST",
            url: "/auth/new-accessToken",
            success: function (response) {
              $.ajax({
                type: "PATCH",
                url: `/clubcomment/update-comment/${commentId}`,
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

function deleteClubComment(clubcommentId) {
  $.ajax({
    type: "DELETE",
    url: `/clubcomment/delete-comment/${clubcommentId}`,
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
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "DELETE",
              url: `/clubcomment/delete-comment/${clubcommentId}`,
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
function club_updateLike(commentId) {
  $.ajax({
    type: "POST",
    url: `/clubcomment/update_club_like/${commentId}`,
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
        alert("로그인 후 이용 가능한 기능입니다.");
      }

      if (request.responseJSON["message"] === "Unauthorized") {
        $.ajax({
          type: "POST",
          url: "/auth/new-accessToken",
          success: function (response) {
            $.ajax({
              type: "POST",
              url: `/clubcomment/update_club_like/${commentId}`,
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

function report_submit() {
  const reportReason = $("#reprot_reason").val();
  const reportContent = $("#report_content").val();
  const id = location.pathname.split("list/")[1];
  const clubId = location.pathname.split("list/")[1];
  console.log(reportContent, reportReason);
  if (!reportReason || !reportContent) {
    alert("모든 항목을 작성해 주세요.");
    return false;
  }
  $.ajax({
    type: "POST",
    url: `/club/report/${id}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      reportReason: reportReason,
      reportContent: reportContent,
      clubId: clubId,
    }),
    success: function (response) {
      alert("신고 완료");
      window.location.replace(`/club/list/${id}`);
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
                window.location.replace(`/club/list/${id}`);
              },
            });
          },
        });
      }
    },
  });
}
