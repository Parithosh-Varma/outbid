// ox.lol clone - interactivity
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

const leaderPrice = 12;
let headlinePrice = 17;

// data
const products = [
  { rank: 4, name: "ChatLLM.ai", desc: "A smarter AI workspace for multi-model chat, web search, projects, and content creation.", domain:"chatllm.ai", category:"Agents", clicks:48, bid:1, initial:"C", grad:"from-amber-300 to-amber-600" },
  { rank: 5, name: "WhatAreYoubuilding.lol", desc: "Discover useful new products, ambitious ideas, and independent projects built by real people. Explore trending launches or submit your own for free.", domain:"whatareyoubuilding.lol", category:"Marketing", clicks:30, bid:1, initial:"W", grad:"from-emerald-400 to-teal-700" },
  { rank: 6, name: "Outbid.tv — Take the air", desc: "Television where the best spots are earned.", domain:"outbid.tv", category:"Other", clicks:31, bid:1, initial:"O—", grad:"from-zinc-700 to-zinc-900" },
  { rank: 7, name: "Camm", desc: "An AI photography studio for directed wedding, pet, baby, and travel portrait stories.", domain:"camm.ai", category:"AI Media", clicks:35, bid:0, initial:"C", grad:"from-violet-400 to-purple-600" },
  { rank: 8, name: "HappyLoop", desc: "A personalized AI learning companion with guided paths, ongoing tutoring, and mastery tracking.", domain:"happyloop.ai", category:"Productivity", clicks:37, bid:0, initial:"H", grad:"from-pink-400 to-rose-500" },
  { rank: 9, name: "GameStart", desc: "A multilingual community for quick games, player guides, discoveries, and discussion groups.", domain:"gamestart.ai", category:"AI Media", clicks:35, bid:0, initial:"G", grad:"from-cyan-400 to-blue-500" },
  { rank:10, name: "hyperparameter", desc: "An AI community where builders share posts, follow people, and explore ideas.", domain:"hyperparameter.si", category:"Profiles", clicks:32, bid:0, initial:"H", grad:"from-orange-400 to-red-500" },
];

const moreProducts = [
  { rank:11, name:"Supertable", desc:"An AI-native table that brings data, AI agents, and automation into one workspace.", domain:"supertable.ai", category:"Productivity", clicks:32, bid:0, initial:"S", grad:"from-violet-500 to-indigo-700" },
];

const activities = [
  { initials:"GA", name:"QOK.ai", detail:"+$12 · 3d" },
  { initials:"O—", name:"Outbid.tv", detail:"+$1 · 3d" },
  { initials:"W", name:"WhatAreYoubuilding.lol", detail:"+$1 · 3d" },
  { initials:"A|", name:"AdsPals", detail:"+$7 · 4d" },
];

const categories = [
  { id:"All", label:"All", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>` },
  { id:"Agents", label:"Agents", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>` },
  { id:"AI Media", label:"AI Media", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>` },
  { id:"Marketing", label:"Marketing", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/></svg>` },
  { id:"Developer", label:"Developer", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>` },
  { id:"SEO", label:"SEO", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>` },
  { id:"Social", label:"Social", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/></svg>` },
  { id:"Productivity", label:"Productivity", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14v-5a3 3 0 0 0-3-3 3 3 0 0 0-3 3v5"/><path d="M9 14a3 3 0 0 0 6 0"/><path d="M12 17v3"/><path d="M8 20h8"/></svg>` },
  { id:"Health", label:"Health", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.08C10.5 3.5 9.5 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>` },
  { id:"Games", label:"Games", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258a4 4 0 0 0-3.995-3.742Z"/></svg>` },
  { id:"Profiles", label:"Profiles", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/></svg>` },
  { id:"Blogs", label:"Blogs", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>` },
  { id:"Other", label:"Other", icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/></svg>` },
];

let activeCategory = "All";

function renderCategories(){
  const wrap = $("#categories");
  wrap.innerHTML = "";
  categories.forEach(cat=>{
    const active = activeCategory===cat.id;
    const a = document.createElement("button");
    a.className = `inline-flex h-8 shrink-0 items-center gap-1 rounded-full border px-3 text-sm font-medium whitespace-nowrap transition ${active ? "bg-primary text-primary-foreground border-transparent" : "bg-white/60 hover:bg-muted border-black/5 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"}`;
    a.innerHTML = `${cat.icon} ${cat.label}`;
    a.addEventListener("click", ()=>{
      activeCategory = cat.id;
      renderCategories();
      filterProducts();
    });
    wrap.appendChild(a);
  });
}

function productRow(p){
  const el = document.createElement("article");
  el.className = "group relative flex items-start gap-3 rounded-2xl border border-transparent bg-white/55 p-4 transition-all hover:border-black/5 hover:bg-white hover:shadow-sm sm:gap-4 sm:px-5 dark:bg-white/4 dark:hover:border-white/10 dark:hover:bg-white/8";
  el.dataset.category = p.category;
  const claimPrice = Math.max(p.bid+1, 1); // simplified: next bid is +1, but for top we show special
  // claim label price per original: Claim #N for $X where X =? For 4 it was 2, etc. We keep p.bid+1 for most, but clamp to headline logic for top 3?
  // We'll compute claim: if rank <=3, use rank specific: 1->17,2->8,3->3 else p.bid+1 with min 1
  let claimLabel = `$${claimPrice}`;
  if(p.rank===1) claimLabel = `$${headlinePrice}`;
  else if(p.rank===2) claimLabel = `$8`;
  else if(p.rank===3) claimLabel = `$3`;
  else if(p.rank===4) claimLabel = `$2`;
  else if(p.rank===5) claimLabel = `$2`;
  else claimLabel = `$${Math.max(p.bid+1,1)}`;

  el.innerHTML = `
    <button type="button" class="claim-btn absolute top-0 left-1/2 z-30 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,.4)] transition-all duration-200 sm:pointer-events-none sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:-translate-y-[60%] sm:group-hover:opacity-100 sm:px-5 sm:text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fill-current"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
      Claim #${p.rank} for ${claimLabel}
    </button>
    <span class="w-7 shrink-0 pt-2 text-center text-sm font-semibold text-muted-foreground">${p.rank}</span>
    <div class="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${p.grad} text-sm font-semibold text-white shadow-sm">${p.initial}</div>
    <div class="min-w-0 flex-1">
      <h3 class="truncate text-sm font-semibold sm:text-base"><a href="#" class="hover:text-primary hover:underline hover:underline-offset-4">${p.name}</a></h3>
      <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">${p.desc}</p>
      <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground sm:text-xs">
        <span class="font-medium text-foreground/70">${p.domain}</span>
        <span>${p.category}</span>
        <span class="font-medium text-foreground">${p.clicks} clicks</span>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-1">
      <span class="text-right text-sm font-semibold tabular-nums sm:min-w-16 sm:text-base">$${p.bid}</span>
      <a href="#" class="hidden size-8 items-center justify-center rounded-full opacity-35 group-hover:opacity-100 hover:bg-muted sm:inline-flex"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a>
    </div>
  `;
  const btn = el.querySelector(".claim-btn");
  btn.addEventListener("click", ()=> openBidDialog(p.rank, parseInt(claimLabel.replace('$','')), p.name));
  return el;
}

function renderProducts(){
  const chase = $("#chase-pack");
  const more = $("#more-pack");
  chase.innerHTML = "";
  more.innerHTML = "";
  products.forEach(p=> chase.appendChild(productRow(p)));
  moreProducts.forEach(p=> more.appendChild(productRow(p)));
}

function filterProducts(){
  const all = $$("#chase-pack article, #more-pack article, .rank-stage > article");
  all.forEach(el=>{
    const cat = el.dataset.category;
    if(!cat) return;
    if(activeCategory==="All" || cat===activeCategory){
      el.style.display = "";
      el.style.opacity = "1";
    } else {
      // for top 3, keep but dim? Original hides or dims? We'll hide those not matching
      if(el.classList.contains("rank-one") && activeCategory!=="All" && activeCategory!=="AI Media") {
        // keep champion but dim? Let's hide if not matching unless All
        // Actually original filters whole leaderboard; We'll hide non-matching top as well
      }
      el.style.display = activeCategory==="All" ? "" : (cat===activeCategory ? "" : "none");
    }
  });
  // Also handle chase-pack empty state
  const visibleChase = $$("#chase-pack article").filter(el=> el.style.display!=="none").length;
  const visibleMore = $$("#more-pack article").filter(el=> el.style.display!=="none").length;
  if(visibleChase===0 && visibleMore===0 && activeCategory!=="All"){
    // show placeholder in chase-pack
    const chase = $("#chase-pack");
    if(!chase.querySelector(".empty-state")){
      const div = document.createElement("div");
      div.className = "empty-state p-8 text-center text-sm text-muted-foreground";
      div.textContent = `No products in ${activeCategory} yet — be the first to claim it!`;
      chase.appendChild(div);
    }
  } else {
    const es = $("#chase-pack .empty-state");
    if(es) es.remove();
  }
}

function renderActivities(){
  const grid = $("#activity-grid");
  grid.innerHTML = "";
  activities.forEach(a=>{
    const div = document.createElement("div");
    div.className = "flex items-center gap-3 rounded-2xl bg-secondary/70 p-3";
    div.innerHTML = `
      <div class="grid size-9 shrink-0 place-items-center rounded-xl bg-foreground text-xs font-semibold text-background">${a.initials}</div>
      <div class="min-w-0"><p class="truncate text-xs font-semibold">${a.name}</p><p class="text-[11px] text-muted-foreground">${a.detail}</p></div>
      ${a.initials==="GA" ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-auto size-3.5 text-primary"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/></svg>` : ""}
    `;
    grid.appendChild(div);
  });
}

// calendar
let calDate = new Date(2026, 8, 1); // September 2026
const champions = {
  1: { initials:"A|", name:"AdsPals", bid:7 },
  2: { initials:"W", name:"WhatAreYoubuilding.lol", bid:1 },
  3: { initials:"GA", name:"QOK.ai", bid:12 },
};

function renderCalendar(){
  const title = $("#cal-title");
  const grid = $("#cal-grid");
  const month = calDate.getMonth();
  const year = calDate.getFullYear();
  title.textContent = calDate.toLocaleDateString("en-US", { month:"long", year:"numeric" });
  // first day of month weekday (0 Sun)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  grid.innerHTML = "";
  // blanks
  for(let i=0;i<firstDay;i++){
    const div=document.createElement("div");
    div.className="h-[64px] sm:h-[78px]";
    grid.appendChild(div);
  }
  for(let d=1; d<=daysInMonth; d++){
    const champ = champions[d];
    const div=document.createElement("div");
    div.className = `group relative h-[64px] rounded-2xl border bg-card p-2 text-left transition hover:z-10 hover:shadow-md sm:h-[78px] ${champ ? "border-primary/30 bg-primary/5 hover:border-primary/50" : "border-border/60 bg-white dark:bg-card/50"}`;
    div.innerHTML = `
      <div class="text-xs font-semibold ${champ ? "text-foreground" : "text-muted-foreground"}">${d}</div>
      ${champ ? `
        <div class="mt-1 flex items-center gap-1.5">
          <span class="grid size-6 place-items-center rounded-full bg-foreground text-[9px] font-bold text-background">${champ.initials}</span>
          <span class="truncate text-[11px] font-medium leading-none">${champ.name}</span>
        </div>
        <div class="mt-1 inline-flex rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">$${champ.bid}</div>
        <div class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-white/80 dark:bg-black/70 backdrop-blur-sm p-2 flex flex-col justify-center text-center">
          <p class="text-xs font-semibold">#1 ${champ.name}</p>
          <p class="text-[11px] text-muted-foreground">$${champ.bid} winning bid</p>
          <p class="mt-1 text-[10px] font-medium text-primary">Top 10 · Day ${d}</p>
        </div>
      ` : `<div class="mt-6 hidden sm:block text-[10px] text-muted-foreground">No champion</div>`}
    `;
    if(champ){
      div.addEventListener("click", ()=> openBidDialog(1, champ.bid+5, champ.name));
      div.style.cursor="pointer";
    }
    grid.appendChild(div);
  }
  // fill remaining to complete rows (42 cells)
  const totalCells = firstDay + daysInMonth;
  const remain = (7 - (totalCells % 7)) % 7;
  for(let i=0;i<remain;i++){
    const div=document.createElement("div");
    div.className="h-[64px] sm:h-[78px]";
    grid.appendChild(div);
  }
}

function updateHeadline(){
  $("#headline-price").textContent = `$${headlinePrice}`;
  $("#crown-price").textContent = `$${leaderPrice}`;
  $$(".claim-btn").forEach(btn=>{
    if(btn.textContent.includes("Claim #1")){
      btn.innerHTML = btn.innerHTML.replace(/\$[\d]+/, `$${headlinePrice}`);
      btn.setAttribute("aria-label", `Claim rank 1 for $${headlinePrice}`);
    }
  });
  // update dialog price if open
  $("#dialog-price").textContent = `$${headlinePrice}`;
  $("#dialog-subtitle").textContent = `You're about to claim #1 for $${headlinePrice} and take the crown.`;
}

function showToast(msg){
  const t=$("#toast");
  t.textContent=msg;
  t.classList.remove("hidden");
  t.classList.add("block");
  setTimeout(()=>{ t.classList.add("hidden"); t.classList.remove("block"); }, 2200);
}

function openBidDialog(rank, price, name){
  $("#dialog-price").textContent = `$${price}`;
  $("#dialog-subtitle").textContent = `You're about to claim #${rank} for $${price}${name ? " — " + name : ""} and climb the board.`;
  const d = $("#bid-dialog");
  if(typeof d.showModal === "function") d.showModal();
  else d.setAttribute("open","");
  // prefill with current panel values
  $("#dialog-url").value = $("#product-url").value || "";
  const sel = $("#category-select").value;
  if(sel) $("#dialog-category").value = sel;
}

// init
renderCategories();
renderProducts();
renderActivities();
renderCalendar();
updateHeadline();

// headline controls
$("#price-minus").addEventListener("click", ()=>{
  if(headlinePrice>1){
    headlinePrice--;
    updateHeadline();
  }
});
$("#price-plus").addEventListener("click", ()=>{
  if(headlinePrice<99){
    headlinePrice++;
    updateHeadline();
  }
});

// theme toggle
$("#theme-toggle").addEventListener("click", ()=>{
  const isDark = document.documentElement.classList.toggle("dark");
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  localStorage.setItem("ox-theme", isDark ? "dark" : "light");
  // swap icon
  $("#theme-toggle").innerHTML = isDark
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
});

// mobile menu
$("#mobile-menu-btn").addEventListener("click", ()=>{
  $("#mobile-nav").classList.toggle("hidden");
});

// bid panel validation
const urlInput = $("#product-url");
const catSelect = $("#category-select");
const submitBtn = $("#submit-bid");
function validateBid(){
  const hasUrl = urlInput.value.trim().length > 5 && urlInput.value.includes(".");
  const hasCat = catSelect.value !== "";
  submitBtn.disabled = !(hasUrl && hasCat);
  submitBtn.style.opacity = submitBtn.disabled ? "0.5" : "1";
}
urlInput.addEventListener("input", validateBid);
catSelect.addEventListener("change", validateBid);
validateBid();

submitBtn.addEventListener("click", ()=>{
  if(submitBtn.disabled) return;
  openBidDialog(1, headlinePrice, "Your product");
});

$("#confirm-bid").addEventListener("click", ()=>{
  const url = $("#dialog-url").value.trim();
  if(!url || !url.includes(".")){
    showToast("Please enter a valid URL");
    $("#dialog-url").focus();
    return;
  }
  // success
  $("#bid-dialog").close();
  showToast("Bid placed! Secure checkout by Dodo Payments — you're on the board.");
  // optionally add to activity
  const domain = (()=>{ try{ return new URL(url.startsWith("http")?url:"https://"+url).hostname.replace("www.",""); } catch{ return url; } })();
  activities.unshift({ initials: domain.slice(0,2).toUpperCase(), name: domain, detail: `+$${headlinePrice} · now` });
  if(activities.length>4) activities.pop();
  renderActivities();
  // increment online count
  const el = $("#online-count");
  const n = parseInt(el.textContent.replace(/,/g,"")) + Math.floor(Math.random()*3+1);
  el.textContent = n.toLocaleString();
});

// claim buttons on top 3
$$(".rank-stage .claim-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const rank = btn.textContent.match(/#(\d+)/)?.[1] || "1";
    const price = parseInt(btn.textContent.match(/\$(\d+)/)?.[1] || headlinePrice);
    openBidDialog(rank, price, btn.closest("article")?.querySelector("h3")?.textContent?.trim());
  });
});

// calendar nav
$("#cal-prev").addEventListener("click", ()=>{
  calDate = new Date(calDate.getFullYear(), calDate.getMonth()-1, 1);
  renderCalendar();
});
$("#cal-next").addEventListener("click", ()=>{
  calDate = new Date(calDate.getFullYear(), calDate.getMonth()+1, 1);
  renderCalendar();
});

// live counts animation
setInterval(()=>{
  const oc = $("#online-count");
  let n = parseInt(oc.textContent.replace(/,/g,""));
  n += Math.floor(Math.random()*5)-2;
  if(n<1000) n=1000;
  oc.textContent = n.toLocaleString();
}, 3500);

// close dialog on backdrop click
$("#bid-dialog").addEventListener("click", (e)=>{
  const dialog = e.currentTarget;
  const rect = dialog.getBoundingClientRect();
  if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom){
    dialog.close();
  }
});

// visitors increment slowly
setInterval(()=>{
  const vc = $("#visitor-count");
  let v = parseInt(vc.textContent.replace(/,/g,""));
  v += Math.floor(Math.random()*3);
  vc.textContent = v.toLocaleString();
}, 5000);

// smooth scroll for anchor links
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", (e)=>{
    const href = a.getAttribute("href");
    if(href && href.length>1){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior:"smooth", block:"start" });
        $("#mobile-nav")?.classList.add("hidden");
      }
    }
  });
});
