const projects=[
{name:"Lucas Gravity Quest",emoji:"🛰️",category:"Games",status:"live",desc:"Gravity-flipping platform chaos with increasingly unfair levels.",url:"https://lucas-gravity-quest.lucasli0608.chatgpt.site/"},
{name:"Lucasverse Adventure",emoji:"🚶",category:"Games",status:"live",desc:"Stickman journey through the Lucasverse, heading for the ultimate finish line: summer holiday.",url:"https://lucasverse-adventure.lucasli0608.chatgpt.site/"},
{name:"Blockbound Infinite",emoji:"🧱",category:"Games",status:"live",desc:"Infinite runner / 500m challenge with saved progress and leaderboard ambitions.",url:"#"},
{name:"RoadEye AI",emoji:"🚌",category:"AI",status:"live",desc:"Blind-spot safety prototype for buses and trucks: see, understand, predict and protect.",url:"https://github.com/LucasLi1337Unknown/RoadEyeAI--TrajectoryGuardAI--subordination"},
{name:"Lucas Chaos Lab",emoji:"🧪",category:"Experiments",status:"live",desc:"Chess disasters, math warnings, RoadEye alarms and buttons that should probably not be pressed.",url:"https://lucasverse-chaos-lab.lucasli0608.chatgpt.site/"},
{name:"Lutaw Professors Academy",emoji:"🧙",category:"Language",status:"live",desc:"Ancient professors discussing absurdly advanced science in Lutaw.",url:"https://lutaw-professors-academy.lucasli0608.chatgpt.site/"},
{name:"MathCareful",emoji:"📐",category:"School",status:"live",desc:"Math practice built to catch tiny mistakes before they cause civilization-ending damage.",url:"#"},
{name:"流水宴",emoji:"🍽️",category:"School",status:"live",desc:"Chinese-class banquet project with menu, images and reservation interactions.",url:"#"},
{name:"StockFishBattle",emoji:"♟️",category:"Chess",status:"live",desc:"Stockfish versus Stockfish. Human spectators may experience emotional damage.",url:"https://lucasli1337unknown.github.io/StockFishBattle/"},
{name:"Test002Stockfish",emoji:"🐟",category:"Chess",status:"live",desc:"A browser Stockfish playground and one of the earlier Lucas chess experiments.",url:"https://lucasli1337unknown.github.io/Test002Stockfish/"},
{name:"Gitverse",emoji:"🛠️",category:"Archive",status:"dev",desc:"A growing GitHub project universe. Very real repo. Very unfinished.",url:"https://github.com/LucasLi1337Unknown/Gitverse"},
{name:"Lucas Game Lab",emoji:"🎮",category:"Archive",status:"live",desc:"Another website containing websites, because apparently one portal was not enough.",url:"https://lucasgamelab.is-great.net/"}
];

const grid=document.querySelector("#grid"),filters=document.querySelector("#filters"),search=document.querySelector("#search");
let active="All";
const categories=["All",...new Set(projects.map(p=>p.category))];
function renderFilters(){filters.innerHTML=categories.map(c=>`<button class="filterBtn ${c===active?"active":""}" data-cat="${c}">${c}</button>`).join("");document.querySelectorAll(".filterBtn").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();render();});}
function render(){const q=search.value.toLowerCase();const list=projects.filter(p=>(active==="All"||p.category===active)&&(`${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(q)));grid.innerHTML=list.map(p=>`<article class="project card"><div class="emoji">${p.emoji}</div><span class="badge ${p.status==="dev"?"dev":"live"}">${p.status==="dev"?"🚧 IN DEVELOPMENT":"PUBLIC"}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="meta"><span class="category">${p.category}</span><a class="launch" data-url="${p.url}" href="${p.url}">${p.url==="#"?"URL TO ADD":"Launch →"}</a></div></article>`).join("");applyLinks();}
function applyLinks(){const newTab=document.querySelector("#newTab").checked;document.querySelectorAll(".launch").forEach(a=>{if(a.dataset.url==="#"){a.onclick=e=>e.preventDefault();a.removeAttribute("target");}else if(newTab){a.target="_blank";a.rel="noopener";}else a.removeAttribute("target");});}
search.oninput=render;
const settings=document.querySelector("#settingsPanel"),backdrop=document.querySelector("#backdrop");
function openSettings(){settings.classList.add("open");backdrop.classList.add("show");settings.setAttribute("aria-hidden","false");}
function closeSettings(){settings.classList.remove("open");backdrop.classList.remove("show");settings.setAttribute("aria-hidden","true");}
document.querySelector("#settingsBtn").onclick=openSettings;document.querySelector("#closeSettings").onclick=closeSettings;backdrop.onclick=closeSettings;
const controls=["darkMode","newTab","animations","compact"];
function save(){const s={};controls.forEach(id=>s[id]=document.querySelector("#"+id).checked);localStorage.setItem("lucasverse-settings",JSON.stringify(s));apply();}
function apply(){document.body.classList.toggle("light",!document.querySelector("#darkMode").checked);document.body.classList.toggle("noanim",!document.querySelector("#animations").checked);document.body.classList.toggle("compact",document.querySelector("#compact").checked);applyLinks();}
controls.forEach(id=>document.querySelector("#"+id).onchange=save);
const saved=JSON.parse(localStorage.getItem("lucasverse-settings")||"null");if(saved)controls.forEach(id=>{if(id in saved)document.querySelector("#"+id).checked=saved[id];});apply();
document.querySelector("#resetSettings").onclick=()=>{document.querySelector("#darkMode").checked=true;document.querySelector("#newTab").checked=true;document.querySelector("#animations").checked=true;document.querySelector("#compact").checked=false;save();};
document.querySelector("#randomBtn").onclick=()=>{const choices=projects.filter(p=>p.status==="live"&&p.url!=="#");const p=choices[Math.floor(Math.random()*choices.length)];if(document.querySelector("#newTab").checked)window.open(p.url,"_blank","noopener");else location.href=p.url;};
renderFilters();render();