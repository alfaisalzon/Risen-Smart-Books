
/* =====================================
   RISEN SMART BOOKS
   THE RISEN HIGH SCHOOL
   ===================================== */

/* ALL CLASSES */
const classes = [
 {
  id:"nursery",
  name:"Nursery",
  urdu:"نرسری",
  icon:"🧸",
  color:"#e8f1ff"
 },
 {
  id:"class-1",
  name:"Class 1",
  urdu:"جماعت اول",
  icon:"🎒",
  color:"#fff0e5"
 },
 {
  id:"class-2",
  name:"Class 2",
  urdu:"جماعت دوم",
  icon:"📘",
  color:"#e8f8ed"
 },
 {
  id:"class-3",
  name:"Class 3",
  urdu:"جماعت سوم",
  icon:"📗",
  color:"#f5eaff"
 },
 {
  id:"class-4",
  name:"Class 4",
  urdu:"جماعت چہارم",
  icon:"🎓",
  color:"#fff4d9"
 }
];


/* ALL SUBJECTS */
const subjects = [
 {
  id:"urdu",
  name:"اردو",
  english:"Urdu",
  icon:"📕",
  color:"#ffebee"
 },
 {
  id:"english",
  name:"English",
  english:"English",
  icon:"🔤",
  color:"#e8f1ff"
 },
 {
  id:"mathematics",
  name:"ریاضی",
  english:"Mathematics",
  icon:"🔢",
  color:"#fff3d9"
 },
 {
  id:"islamiat",
  name:"اسلامیات",
  english:"Islamiat",
  icon:"🕌",
  color:"#e5f6eb"
 },
 {
  id:"general-knowledge",
  name:"جنرل نالج",
  english:"General Knowledge",
  icon:"🌍",
  color:"#e8f4ff"
 },
 {
  id:"general-science",
  name:"جنرل سائنس",
  english:"General Science",
  icon:"🔬",
  color:"#f0eaff"
 },
 {
  id:"drawing",
  name:"ڈرائنگ اینڈ کلرنگ",
  english:"Drawing & Colouring",
  icon:"🎨",
  color:"#ffe9f3"
 }
];


/* BOOK FILE NAME CORRECTION */
const bookFileNames = {
 "general-science":"science"
};


/* BOOK PATH */
const bookPath = (classId,subjectId) => {

 const fileName =
  bookFileNames[subjectId] || subjectId;

 return `classes/${classId}/${fileName}.html`;

};


/* RENDER CLASSES */
function renderClasses(){

 const html = classes.map(c=>`
  <div class="class-card"
   onclick="openClass('${c.id}')">

   <div class="class-icon">${c.icon}</div>

   <h3>${c.name}</h3>

   <p>${c.urdu}</p>

   <p>7 کتابیں</p>

  </div>
 `).join("");

 document.getElementById("homeClasses").innerHTML=html;

 document.getElementById("allClasses").innerHTML=html;

}


/* RENDER HOME SUBJECTS */
function renderSubjects(){

 const container =
  document.getElementById("homeSubjects");

 container.innerHTML = subjects.map(s=>`

  <div class="book-card"
   onclick="openSubject('${s.id}')">

   <div class="book-icon"
    style="background:${s.color}">
    ${s.icon}
   </div>

   <h3>${s.name}</h3>

   <p>${s.english}</p>

   <div class="book-bottom">
    <button class="open-book">
     کتابیں دیکھیں
    </button>
   </div>

  </div>

 `).join("");

}


/* RENDER LIBRARY */
function renderLibrary(){

 const classFilter =
  document.getElementById("classFilter");

 const subjectFilter =
  document.getElementById("subjectFilter");

 const container =
  document.getElementById("libraryBooks");

 if(!classFilter || !subjectFilter || !container)return;

 const classId = classFilter.value;

 const subjectId = subjectFilter.value;

 let result = [];

 classes.forEach(c=>{

  if(classId!=="all" && classId!==c.id)return;

  subjects.forEach(s=>{

   if(subjectId!=="all" && subjectId!==s.id)return;

   result.push({c,s});

  });

 });


 container.innerHTML = result.map(({c,s})=>`

  <div class="book-card">

   <button class="favorite-btn
    ${isFavorite(c.id,s.id)?"saved":""}"

    onclick="toggleFavorite('${c.id}','${s.id}',event)">

    ${isFavorite(c.id,s.id)?"♥":"♡"}

   </button>

   <div class="book-icon"
    style="background:${s.color}">
    ${s.icon}
   </div>

   <h3>${s.name}</h3>

   <p>${c.name} — ${c.urdu}</p>

   <div class="book-bottom">

    <button class="open-book"
     onclick="openBook('${c.id}','${s.id}')">

     کتاب کھولیں

    </button>

   </div>

  </div>

 `).join("") || `
  <div class="empty-state">
   کوئی کتاب نہیں ملی۔
  </div>
 `;

}


/* OPEN CLASS */
function openClass(id){

 const classFilter =
  document.getElementById("classFilter");

 const subjectFilter =
  document.getElementById("subjectFilter");

 classFilter.value=id;

 subjectFilter.value="all";

 renderLibrary();

 showSection("library");

}


/* OPEN SUBJECT */
function openSubject(id){

 document.getElementById("classFilter").value="all";

 document.getElementById("subjectFilter").value=id;

 renderLibrary();

 showSection("library");

}


/* OPEN BOOK */
function openBook(classId,subjectId){

 const path = bookPath(classId,subjectId);

 window.location.href = path;

}


/* SHOW SECTIONS */
function showSection(id,button){

 document.querySelectorAll(".app-section")
  .forEach(s=>s.classList.remove("active"));

 const section=document.getElementById(id);

 if(!section)return;

 section.classList.add("active");

 document.querySelectorAll(".menu-item")
  .forEach(b=>b.classList.remove("active"));

 if(button){
  button.classList.add("active");
 }

 const titles={
  home:"ہوم",
  classes:"جماعتیں",
  library:"کتب خانہ",
  favorites:"پسندیدہ کتابیں",
  tests:"ٹیسٹ اور امتحانات",
  about:"ہمارے بارے میں",
  help:"مدد اور رہنمائی"
 };

 const pageTitle =
  document.getElementById("pageTitle");

 if(pageTitle){
  pageTitle.textContent =
   titles[id] || "Risen Smart Books";
 }

 closeMenu();

 window.scrollTo({
  top:0,
  behavior:"smooth"
 });

 if(id==="library"){
  renderLibrary();
 }

 if(id==="favorites"){
  renderFavorites();
 }

}


/* SIDEBAR OPEN */
function openMenu(){

 document.getElementById("sidebar")
  .classList.add("open");

 document.getElementById("overlay")
  .classList.add("show");

}


/* SIDEBAR CLOSE */
function closeMenu(){

 const sidebar=document.getElementById("sidebar");

 const overlay=document.getElementById("overlay");

 if(sidebar)sidebar.classList.remove("open");

 if(overlay)overlay.classList.remove("show");

}


/* DARK MODE */
function toggleTheme(){

 document.body.classList.toggle("dark");

 const dark =
  document.body.classList.contains("dark");

 localStorage.setItem(
  "risenTheme",
  dark?"dark":"light"
 );

 document.getElementById("themeIcon").textContent =
  dark?"☀️":"🌙";

}


/* GET FAVORITES */
function getFavorites(){

 try{

  return JSON.parse(
   localStorage.getItem("risenFavorites") || "[]"
  );

 }catch(e){

  return [];

 }

}


/* CHECK FAVORITE */
function isFavorite(classId,subjectId){

 return getFavorites().some(x=>
  x.classId===classId &&
  x.subjectId===subjectId
 );

}


/* TOGGLE FAVORITE */
function toggleFavorite(classId,subjectId,event){

 if(event){
  event.stopPropagation();
 }

 let list=getFavorites();

 const index=list.findIndex(x=>
  x.classId===classId &&
  x.subjectId===subjectId
 );

 if(index>=0){

  list.splice(index,1);

 }else{

  list.push({
   classId:classId,
   subjectId:subjectId
  });

 }

 localStorage.setItem(
  "risenFavorites",
  JSON.stringify(list)
 );

 renderLibrary();

 renderFavorites();

}


/* RENDER FAVORITES */
function renderFavorites(){

 const container =
  document.getElementById("favoriteBooks");

 if(!container)return;

 const list=getFavorites();

 const result=list.map(item=>{

  const c=classes.find(x=>x.id===item.classId);

  const s=subjects.find(x=>x.id===item.subjectId);

  if(!c || !s)return "";

  return `

   <div class="book-card">

    <button class="favorite-btn saved"
     onclick="toggleFavorite('${c.id}','${s.id}',event)">
     ♥
    </button>

    <div class="book-icon"
     style="background:${s.color}">
     ${s.icon}
    </div>

    <h3>${s.name}</h3>

    <p>${c.name}</p>

    <button class="open-book"
     onclick="openBook('${c.id}','${s.id}')">
     کتاب کھولیں
    </button>

   </div>

  `;

 }).join("");

 container.innerHTML=result ||
  '<div class="empty-state">ابھی کوئی پسندیدہ کتاب محفوظ نہیں کی گئی۔</div>';

}


/* SEARCH BOOKS */
function searchBooks(value){

 const q=value.trim().toLowerCase();

 if(!q)return;

 const c=classes.find(x=>
  x.name.toLowerCase().includes(q) ||
  x.urdu.includes(q)
 );

 const s=subjects.find(x=>
  x.name.toLowerCase().includes(q) ||
  x.english.toLowerCase().includes(q)
 );

 if(c && !s){

  openClass(c.id);

 }else if(s && !c){

  openSubject(s.id);

 }else{

  showSection("library");

  document.getElementById("classFilter").value =
   c ? c.id : "all";

  document.getElementById("subjectFilter").value =
   s ? s.id : "all";

  renderLibrary();

 }

}


/* SEARCH BAR */
function setupSearch(){

 const top=document.querySelector(".topbar");

 if(!top || top.querySelector(".global-search"))return;

 const search=document.createElement("input");

 search.type="search";

 search.placeholder="کتاب یا جماعت تلاش کریں...";

 search.className="global-search";

 search.setAttribute(
  "aria-label",
  "کتاب یا جماعت تلاش کریں"
 );

 search.onkeydown=e=>{

  if(e.key==="Enter"){
   searchBooks(search.value);
  }

 };

 top.appendChild(search);

}


/* INITIALIZE APP */
function init(){

 renderClasses();

 renderSubjects();

 renderLibrary();

 renderFavorites();

 setupSearch();

 const year=document.getElementById("year");

 if(year){
  year.textContent=new Date().getFullYear();
 }

 if(localStorage.getItem("risenTheme")==="dark"){

  document.body.classList.add("dark");

  const icon=document.getElementById("themeIcon");

  if(icon){
   icon.textContent="☀️";
  }

 }

}


/* START APP */
init();
