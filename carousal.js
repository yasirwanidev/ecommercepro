const track=document.getElementById("track");
const prevBtn=document.getElementById("prev");
const nextBtn=document.getElementById("next");
const dotsWrap=document.getElementById("dots");
const slides=Array.from(track.children);
const slideCount=slides.length;
console.log(slideCount);
let index = 0;
let width = document.querySelector(".viewport").clientWidth;
function setPosition() {
  track.style.transform = `translateX(${-width * index}px)`;
}
window.addEventListener("resize", () => {
  width = document.querySelector(".viewport").clientWidth;
  setPosition();
});
function updateDots() {
  dotsWrap.querySelectorAll("button").forEach((d, i) => {
    d.setAttribute("aria-current", i === index ? "true" : "false");
  });
}
function goTo(i) {
  if (i < 0) index = slideCount - 1;     
  else if (i >= slideCount) index = 0;    
  else index = i;
  setPosition();
  updateDots();
}
// Example usage: next/prev buttons
nextBtn.addEventListener("click", () => goTo(index + 1));
prevBtn.addEventListener("click", () => goTo(index - 1));
// Example usage: clicking a dot jumps straight to that slide
dotsWrap.querySelectorAll("button").forEach((d, i) => {
  d.addEventListener("click", () => goTo(i));
});
let products=[];
let filteredProducts=[];
async function fetchData(){
 try{
  let res=await fetch("https://fakestoreapi.com/products");
  if(!res.ok) throw new Error(`http error!:${res.status}`);
  let data=await res.json();
  products=data;
  filteredProducts=[...products];
  createFilterButton();
  displayProducts(filteredProducts);
}
catch(error){
  console.log(error);
}
}
  function createFilterButton(){
    let filterContainer=document.querySelector("#filters");
    filterContainer.innerHTML="";
    let categories=["All", ...new Set(products.map((p)=>p.category))];
    categories.forEach((cat)=>{
      const btn=document.createElement("button");
      btn.className="filter-btn";
      btn.textContent=cat;
      if(cat==="All")btn.classList.add("active");
      btn.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach((b)=>b.classList.remove("active"));
        btn.classList.add("active");
        filteredProducts=
        cat==="All"?[...products]:products.filter((p)=>p.category===cat);
        applysort();
        displayProducts(filteredProducts); 
    });
          filterContainer.appendChild(btn);
  });
  document.getElementById("sort").addEventListener("change",()=>{
    applysort();
    displayProducts(filteredProducts);
  });
}
  function applysort(){
    const sortvalue=document.getElementById("sort").value;
    if(!sortvalue)return;
    switch(sortvalue){
      case "price-asc":
        filteredProducts.sort((a,b)=> a.price-b.price);
      break;
      case "price-dsc":
      filteredProducts.sort((a,b)=> b.price-a.price);
      break;
      case "name-asc":
      filteredProducts.sort((a,b)=> a.title.localeCompare(b.title));
      break;
      case "name-dsc":
      filteredProducts.sort((a,b)=> b.title.localeCompare(a.title));
      break;
    }
   }
   function displayProducts(list){
    const container=document.getElementById("products");
    container.innerHTML="";
    list.forEach((p,index)=>{
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`<img src="${p.image}"
                          alt="${p.title}"
                          >
                    <h3><a href="product.html?id=${p.id}">${p.title}</a></h3>
                     <p><b>$${p.price}</b></p>`;
                     container.append(card);
                     setTimeout(()=>{
                      card.classList.add("show");
                     },index*50);
    });
   }
fetchData();