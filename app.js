
const classes = [
 {id:"nursery",name:"Nursery",urdu:"نرسری",icon:"🧸",color:"#e8f1ff"},
 {id:"class-1",name:"Class 1",urdu:"جماعت اول",icon:"🎒",color:"#fff0e5"},
 {id:"class-2",name:"Class 2",urdu:"جماعت دوم",icon:"📘",color:"#e8f8ed"},
 {id:"class-3",name:"Class 3",urdu:"جماعت سوم",icon:"📗",color:"#f5eaff"},
 {id:"class-4",name:"Class 4",urdu:"جماعت چہارم",icon:"🎓",color:"#fff4d9"}
];

const subjects = [
 {id:"urdu",name:"اردو",english:"Urdu",icon:"📕",color:"#ffebee"},
 {id:"english",name:"English",english:"English",icon:"🔤",color:"#e8f1ff"},
 {id:"mathematics",name:"ریاضی",english:"Mathematics",icon:"🔢",color:"#fff3d9"},
 {id:"islamiat",name:"اسلامیات",english:"Islamiat",icon:"🕌",color:"#e5f6eb"},
 {id:"general-knowledge",name:"جنرل نالج",english:"General Knowledge",icon:"🌍",color:"#e8f4ff"},
 {id:"general-science",name:"جنرل سائنس",english:"General Science",icon:"🔬",color:"#f0eaff"},
 {id:"drawing",name:"ڈرائنگ اینڈ کلرنگ",english:"Drawing & Colouring",icon:"🎨",color:"#ffe9f3"}
];

const bookPath = (classId,subjectId) =>
 `classes/${classId}/${subjectId}.html`;

function renderClasses(){
 const html = classes.map(c=>`
  <div class="class-card" onclick="openClass('${c.id}')">
   <div class="class-icon">${c.icon}</div>
   <h3>${c.name}</h3>
   <p>${c.urdu}</p>
   <p>7 کتابیں</p>
  </div>
 `).join("");

 document.getElementById("homeClasses").innerHTML=html;
 document.getElementById("allClasses").innerHTML=html;
}

function renderSubjects(){
 document.getElementById("homeSubjects").innerHTML=
 subjects.map(s=>`
  <div class="book-card" onclick="openSubject('${s.id}')">
   <div class="book-icon" style="background:${s.color}">${s.icon}</div>
   <h3>${s.name}</h3>
   <p>${s.english}</p>
   <div class="book-bottom">
    <button class="open-book">کتابیں دیکھیں</button>
   </div>
  </div>
 `).join("");
}

function renderLibrary(){
 const classId=document.getElementById("classFilter").value;
 const subjectId=document.getElementById("subjectFilter").value;
 const container=document.getElementById("libraryBooks");

 let result=[];

 classes.forEach(c=>{
  if(classId!=="all" && classId!==c.id)return;

  subjects.forEach(s=>{
   if(subjectId!=="all" && subjectId!==s.id)return;
   result.push({c,s});
  });
 });

 container.innerHTML=result.map(({c,s})=>`
  <div class="book-card">
   <button class="favorite-btn ${isFavorite(c.id,s.id)?"saved":""}"
    onclick="toggleFavorite('${c.id}','${s.id}',event)">
    ${isFavorite(c.id,s.id)?"♥":"♡"}
   </button>
   <div class="book-icon" style="background:${s.color}">${s.icon}</div>
   <h3>${s.name}</h3>
   <p>${c.name} — ${c.urdu}</p>
   <div class="book-bottom">
    <button class="open-book" onclick="openBook('${c.id}','${s.id}')">
     کتاب کھولیں
    </button>
   </div>
  </div>
 `).join("") || '<div class="empty-state">کوئی کتاب نہیں ملی۔</div>';
}

function openClass(id){
 document.getElementById("classFilter").value=id;
 document.getElementById("subjectFilter").value="all";
 renderLibrary();
 showSection("library");
}

function openSubject(id){
 document.getElementById("classFilter").value="all";
 document.getElementById("subjectFilter").value=id;
 renderLibrary();
 showSection("library");
}

function openBook(classId,subjectId){
 window.location.href=bookPath(classId,subjectId);
}

function showSection(id,button){
 document.querySelectorAll(".app-section").forEach(s=>s.classList.remove("active"));
 const section=document.getElementById(id);
 if(!section)return;
 section.classList.add("active");

 document.querySelectorAll(".menu-item").forEach(b=>b.classList.remove("active"));
 if(button)button.classList.add("active");

 const titles={
  home:"ہوم",
  classes:"جماعتیں",
  library:"کتب خانہ",
  favorites:"پسندیدہ کتابیں",
  tests:"ٹیسٹ اور امتحانات",
  about:"ہمارے بارے میں",
  help:"مدد اور رہنمائی"
 };
 document.getElementById("pageTitle").textContent=titles[id]||"Risen Smart Books";

 closeMenu();
 window.scrollTo({top:0,behavior:"smooth"});

 if(id==="library")renderLibrary();
 if(id==="favorites")renderFavorites();
}

function openMenu(){
 document.getElementById("sidebar").classList.add("open");
 document.getElementById("overlay").classList.add("show");
}
function closeMenu(){
 document.getElementById("sidebar").classList.remove("open");
 document.getElementById("overlay").classList.remove("show");
}

function toggleTheme(){
 document.body.classList.toggle("dark");
 const dark=document.body.classList.contains("dark");
 localStorage.setItem("risenTheme",dark?"dark":"light");
 document.getElementById("themeIcon").textContent=dark?"☀️":"🌙";
}

function getFavorites(){
 try{return JSON.parse(localStorage.getItem("risenFavorites")||"[]")}
 catch(e){return []}
}

function isFavorite(classId,subjectId){
 return getFavorites().some(x=>x.classId===classId&&x.subjectId===subjectId);
}

function toggleFavorite(classId,subjectId,event){
 if(event)event.stopPropagation();

 let list=getFavorites();
 const index=list.findIndex(x=>x.classId===classId&&x.subjectId===subjectId);

 if(index>=0)list.splice(index,1);
 else list.push({classId,subjectId});

 localStorage.setItem("risenFavorites",JSON.stringify(list));
 renderLibrary();
 renderFavorites();
}

function renderFavorites(){
 const container=document.getElementById("favoriteBooks");
 const list=getFavorites();

 const result=list.map(item=>{
  const c=classes.find(x=>x.id===item.classId);
  const s=subjects.find(x=>x.id===item.subjectId);
  if(!c||!s)return "";
  return `
   <div class="book-card">
    <button class="favorite-btn saved"
     onclick="toggleFavorite('${c.id}','${s.id}')">♥</button>
    <div class="book-icon" style="background:${s.color}">${s.icon}</div>
    <h3>${s.name}</h3>
    <p>${c.name}</p>
    <button class="open-book" onclick="openBook('${c.id}','${s.id}')">
     کتاب کھولیں
    </button>
   </div>`;
 }).join("");

 container.innerHTML=result||'<div class="empty-state">ابھی کوئی پسندیدہ کتاب محفوظ نہیں کی گئی۔</div>';
}

function searchBooks(value){
 const q=value.trim().toLowerCase();
 if(!q)return;

 const c=classes.find(x=>
  x.name.toLowerCase().includes(q)||x.urdu.includes(q)
 );
 const s=subjects.find(x=>
  x.name.toLowerCase().includes(q)||
  x.english.toLowerCase().includes(q)
 );

 if(c && !s){
  openClass(c.id);
 }else if(s && !c){
  openSubject(s.id);
 }else{
  showSection("library");
  document.getElementById("classFilter").value=c?c.id:"all";
  document.getElementById("subjectFilter").value=s?s.id:"all";
  renderLibrary();
 }
}

function setupSearch(){
 const top=document.querySelector(".topbar");
 const search=document.createElement("input");
 search.type="search";
 search.placeholder="کتاب یا جماعت تلاش کریں...";
 search.className="global-search";
 search.setAttribute("aria-label","کتاب یا جماعت تلاش کریں");
 search.onkeydown=e=>{
  if(e.key==="Enter")searchBooks(search.value);
 };
 top.appendChild(search);
}

function init(){
 renderClasses();
 renderSubjects();
 renderLibrary();
 setupSearch();

 document.getElementById("year").textContent=new Date().getFullYear();

 if(localStorage.getItem("risenTheme")==="dark"){
  document.body.classList.add("dark");
  document.getElementById("themeIcon").textContent="☀️";
 }
}
init();
