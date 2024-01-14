let accessKey = "AFJP3_g9tKs8-F_eghvPZoDsYvKvIcdczemFx7ScfXo"

let searchInput = document.querySelector("#searchInput");
let submitSearch = document.querySelector("#submitSearch");
let imageBody = document.querySelector("#imageBody");
let showMore = document.querySelector(".show_more");
let form = document.querySelector("form");
// console.log(searchInput,submitSearch,imageBody,showMore)

let searchData = "";
let page = 1;

async function search(){
    searchData = searchInput.value;
    let url =  `https://api.unsplash.com/search/photos?page=${page}&query=${searchData}&per_page=12&client_id=${accessKey}`;
    let response = await fetch(url);
    let data = await response.json()
    let result = data.results;
    if(page === 1){
        imageBody.innerHTML = "";
    }
    result.forEach(e => {
        let box = document.createElement("div");
        let image = document.createElement("img");
        let anchor = document.createElement("a");

        image.src = e.urls.small;
        anchor.href = e.links.html;
        anchor.target = "_blank";
        anchor.innerText = e.alt_description;
        box.appendChild(image);
        box.appendChild(anchor)
        imageBody.appendChild(box);
    });
    showMore.style.display = "block";
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    search();
})

showMore.addEventListener("click",()=>{
    page++;
    search();
})