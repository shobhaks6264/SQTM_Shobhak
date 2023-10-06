import { getData } from "./script.js";

import {book_img , title , author , contributor , publisher , description , buy_links , similar_container , default_review , hidepopup ,get_reviews , get_similar_books ,createModal } from "./modal.js";
let modal = document.getElementById("modal_display");
let card_display = document.getElementById("render");
card_display.onclick = function (event) {
  let img_id = event.target.id;
  let img_src=event.target.src;
    render_modal(img_id,img_src);
  
};
similar_container.onclick = function (event) {
    // modal.innerHTML=``;
    let img_id = event.target.id;
    let img_src=event.target.src;
      render_modal(img_id,img_src);
    
  };

function render_modal(img_id,img_src)
{
    let data = "";
    getData().then((res) => {
        data = res.results.lists.map((item) => {
          return item.books.filter((book) => book.primary_isbn10 === img_id);
        });
        let i=0;
        data.forEach((list) => {
          if (list.length === 0) {
          } else {
            modal_display(
              list[0].title,
              img_src,
              list[0].author,
              list[0].description,
              list[0].contributor,
              list[0].publisher,
              list[0].primary_isbn10,
              list[0].buy_links
            );
          }
          i++;
        });
      });
}

hidepopup.onclick = function (event) {
  modal.style.display = "none";
};

function modal_display(s_title, s_img,s_author,s_des,s_cont,s_pub, s_isbn,s_buy_links) {
  const f  = createModal();
  modal.style.display = "block";
  buy_links.innerHTML = ``;
  book_img.setAttribute("src", s_img);
  title.innerHTML = s_title;
  author.innerHTML = s_author;
  description.innerHTML = s_des;
  contributor.innerHTML = s_cont;
  publisher.innerHTML = s_pub;
  default_review.innerHTML = "";
  s_buy_links.forEach((nu) => {
    document.getElementById("buylinks").innerHTML += `<a href="${nu.url}" target="_blank">${nu.name}</a>`;
  });
    get_reviews(s_title);
    get_similar_books(s_isbn);

  
}
