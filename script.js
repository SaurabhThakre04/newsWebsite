const API_KEY="a3d2cc97408e478cad3773aa8e99fa13";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() =>  fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
     const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
     const data= await res.json();
     bindData(data.articles);
}

function bindData(articles){
    const cardsContainer =document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach( (article)=> {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSrc=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta",
    });

    newsSrc.innerHTML = `${article.source.name} . ${date}`;

    // cardClone.firstElementChild.addEventListner("click",() => {
    //  window.open(article.url,"_blank");
    // });
}

let currSelectedNav=null;

function onNavItemClick(id){
           fetchNews(id);
           const navItem=document.getElementById(id);
           currSelectedNav?.classList.remove("active");
           currSelectedNav=navItem;
           currSelectedNav.classList.add("active");
}

const SearchButton=document.getElementById('search-button');
const SearchText=document.getElementById('search-text');


SearchButton.addEventListener('click',()=>{
       const query=SearchText.value;
       if(!query) return;
       fetchNews(query);
       currSelectedNav.classList.remove("active");
       currSelectedNav=null;
})
