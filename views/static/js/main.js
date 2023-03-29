// document.addEventListener("DOMContentLoaded", function () {
//   const objString = window.localStorage.getItem("team_sparta_header");
//   const obj = JSON.parse(objString);
//   if (obj === null || Date.now() > obj.expire) {
//     window.localStorage.removeItem("team_sparta_header");
//     let temp_html = `
//       <div class="header_body">
//       <div class="header_title">
//       <a href="/" class="logo">
//       <img src="/img/로고.png" width="178">
//       </a>
//       </div>
//           <div class="category">
//               <ul class="navlist">
//                   <li class="list"><a href="/events/list">Events</a></li>
//                   <li><a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></li>
//                   <li class="list"><a href="/club/list">Clubs</a></li>
//               </ul>
//               </div>
//               <div class="header_list">
//               <section id="search-wrap">
//                   <div class="search">
//                       <form action="/search/all" class="search-form">
//                           <input type="search" id="term" name="term" class="form-control1" placeholder="🔍제목, 내용, 닉네임"
//                               aria-label="Search" pattern=".{1}|.{1,10}" required title="최소 1자 이상 입력해야 합니다">
//                       </form>
//                   </div>
//               </section>  
//               </div>
//               <div class="header_button">
//               <button onclick="location='/sign'" class="myButton">Log in</button>
//               </div>
//               </div>
//               `;

    // $("#login_header").append(temp_html);
//   }
//   const userId = obj.value;
//   if (obj !== null) {
//     let temp_html = `
//         <div class="header_body">
//           <div class="header_title">
//               <a href="/" class="logo">
//                   <img src="/img/로고.png" width="178">
//               </a>
//           </div>
//           <div class="category">
//               <ul class="navlist">
//                   <li class="list"><a href="/events/list">Events</a></li>
//                   <li><a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></li>
//                   <li class="list"><a href="/club/list">Clubs</a></li>
//               </ul>
//           </div>
//           <div class="header_list">
//               <section id="search-wrap">
//                   <div class="search">
//                       <form action="/search/all" class="search-form">
//                           <input type="search" id="term" name="term" class="form-control1" placeholder="🔍제목, 내용, 닉네임"
//                               aria-label="Search" pattern=".{1}|.{1,10}" required title="최소 1자 이상 입력해야 합니다">
//                       </form>
//                   </div>
//               </section>  
//           </div>
//           <ul class="navlist1">
//                   <li class="list1"><a href="/userpage/${userId}">My page</a></li>


//           </ul>
//           <div class="header_button">
//               <button onclick="logout()" class="myButton">Log out</button>
//           </div>
//         </div>
//         `;
//     $("#login_header").append(temp_html);
//   }
// });
