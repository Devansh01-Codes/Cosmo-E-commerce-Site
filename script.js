

document.addEventListener("DOMContentLoaded",()=>{
  initCategories();
  initProductSlider();
  initNewArrivals();
  if(document.querySelector(".shop-container")) {
    loadStateFromUrl();
    syncCheckBoxesFromUrl();
    initShopItems();
  }
  
  // Detect product page
  if(document.querySelector(".product-images")) {
    initProductPage();
  }
  if(document.querySelector("#cart")) {
    updateCart();
  }
  const hamburger = document.querySelector(".hamburger");
  const navContent = document.querySelector(".navcontent");
  const hamburgerImg = document.querySelector(".hamburger img");
  if(!hamburger) return
  hamburger.addEventListener("click", () => {
    navContent.classList.toggle("active-navbar");
  
    if (navContent.classList.contains("active-navbar")) {
      hamburgerImg.src = "images/close.svg";
    } else {
      hamburgerImg.src = "images/hamburger.svg";
    }
  });
})

const allCategories=[
  {img:"ichigo.png",title:"Men Outfits", category:"men"},
  {img:"makima-1.png",title:"women Outfits",category:"women"},
  {img:"law-fig.png",title:"Collectables",category:"figures"},
  {img:"inosuke-mask.png",title:"Props ",category:"others"},
  {img:"water-blade.png",title:"cosplay weapons",category:"others"},
]
function initCategories(){
  const categoryWrapper = document.querySelector(".categories");
  const Viewport = document.querySelector(".category-viewport");
  const sliderBtns = document.querySelector(".jump-btns");
  
if(!categoryWrapper || !Viewport || !sliderBtns)return

createCategory(categoryWrapper)


const card = document.querySelector(".cat-card");
const cardWidth = card.offsetWidth + 10;
const totalCards = document.querySelectorAll(".cat-card").length;

const visibleCards = Math.floor(Viewport.offsetWidth / cardWidth);
const maxTranslate = -(totalCards - visibleCards)*cardWidth;

let currentX =0;

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
sliderBtns.addEventListener("click",(e)=>{
  if(e.target.id === "left"){
    currentX += cardWidth * visibleCards;
    leftBtn.classList.add("active-btn");
    rightBtn.classList.remove("active-btn");
    if(currentX>0){
      currentX=0;
    }
  }
  if(e.target.id === "right"){
    currentX -= cardWidth * visibleCards;
    rightBtn.classList.add("active-btn");
    leftBtn.classList.remove("active-btn");
    if(currentX<maxTranslate){
      currentX = maxTranslate;
    }
  }
  categoryWrapper.style.transform=`translateX(${currentX}px)`
});

}

function createCategory(wrapper){
  allCategories.forEach(data=>{
    const categoryCard = document.createElement("div")
    categoryCard.classList.add("cat-card");
    categoryCard.dataset.category=`${data.category}`;
    categoryCard.innerHTML=`
    <img src="images/${data.img}" class="action-figure" alt="">
    <h4>${data.title}</h4>
    `
      categoryCard.addEventListener("click",()=>{
        window.location.href=`shop.html?category=${data.category}`;
      })
    wrapper.appendChild(categoryCard);
  })
}


const productdata =[
  {id:2,img:"zoro-1.png",title:"Zoro kimono dress ", subtitle:"one piece",price:"4999",category:"men"},
  {id:6,img:"rem-1.png",title:"Rem cosplay Dress",subtitle:"Re zero",price:2499,category:"women"},
  {id:19,img:"tanjiro-1.png",title:"tanjiro cosplay dress",subtitle:"DS",price:1999,category:"men"},
  {id:12,img:"yamato-1.png",title:"yamato full dress",subtitle:"DS",price:3499,category:"women",},
  {id:31,img:"inosuke-mask.png",title:"inosuke real Mask", subtitle:"DS",price:"3999",category:"others"},
  {id:22,img:"Minato-1.png",title:"Hokage Dress",subtitle:"naruto",price:2499,category:"men"},
  
  {id:15,img:"zenitsu-3.png",title:"zenitsu kimono Dress",subtitle:"DS",price:3499,category:"men"},
  {id:13,img:"goku-1.png",title:"Goku classic dress", subtitle:"dragon ball",price:"4999",category:"men"},
  {id:4,img:"mitsuri-1.png",title:"mitsuri cosplay Dress",subtitle:"DS",price:3499,category:"women"},
  {id:10,img:"nezuko.png",title:"nezuko kimono dress",subtitle:"DS",price:1999,category:"women"},
  {id:1, img:"luffy-1.png",title:"Luffy classic dress", subtitle:"one piece",price:"4999",category:"men"},
  {id:27,img:"law-fig.png",title:"inosuke action figure", subtitle:"one piece",price:"699",category:"figures"},
    
  ]
  
  let itemsPerPage = 6;
  let currentIndex = 0;

function initProductSlider(){

  const productContainer = document.querySelector(".subcontainer");
  const right = document.querySelector(".right-slide")
  const left = document.querySelector(".left-slide")
  
  if(!productContainer || !right || !left) return;

  renderProductPage(productContainer);
updateSliderButtons(left,right);

right.addEventListener("click",()=>{
  if(currentIndex + itemsPerPage >=productdata.length) return;
  currentIndex += itemsPerPage;
  renderProductPage(productContainer, "right");
  updateSliderButtons(left,right);
})
left.addEventListener("click",()=>{
  if(currentIndex===0) return;
  currentIndex -=itemsPerPage;
  renderProductPage(productContainer,"left");
  updateSliderButtons(left, right);
})
  
}

function capitalizeWords(str) {
  if(!str) return;
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function updateSliderButtons(left, right) {
    left.disabled=currentIndex === 0;
    right.disabled=currentIndex + itemsPerPage >= productdata.length;

      left.style.backgroundColor = left.disabled ? "grey":"var(--accent)"
      right.style.backgroundColor = right.disabled ? "grey":"var(--accent)"
}

  function renderProductPage(productContainer, direction ="right"){
    
    productContainer.style.transition = "none"
    productContainer.style.transform = direction==="right"? "translateX(100%)" : "translateX(-100%)";

    productContainer.offsetWidth;

    productContainer.innerHTML="";

  const visibleProducts = productdata.slice(currentIndex, currentIndex+itemsPerPage)
  
  visibleProducts.forEach(data=>{
    const product = document.createElement("div");
    product.classList.add("product-card");

  let random = Math.floor(Math.random()*(7999-5999 +1))+5999;
  let productTitle = capitalizeWords(data.title);
  let productSubtitle = capitalizeWords(data.subtitle);
    product.innerHTML=`
    <div class="product-image">
        <img src="images/${data.img}" alt="image">
        
      </div>
      
      <div class="product-content">
        <h6>${productSubtitle}</h6>
        <h4>${productTitle}</h4>
        <div class="star">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>  
      </div>
        <p><span>Rs ${random} </span>${data.price}Rs</p>
      </div>
      <div class="btns">
        <button class="btn-normal">Buy Now</button>
        <button class="btn-normal add-to-cart">Add to cart</button>

      </div>
    `
    productContainer.appendChild(product)
    const image = product.querySelector("img")
    const addCart = product.querySelector(".add-to-cart")
    image.addEventListener("click",()=>{
      window.location.href= `product.html?id=${data.id}`
    });
    addCart.addEventListener("click",()=>{
    addItemToCart(data);
    addCart.textContent="Added"
    })
   
  });
  requestAnimationFrame(()=>{
    productContainer.style.transition = "transform 0.8s ease"
      productContainer.style.transform = "translateX(0)"
  });

}

function addItemToCart(product){
 if (product && product.id) {
  let cart = JSON.parse(localStorage.getItem("cart"))||[];
  const exists =  cart.find(item => item.id ===product.id)
  if(exists){
   exists.qty += 1;
  }else{
   cart.push({...product, qty: 1});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}


}


const newarrivals=[
  {id:10,img:"nezuko.png",title:"Nezuko Kimono dress",subtitle:"DS",price:1999,category:"women",subimg:["nezuko.png","nezuko.png","nezuko.png"]},
  {id:14,img:"naruto-1.png",title:"Naruto shippudin dress", subtitle:"naruto",price:"3499",category:"men",subimg:["naruto-1.png","naruto-2.png","naruto-3.png"]},
  {id:25,img:"inosuke-fig.png",title:"inosuke action figure", subtitle:"DS",price:"799",category:"figures",subimg:[]},
  {id:40,img:"action-figure1.jpg",title:"Giyu action figures",subtitle:"DS" ,price:"599",category:"figures",subimg:[]},
  {id:5,img:"s-art-o-1.png",title:"Yuki Asuna Dress",subtitle:"others",price:3499,category:"women",subimg:["s-art-o-1.png","s-art-o-2.png","s-art-o-3.png"]},
  {id:36,img:"aot-sword.png",title:"AOT scout Sword", subtitle:"DS",price:"2999",category:"others",subimg:[]},

]

function initNewArrivals(){

  const newContainer = document.querySelector(".newproduct-container");

  if(!newContainer) return;

  createNewArrivals(newContainer);
}
function createNewArrivals(container){
newarrivals.forEach(data=>{

  const newProduct = document.createElement("div");
  newProduct.classList.add("newproduct-card")

  let productTitle = capitalizeWords(data.title);
  let productSubtitle = capitalizeWords(data.subtitle);

  newProduct.innerHTML=`
  <div class="newproduct-image">
        <img src="images/${data.img}" alt="Nezuko">
      </div>
      <div class="newproduct-content">
        <span>${productSubtitle}</span>
        <h4>${productTitle}</h4>
      </div>
      <div class="badge">NEW</div>
  `
  container.appendChild(newProduct);

  newProduct.addEventListener("click",()=>{
    window.location.href= `product.html?id=${data.id}`
  })

})
}

/*
fetch("shopProducts.json")
 .then(response=>{

if(!response.ok){

    throw new Error("Failed to load products")
  }
   return response.json();
 })
 .then(items=>{
      initShopItems(items);

})
 .catch(error=>console.log(error)); 
 */

const shopItems =[
  {id:1, img:"luffy-1.png",title:"Luffy classic dress", subtitle:"one piece",price:"4999",category:"men",subimg:["luffy-1.png","luffy-2.png","luffy-3.png"]},
  {id:2,img:"zoro-1.png",title:"Zoro kimono dress ", subtitle:"one piece",price:"4999",category:"men",subimg:["zoro-1.png","zoro-2.png","zoro-1.png"]},
  {id:3,img:"yuji-1.png",title:"Yuji itadori dress", subtitle:"jjk",price:"3999",category:"men",subimg:["yuji-1.png","yuji-2.png","yuji-3.png"]},
  
  {id:4,img:"mitsuri-1.png",title:"mitsuri cosplay Dress",subtitle:"DS",price:3499,category:"women",subimg:["mitsuri-1.png","mitsuri-2.png","mitsuri-1.png"]},
  {id:5,img:"s-art-o-1.png",title:"Yuki Asuna Dress",subtitle:"others",price:3499,category:"women",subimg:["s-art-o-1.png","s-art-o-2.png","s-art-o-3.png"]},
  {id:6,img:"rem-1.png",title:"Rem cosplay Dress",subtitle:"Re zero",price:2499,category:"women",subimg:["rem-1.png","rem-2.png","rem-3.png"]},
  
  {id:7,img:"deku-1.png",title:"Midoria(deku) cosplay dress", subtitle:"mha",price:"3499",category:"men",subimg:["deku-1.png","deku-2.png","deku-1.png"]},
  {id:8,img:"aastha-1.png",title:"Aastha black bull dress",subtitle:"AOT",price:2999,category:"men",subimg:["aastha-1.png","aastha-2.png","aastha-1.png"]},
  {id:9,img:"kakashi-1.png",title:"Kakashi hatake cosplay dress", subtitle:"naruto",price:"3999",category:"men",subimg:["kakashi-1.png","kakashi-2.png","kakashi-1.png"]},
  
  {id:10,img:"nezuko.png",title:"nezuko kimono dress",subtitle:"DS",price:1999,category:"women",subimg:["nezuko.png","nezuko.png","nezuko.png"]},
  {id:11,img:"zerotwo-1.png",title:"zero-two full dress",subtitle:"DS",price:2499,category:"women",subimg:["zerotwo-1.png","zerotwo-2.png","zerotwo-1.png"]},
  {id:12,img:"yamato-1.png",title:"yamato full dress",subtitle:"DS",price:3499,category:"women",subimg:["yamato-1.png","yamato-2.png","yamato-1.png"]},
  
  {id:13,img:"goku-1.png",title:"Goku classic dress", subtitle:"dragon ball",price:"4999",category:"men",subimg:["goku-1.png","goku-2.png","goku-1.png"]},
  {id:14,img:"naruto-1.png",title:"Naruto shippudin dress", subtitle:"naruto",price:"3499",category:"men",subimg:["naruto-1.png","naruto-2.png","naruto-3.png"]},
  {id:15,img:"zenitsu-3.png",title:"zenitsu kimono Dress",subtitle:"DS",price:3499,category:"men",subimg:["zenitsu-1.png","zenitsu-2.png","zenitsu-3.png"]},
  
  {id:16,img:"makima-1.png",title:"makima shirts and jeans combo",subtitle:"chainsaw",price:1999,category:"women",subimg:["makima-1.png","makima-2.png","makima-1.png"]},
  {id:17,img:"shinobu.png",title:"Shinobu full Dress",subTitle:"DS",price:2999,category:"women",subimg:["shinobu.png","shinobu-2.png","shinobu-3.png"]},
  {id:18,img:"mikasa.png",title:"mikasa scout dress",subTitle:"aot",price:2999,category:"women",subimg:[]},
  
  {id:19,img:"tanjiro-1.png",title:"tanjiro cosplay dress",subTitle:"DS",price:1999,category:"men",subimg:["tanjiro-1.png","tanjiro-2.png","tanjiro-1.png"]},
  {id:20,img:"itachi.png",title:"Itachi akatsuki dress", subtitle:"naruto",price:"3499",category:"men",subimg:["itachi.png","itachi-2.png","itachi-3.png"]},
  {id:21,img:"hinata-1.png",title:"Shoyu hinata jersey", subtitle:"haikyu",price:"2499",category:"men",subimg:["hinata-1.png","hinata-2.png","haikyu-shorts.png"]},
  
  {id:22,img:"Minato-1.png",title:"Hokage Dress",subtitle:"naruto",price:2499,category:"men",subimg:["Minato-1.png","Minato-2.png","Minato-1.png"]},
  {id:23,img:"mikey-2.png",title:"Mikey Toman Jacket",subtitle:"tokyo revengers",price:2499,category:"men",subimg:["mikey-2.png","mikey-1.png","mikey-2.png"]},
  {id:24,img:"kageyama-1.png",title:"kageyama jersey 09", subtitle:"haikyu",price:"2499",category:"men",subimg:["kageyama-1.png","haikyu-shorts.png","kageyama-2.png"]},
  
  {id:25,img:"inosuke-fig.png",title:"inosuke action figure", subtitle:"DS",price:"799",category:"figures",subimg:[]},
  {id:26,img:"luffy-fig.png",title:"inosuke action figure", subtitle:"DS",price:"699",category:"figures",subimg:[]},
  {id:27,img:"law-fig.png",title:"inosuke action figure", subtitle:"one piece",price:"699",category:"figures",subimg:[]},

  {id:28,img:"rengoku-fig.png",title:"Rengoku action figure", subtitle:"DS",price:"599",category:"figures",subimg:[]},
  {id:29,img:"yamato-figure.jpg",title:"yamato cute figure", subtitle:"one piece",price:"599",category:"figures",subimg:[]},
  {id:30,img:"zenitsu-fig.png",title:"zenitsu cool figure", subtitle:"DS",price:"799",category:"figures",subimg:[]},

  {id:31,img:"inosuke-mask.png",title:"inosuke real Mask", subtitle:"DS",price:"3999",category:"others",subimg:[]},
  {id:32,img:"water-blade.png",title:"water-braething Katana", subtitle:"DS",price:"2999",category:"others",subimg:[]},
  {id:33,img:"ichigo-blade.png",title:"ichigo Sword from bleach", subtitle:"bleach",price:"2999",category:"others",subimg:[]},
  {id:34,img:"zenitsu-katana.png",title:"zenitsu thunder katana", subtitle:"DS",price:"2999",category:"others",subimg:[]},
  {id:35,img:"shinobu-katana.png",title:"shinobu katana", subtitle:"DS",price:"2999",category:"others",subimg:[]},
  {id:36,img:"aot-sword.png",title:"AOT scout Sword", subtitle:"DS",price:"2999",category:"others",subimg:[]},
  {id:37,img:"zoro-katanas.png",title:"zoro all three katanas", subtitle:"one piece",price:"2999",category:"others",subimg:["wado-ichimonji.png","enma.png","zoro-katana-2.png"]},
  {id:38,img:"enma.png",title:"Enma Katana", subtitle:"one piece",price:"2999",category:"others",subimg:[]},
  {id:39,img:"wado-ichimonji.png",title:"Wado Ichimonji", subtitle:"one piece",price:"2999",category:"others",subimg:[]},
  {id:40,img:"obito-mask.png",title:"Obito mask", subtitle:"naruto",price:"2999",category:"others",subimg:[]},


  {id:41,img:"action-figure1.jpg",title:"Giyu action figures",subtitle:"DS" ,price:"599",category:"figures",subimg:[]},
  {id:42,img:"goku-figure.jpg",title:"Goku action figure", subtitle:"Dragon ball",price:"599",category:"figures",subimg:[]},
  {id:43,img:"DB-figure.jpg",title:"Dragon Ball action figure", subtitle:"Dragon ball",price:"499",category:"figures",subimg:[]},
  {id:44,img:"rem-figure.jpg",title:"Rem action figure", subtitle:"Re:Zero",price:"499",category:"figures",subimg:[]},

  
]

const state ={
  category:[],
  brands:[],
  page:1
}


function initShopItems(){
  
  const shopContainer = document.querySelector(".shop-container");
  const nextBtn = document.getElementById("next")
  const prevBtn = document.getElementById("prev")
  
  if(!shopContainer||!nextBtn||!prevBtn) return;
  
  renderShop(shopContainer,nextBtn,prevBtn);
  
  nextBtn.addEventListener("click",()=>{
    updatePagination(state.page+1)
  })
  prevBtn.addEventListener("click",()=>{
    updatePagination(state.page-1)
  })

  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(cb=>{
    cb.addEventListener("change",()=>{
      toggleFilter(
        cb.dataset.type,
        cb.dataset.value,
        cb.checked
      );

      upadateUrlFromState();
      renderShop(shopContainer,nextBtn,prevBtn);
    })
  })

  const shopSection = document.querySelector(".shop-section");

  shopSection.addEventListener("click",(e)=>{
    const filterBlock= document.querySelector(".filter");
    const mobileFilter= document.getElementById("mobile-filter");

    if(e.target.id==="mobile-filter"){
      filterBlock.style.left="0"
      mobileFilter.style.display="none"
    }
    else if(e.target.id==="close-filter"){
      filterBlock.style.left="-100%"
      mobileFilter.style.display="block"
      
    }
  })
}
function toggleFilter(type,value,check){

if(check){
 if(value==="all"){
  state[type]=[]
 }
  else{
    state[type] = state[type].filter(v=> v!=="all")
     if(!state[type].includes(value)){
      state[type].push(value);
    }
  }
}else{
    state[type] = state[type].filter(v=> v!==value)
  }
  state.page=1;
}

function upadateUrlFromState(){
  const url = new URL(window.location.href);

  if(state.category.length){
    url.searchParams.set("category",state.category.join(","));
  }else{
    url.searchParams.delete("category")
  }

  if(state.brands.length){
    url.searchParams.set("brands",state.brands.join(","));
  }else{
    url.searchParams.delete("brands")
  }

  url.searchParams.set("page",state.page);

  history.pushState({},"",url);

}

function loadStateFromUrl(){

  const params = new URLSearchParams(window.location.search);

  state.category = params.get("category")?.split(",")||[];
  state.brands = params.get("brands")?.split(",")||[];
   state.page = parseInt(params.get("page"))||1;
}

function syncCheckBoxesFromUrl(){
 const checkbox = document.querySelectorAll("input[type=checkbox]")
 checkbox.forEach(cb=>{ 
     const type = cb.dataset.type;
     const value = cb.dataset.value;
if(value==="all"){
  cb.checked = state[type].length===0
}else{
  cb.checked = state[type].includes(value);
}
})
}

const productsPerPage = 15;

function filterShopItems(){
  return shopItems.filter(item=>{
    const categoryOk=
    state.category.length===0||
    state.category.includes(item.category)||
    state.category.includes("all");

    const brandsOk=
    state.brands.length===0||
    state.brands.includes(item.subtitle);

    return categoryOk&&brandsOk;
  })
}

function renderShop(container,nextBtn,prevBtn){
        const pageResults = document.querySelector(".page-result span")

         pageResults.innerHTML=''
        container.innerHTML='';
        
       const items= filterShopItems();

  const totalPages = Math.ceil(items.length / productsPerPage);

  generatePageButtons(
    totalPages);

  // if (currentPage > totalPages) currentPage = totalPages;
  // if (currentPage < 1) currentPage = 1;  this can also be written as below:
  state.page = Math.max(1,Math.min(state.page, totalPages))
  
let start = ( state.page -1) *productsPerPage;
let end = Math.min(start + productsPerPage, items.length);

if (state.page === 1)prevBtn.style.display = "none";
else prevBtn.style.display = "inline-block";

if (state.page === totalPages) nextBtn.style.display = "none";
else nextBtn.style.display = "inline-block";


items.slice(start,end).forEach(item=>{
  const itemCard = document.createElement("div")
  itemCard.classList.add("item-card")

  let random = Math.floor(Math.random()*(7999-5999 +1))+5999;
  let productSubtitle = capitalizeWords(item.subtitle);
  let productTitle = capitalizeWords(item.title);

  itemCard.innerHTML=`
                  <div class="item-image">
                  <img src="images/${item.img}" loading="lazy" alt="image">
                  </div>
                
                <div class="item-content">
                  <span>${productSubtitle}</span>
                  <h4>${productTitle}</h4>
                  <div class="star">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>  
                </div>
                  <p><span>Rs ${random} </span>${item.price}Rs</p>
                </div>               
                 </div>
  `
  container.appendChild(itemCard)
  itemCard.addEventListener("click",()=>{
    window.location.href=`product.html?id=${item.id}`
  })
})


pageResults.textContent=`Showing ${start+1}-${end} of ${items.length}`;

}


function scrollToShopTop() {
  const element = document.getElementById("shop-top");
  const y = element.getBoundingClientRect().top + window.pageYOffset - 180;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

function generatePageButtons(totalPages){

  const pagescontainer = document.querySelector(".pages");
  pagescontainer.innerHTML='';

  for(let i=1; i<=totalPages;i++){
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;

    if(i==state.page){
      pageBtn.classList.add("active");
    } 

    pageBtn.addEventListener("click",()=>{
      updatePagination(i);
    })
    pagescontainer.appendChild(pageBtn);
  }
}

function updatePagination(i){
  state.page = i;
  updateUrl(i);
  scrollToShopTop();

  const shopContainer = document.querySelector(".shop-container");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  renderShop(shopContainer,nextBtn,prevBtn);
}

function updateUrl(pageNum){
  const url = new URL(window.location);
  url.searchParams.set("page",pageNum);

  window.history.pushState({},"",url);
}

window.addEventListener("popstate",()=>{
  loadStateFromUrl()
  const shopContainer = document.querySelector(".shop-container");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  
  renderShop(shopContainer,nextBtn,prevBtn);
  scrollToShopTop()
})

function initProductPage(){

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"))
  
  const product = shopItems.find(item=> item.id===productId);
  const productImageContainer = document.querySelector(".product-images")
  if(!product||!productImageContainer) return;
  
  productImageContainer.innerHTML=`
  <div class="main-image">
  <img id="main-img" src="images/${product.img}" alt="poduct">
  </div>
  <div class="product-subimages">
  
  <img class="thumbnail" src="images/${product.subimg[0]?product.subimg[0]:product.img}" alt="poduct">
  <img class="thumbnail" src="images/${product.subimg[1]?product.subimg[1]:product.img}" alt="poduct">
  <img class="thumbnail" src="images/${product.subimg[2]?product.subimg[2]:product.img}" alt="poduct">
  </div>
  `
  document.querySelector(".product-subimages").addEventListener("click",(e)=>{
   if(e.target.classList.contains("thumbnail")){
     const mainImg = document.getElementById("main-img");
     if(mainImg){
       mainImg.src = e.target.src
     }
   }
  })
if(product.category==="figures"){
  document.querySelector(".size").style.display="none"
}

  const brand = document.querySelector(".prod-details span")
  const productName = document.querySelector(".prod-details h1")
  const productPrice = document.querySelector(".prod-details p")
  const description = document.querySelector(".description p")
  
  const size = document.querySelector(".size");
  
description.textContent = `${product.title} of ${product.subtitle} is a premium-quality item designed for style, comfort, and durability. Ideal for fans and collectors, it adds uniqueness to your collection or wardrobe.`

  brand.textContent= capitalizeWords(product.subtitle) 
  productName.textContent= capitalizeWords(product.title)
  productPrice.textContent=  `Rs ${product.price}`
 
  const recommProducts = document.querySelector(".recommended-product-container")
  recommProducts.innerHTML=''
    const recommendedItems = shopItems.filter(item=> item.id!==product.id && item.category===product.category).slice(0,4);
    recommendedItems.forEach(recomitem=>{
      const item = document.createElement("div");
      item.classList.add("item");

      let productTitle = capitalizeWords(recomitem.title);

      item.innerHTML=`
      <div class="item-img">
      <img src="images/${recomitem.img}" alt="image">
      </div>
      
      <div class="item-cont">
      <h4>${productTitle}</h4>
            <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <span>4.0s</span>
              </div>
              <p>Rs ${recomitem.price}</p>
              </div>
              `
              recommProducts.appendChild(item);
              item.addEventListener("click",()=>{
                window.location.href= `product.html?id=${recomitem.id}`
              })
    })
            
            const addToCart = document.getElementById("add-to-cart");
            
            addToCart.addEventListener("click",()=>{
              
              // let cart = JSON.parse(localStorage.getItem("cart")) || [];
              
              // if (product && product.id) {
              //   const exists = cart.find(item => item.id === product.id);
              //   if (exists) {
              //     exists.qty += 1;
              //   } else {
              //     cart.push({ ...product, qty: 1 });
              //   }
              addItemToCart(product)
              addToCart.textContent="added ✓";
              addToCart.disabled=true;
              
              
            })
            
            
}
            
          
function updateCart(){

const itemContainer = document.querySelector(".cart-table tbody");
  if(!itemContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart"))||[];
  if(cart.length===0){
    itemContainer.innerHTML=`
    <tr>
    <td colspan="5" style="text-align:center; font-size:2rem">Your cart is empty</td>
  </tr>
    `
    updateSummary();
    return;
  }

  itemContainer.innerHTML='';

  cart.forEach(item=>{
const row = document.createElement("tr");
      
    row.dataset.id = item.id;

    row.innerHTML=`
    <td class="product-info">
    <img src="images/${item.img}" alt="">
    <div>
    <h4>${item.title}</h4>
    <span>${item.subtitle}</span>
    </div>
    </td>
    <td>${item.price}</td>
    <td>
    <input class="quant" type="number" value="${item.qty}" min="1" data-price="${item.price}">
    </td>
    <td class="total">${item.price}</td>
    <td>
    <button class="remove-btn"><i class="fas fa-times"></i></button>
    </td>
    `
 const input = row.querySelector("input");
 const totalPrice = row.querySelector(".total");
 
 input.addEventListener("input", () => {
   totalPrice.textContent = item.price * item.qty;

   let cart = JSON.parse(localStorage.getItem("cart"));
   const index = cart.findIndex(p=> p.id===item.id);
   cart[index].qty = item.qty;

   localStorage.setItem("cart",JSON.stringify(cart))
   updateSummary();
  });

  itemContainer.appendChild(row);
  
  const removeBtn = row.querySelector(".remove-btn");
  removeBtn.addEventListener("click",()=>{
    const row = removeBtn.closest("tr");
    const rowId =Number(row.dataset.id);
    
    row.remove();
    
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart = cart.filter(item=> item.id !==rowId);
    
    localStorage.setItem("cart",JSON.stringify(cart));
  updateSummary();
})
})

  updateSummary();
 
  const form = document.querySelector(".newsletter-form")
  const email = form.querySelector("input");
  const subscribeBtn = document.getElementById("subscribe-btn")
  subscribeBtn.addEventListener("click",()=>{
    if(email.value==="") return;
    alert("You are subscribed")
    email.value =''
  })
 
}
function updateSummary(){

const inputs = document.querySelectorAll(".cart-table tbody input");
let items = 0;
let subtotal =0;
inputs.forEach(input=>{
  const qty = Number(input.value)
  const price = Number(input.dataset.price)

  items += qty;
  subtotal += qty * price;
})

const quantityEl = document.getElementById("quantity");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");


const shipping = subtotal > 0 ? 99 : 0;
const tax = Math.round(subtotal * 0.05); // 5% tax
const total = subtotal + shipping + tax;

quantityEl.textContent = items;
subtotalEl.textContent = `Rs ${subtotal}`;
shippingEl.textContent = `Rs ${shipping}`;
taxEl.textContent = `Rs ${tax}`;
totalEl.textContent = `Rs ${total}`;

}