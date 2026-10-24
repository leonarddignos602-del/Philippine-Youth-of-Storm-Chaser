import { team, teammateName } from "./data/team.js";
import { stormShots } from "./data/storm-photo.js";
import { aboutPYSC } from "./data/aboutPYSC.js";
import { alertList } from "./data/alert.js";
import { albums } from "./data/album.js";

const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
const nav = document.querySelector("header nav");
const navToggle = document.querySelector("#menu-btn");

navToggle.onclick = () => expandNav()

function expandNav() {
  nav.classList.toggle("max-h-[200px]");
  navToggle.className = !navToggle.className.includes("border-red-400") ? navToggle.className.replace("border-slate-400", "border-red-400") : navToggle.className.replace("border-red-400", "border-slate-400")
}

const region = [ "luzon", "visayas", "mindanao" ];
const regionalTeammateBox = document.querySelector("#teammate-group");
const otherTeammateBox = document.querySelector("#other-teammate-group");
function renderRegionalLeader() {
  const { regional_leader } = team;
  regionalTeammateBox.innerHTML = regional_leader
    .map(
      (lead) => `
    <div id="regional-lead-card" class="grid gap-2 justify-items-center content-start rounded-lg border border-slate-400 p-3 duration-500 hover:border-slate-200">
      <p id"regional-name" class="uppercase  mb-2 text-3xl text-red-400 bg-red-400/20 p-2 px-3 rounded-full">${lead.region}</p>
       <img src="./image/avatars/${lead.image}" class="size-[200px] rounded-full"/>
       <h3 id="regional-lead-name" class="text-red-400 text-2xl text-center font-bold">${lead.name}</h3>
       <p id="regional-lead-area" class="text-white/60 flex gap-2 items-center"><i class="fa fa-map-marker"></i>${lead.area}</p>
       ${lead.occupation ? `<p id="regional-lead-occupation" class="flex gap-2 items-center"><i class="fa fa-briefcase"></i>${lead.occupation}</p>` : ""}
    </div>
  `,
    )
    .join("");
}

const landingUI = document.querySelector("main").innerHTML;
function renderOtherMemberPreview() {
  const length = 3;
  const previewBadge = team.other_member[0].luzon.filter(
    (o,i) => i < length
  );
  let otherTotal = 0;
  team.other_member.forEach((r, i) => {
    otherTotal += r[ region[ i ] ].length;
  });
  otherTeammateBox.innerHTML = `
    <div id="badges-group" class="flex -space-x-2">
    ${previewBadge
      .map(
        (p) => `
      <img src="./image/${p.image ? `avatars/${p.image}` : "dp.jpg"}" class="size-[80px] rounded-full"/>
    `,
      )
      .join("")}
    <div id="other-badge-circle" class="size-[80px] grid place-content-center bg-white/5 text-2xl  text-red-400 rounded-full">${otherTotal - length}+</div>
    </div>
    <button id="view-other-chaser-btn" class="p-3 px-4 rounded-lg bg-red-400 text-xl flex gap-2 items-center pointer-events-auto justify-self-center">View All<i class="fa fa-angle-right"></i></button>
  `;
  const otherChaserToggle = otherTeammateBox.querySelector("#view-other-chaser-btn")
  otherChaserToggle.onclick = () => {
    renderOtherMember(otherChaserToggle);
  }
}

function renderOtherMember(toggle) {
  const { other_member } = team;
  otherTeammateBox.innerHTML += `
  <div id="other-chaser-card" class="fixed top-[50%] left-[50%] translate-x-[-50%] grid gap-4 translate-y-[-50%] backdrop-blur-xl rounded-lg p-3 h-[60vh] w-[90vw] bg-black/80 border border-slate-400">
    <div id="card-header" class="flex items-center">
      <button id="hide-other-chaser-card" class="p-3"><i class="fa fa-angle-left"></i></button>
      <h2 id="section-label" class="grow text-center text-2xl">Other Chasers</h2>
    </div>
    <div id="card-content-wrapper" class="overflow-scroll h-full grid gap-4">
    ${other_member.map((m, i) => `
    <h3 id="regional-text" class="text-lg text-red-400 bg-red-400/20 p-2 px-3 rounded-full capitalize justify-self-start flex items-center gap-2">${region[i]}<span id="circle" class="size-[8px] rounded-full bg-red-400"></span><span id="total-chaser">${m[region[i]].length} Chasers</span></h3>
    <div id="chaser-wrapper" class="flex flex-wrap gap-4">
    ${m[region[i]].map(c => `
      <div id="other-chaser-item" class="basis-full 2xl:basis-[300px] p-3 bg-red-400/5 rounded-lg flex items-center gap-4">
        <img src="./image/${c.image ? "avatars/"+c.image : "dp.jpg"}" class="size-[100px] rounded-full"/>
        <div id="chader-name-card">
          <h4 id="chaser-name" class="text-red-400 text-xl font-bold">${c.name}</h4>
          ${c.status ? `<p class="text-red-400 p-1 px-3 rounded-full bg-red-400/10">${c.status}</p>` : ""}
          <p id="chaser-region" class="text-white/60 flex gap-3 items-center"><i class="fa fa-map-marker"></i>${c.area}</p>
        </div>
      </div>
    `).join("")}</div>`).join("")}
    </div>
  </div>
  `
  toggle.className = toggle.className.replace("pointer-events-auto", "pointer-events-none")
  const otherCardModal = document.querySelector("#other-chaser-card")
  document.querySelector("#hide-other-chaser-card").onclick = () => hideChaserCard(otherCardModal)
}

function hideChaserCard(card) {
  card.remove();
  renderOtherMemberPreview();
}

renderRegionalLeader();
renderOtherMemberPreview();

const allTeammateCard = document.querySelectorAll(
  "#founder-card, #regional-lead-card, #other-member",
);
function animateTeammateCard() {
  const animate = new IntersectionObserver((el) => {
    if (el[ 0 ].intersectionRatio < 50) {
      const newStyle = el[0].target.className.replace(
        "opacity-0 translate-y-2",
        "opacity-100 translate-y-0",
      );
      el[0].target.className = newStyle;
    }
  });
  allTeammateCard.forEach((card) => {
    animate.observe(card);
  });
}

animateTeammateCard();
window.onscroll = () => { };

const filterBtns = document.querySelectorAll("#filter-btn");
filterBtns.forEach((btn) => {
  btn.className += btn.dataset.tag === "All" ? "bg-red-400" : "bg-transparent";
});
const photoPath = "./image/storm-photo/";

function foundChaser() {
  let found = [];
  for (let names of teammateName) {
    for (let chaser of stormShots.luzon.chasers) {
      if (names.includes(chaser.name)) {
        found = [ ...found, chaser ];
      }
    }
    if (stormShots.visayas.chasers[0].photos[0].name) {
      for (let chaser of stormShots.visayas.chasers) {
        if (names.includes(chaser.name)) {
          found = [ ...found, chaser ];
        }
      }
    }
    if (stormShots.mindanao.chasers[0].photos[0].name) {
      for (let chaser of stormShots.mindanao.chasers) {
        if (names.includes(chaser.name)) {
          found = [ ...found, chaser ];
        }
      }
    }
  }
  return found;
}

const existChaser = foundChaser();
const shotGroup = document.querySelector("#storm-shot-group");
function renderShot(byName) {
  const filteredShot =
    byName === "all"
      ? existChaser
      : existChaser.filter((s) => s.name.toLowerCase() === byName);
  shotGroup.innerHTML = `
    ${filteredShot.length
      ? filteredShot
        .map((s) =>
          s.photos
            .map(
              (p) => `
      <div id="storm-photo-card" class="p-3 grid gap-5 rounded-lg border border-slate-400 grid-cols-[1fr_auto] duration-500">
        <div id="storm-card-header" class="flex justify-between items-center col-span-2">
          <div id="author-icon" class="flex gap-5 items-center">
            <img src="./image/avatars/${s.image}" class="size-[60px] rounded-full"/>
            <p id="author-name" class="text-xl text-white/60">${s.name}</p>
          </div>
          <p id="storm-photo-date" class="text-xl">${dateFormat.format(new Date(p.date))}</p>
        </div>
        <img src="${photoPath}${s.src}${p.name}.webp" class="rounded-lg col-span-2 h-[300px] w-full"/>
        <h3 id="storm-photo-title" class="font-bold text-3xl text-red-400">${p.name}</h3>
        <p id="storm-location-text" class="flex gap-3 items-center text-xl text-white/60 self-start"><i class="fa fa-map-marker"></i>${p.location}</p>
        <p id="storm-direction-text" class="flex gap-3 items-center text-xl text-red-400 bg-red-400/20 p-2 px-3 rounded-full justify-self-start self-center"><i class="fa fa-compass"></i>${p.direction}</p>
        <button id="like-btn" class="text-xl p-3 px-4 rounded-full border border-red-400 flex gap-3 items-center text-${p.likes > 0 ? "red-400" : "red-400/40"} justify-self-end active:scale-110 duration-300" data-name="${p.name}"><i class="fa fa-heart"></i><span id="like-count">${p.likes}</span></button>
      </div>
    `,
            )
            .join(""),
        )
        .join("")
      : `<p class="my-5 text-2xl justify-self-center grow text-center">No item found for <span class="capitalize">${byName}</span></p>`
    }
  `;
  const reactBtn = document.querySelectorAll("#like-btn");
  reactBtn.forEach(react => {
    react.onclick = () => interactiveReact(
    react.querySelector("#like-count"),
    react.dataset.name,
  )})
}

function findLikeInList(name, btn) {
  let foundLike = null;
  for (let chaser of existChaser) {
    for (let photo of chaser.photos) {
      if (photo.name === name) {
        photo.likes < 1 ? photo.likes++ : photo.likes--
        foundLike = photo.likes;
      }
    }
  }
  return foundLike;
}

function interactiveReact(btn, name) {
  let like = findLikeInList(name, btn);
  btn.textContent = like;
  btn.classList.toggle("reacted");
  like > 0 ? btn.parentNode.classList.replace("text-red-400/40", "text-red-400") : btn.parentNode.classList.replace("text-red-400", "text-red-400/40")
}

renderShot("all");

function highlightBtn(name) {
  filterBtns.forEach((btn) => {
    if (btn.dataset.tag.toLowerCase() === name) {
      btn.className = btn.className.replace("bg-transparent", "bg-red-400");
    } else {
      btn.className = btn.className.replace("bg-red-400", "bg-transparent");
    }
  });
}

// highlights current filter using event
filterBtns.forEach(
  (btn) =>
  (btn.onclick = () => {
    renderShot(btn.dataset.tag.toLowerCase());
    highlightBtn(btn.dataset.tag.toLowerCase());
  }),
);

const aboutContainer = document.querySelector("#about-item-group");

function renderAboutItem() {
  aboutContainer.innerHTML = aboutPYSC
    .map(
      (a) => `
    <div class="rounded-lg border border-red-400 bg-red-400/5 grid gap-5 py-5 px-8">
       <h3 id="item-name" class="flex gap-3 items-center text-2xl text-white/60"><span id="icon" class="size-[50px] text-2xl bg-red-400/20 text-red-400 rounded-lg grid place-content-center"><i class="${a.icon}"></i></span>${a.name}</h3>
       <p class="text-3xl text-red-400 font-bold">${a.value}</p>
    </div>
  `,
    )
    .join("");
}

renderAboutItem();

const copyRightYear = document.querySelector("#copyright-year").textContent = new Date().getFullYear();

// Working for Navigation Menu -----

const weatherHubBtn = document.querySelector("#weather-hub-btn");
weatherHubBtn.onclick = () => weatherHub();

// render WeatherHub navigation panel

function weatherHub() {
  const menus = [
    {
      name: "Alerts",
      content: alertList.alerts,
    },
    {
      name: "Severe Weather Warnings",
      content: []
    },
    {
      name: "Severe Weather Archieves",
      content: [],
    }
  ]
  weatherHubBtn.style.pointerEvents = "none"
  const panel = document.createElement("div");
  panel.id = "panel-wrapper";
  panel.className = "fixed top-0 left-0 z-10 grid place-content-center h-screen w-screen";
  panel.innerHTML = `
    <div id="panel" class="p-3 rounded-lg w-[95vw] max-h-[80vh] h-auto border opacity-0 translate-x-2 border-slate-400 bg-black/80 backdrop-blur-md grid gap-3">
      <div id="panel-header" class="flex gap-3 items-center">
        <button id="hide-panel-btn" class="p-3 rounded-lg border border-slate-400 text-xl"><i class="fa fa-angle-left"></i></button>
        <h2 id="panel-title" class="text-center text-3xl font-bold grow">Weather <span class="text-red-400">Hub</span></h2>
      </div>
      <div id="menu-card-layout" class="flex flex-wrap gap-4">
        ${menus.map(m => `
          <div id="${m.name.toLowerCase()}-item" class="p-3 rounded-lg bg-red-400/5 grid items-start gap-4 basis-[500px] border border-red-400/60">
            <h3 id="menu-name" class="flex items-center gap-3 text-red-400 font-bold">${m.name}<span id="circle" class="size-[10px] rounded-full bg-red-400"></span><span id="count">${m?.content[0]?.name ? m.content.length : 0}</span></h3>
            ${
              m.headline ? m.headline.map(m =>`
              <article class="grid grid-cols-[1fr_auto] gap-2 items-center">
                <h3 id="article-title" class="flex items-center gap-2"><span id="icon-title" class="text-red-400"><i class="fa fa-bolt"></i></span>${m}</h3>
                <button id="view-article" class="p-2 px-3 rounded-lg text-white bg-red-400 active:scale-110 duration-200" data-title="${m}">Read Article</button>
              </article>
              `).join("") : `<p class="text-white/60">No item added here</p>`
            }
          </div>
        `).join("")}
      </div>
    </div>
  `
  document.body.append(panel);
  changeContent();
  hidePanel(panel);
}

//render hide toggle for panel

function hidePanel(panel) {
  panel.querySelector("#hide-panel-btn").onclick = () => closePanel(panel);
}

// changing panel content

function changeContent() {
  const panel = document.querySelector("#panel");
  const panelContent = panel.innerHTML;
  panel.querySelectorAll("#alerts-item button").forEach(btn => {
    btn.onclick = () => {
      const foundArticle = alertList.alerts.find(a => a.name === btn.dataset.title);
      readArticle(
        panel,
        foundArticle,
        panelContent
      )
    }
  })
}

// render article of panel

function readArticle(panel, article, panelContent) {
  const { name, date, content, source } = article;
  panel.innerHTML = `
  <div id="panel-header" class="flex items-center gap-3">
    <button id="exit-article-btn" class="p-3 rounded-lg border border-slate-400 text-xl"><i class="fa fa-angle-left"></i></button>
    <h2 id="panel-title" class="text-2xl font-bold text-center">Read Article</h2>
  </div>
  <div id="article-header" class="grid gap-3">
    <h3 id="article-title" class="font-bold text-red-400 text-2xl">${name}</h3>
    <p id="article-date" class="flex gap-3 items-center"><i class="fa fa-calendar"></i>${dateFormat.format(new Date(date))}</p>
  </div>
  <article id="article-content" class="text-lg max-h-[30vh] h-auto overflow-scroll">${content ? content : "No content added"}</article>
  ${source ? `<p class="text-lg mt-3 text-white/60">Source: <span class="text-red-400/80">${source}</span></p>` : ""}
  `
  panel.querySelector("#exit-article-btn").onclick = () => exitToArticle(panel, panelContent);
}

// render hide toggle for article

function exitToArticle(panel, panelContent) {
  panel.innerHTML = panelContent;
  changeContent();
  hidePanel(panel.parentNode);
}

// remove node element of panel from body

function closePanel(panel) {
  document.body.removeChild(panel);
  weatherHubBtn.style.pointerEvents = "auto";
  weatherHubBtn.onclick = () => weatherHub();
}

// ------ Album Section ------

const albumNavBtn = document.querySelector("#album-btn");
albumNavBtn.onclick = () => openAlbumPanel();
const panelSections = {
  home: "",
  album: "",
  photo: "",
}
function openAlbumPanel() {
  const { chasers } = albums;
  albumNavBtn.className += "pointer-events-none text-red-400";
  const albumPanel = document.createElement("div");
  albumPanel.id = "album-wrapper";
  albumPanel.className = "fixed h-screen w-screen grid place-content-center z-10 top-0";
  albumPanel.innerHTML = `
    <div id="album-panel" class="p-3 border border-slate-400 w-[95vw] rounded-lg bg-black/80 backdrop-blur-md grid gap-4">
      <div id="album-panel-header" class="flex gap-3 items-center">
        <button id="hide-album" class="p-3 rounded-lg border border-slate-400 text-xl"><i class="fa fa-angle-left"></i></button>
        <h3 id="panel-title" class="text-3xl font-bold text-center grow">Chaser's <span class="text-red-400">Album</span></h3>
      </div>
      <div id="album-item-wrapper" class="flex flex-wrap gap-3">${chasers.map(c => `
      <div id="album-chaser" class="basis-[500px] bg-red-400/10 rounded-lg p-3 grid gap-3 items-center grid-cols-[auto_1fr_auto]">
        <img src="${c.image}" class="size-[80px] rounded-full"/>
        <div id="album-chaser-info" class="grid gap-1">
        <h3 id="chaser-name" class="text-red-400 font-bold text-xl">${c.name}</h3>
        <p id="album-total">${c.album.length} ${c.album.length > 1 ? "Albums" : "Album"}</p>
        </div>
        <button id="view-chaser-album-btn" data-name="${c.name}" class="p-2 px-3 rounded-lg text-white bg-red-400">View Album</button>
      </div>
      `).join("")}</div>
    </div>
  `
  document.body.appendChild(albumPanel);
  panelSections.home = albumPanel.querySelector("#album-panel").innerHTML;
  renderChaserAlbumBtn(albumPanel.querySelector("#album-panel"));
  renderClosingPanelBtn(albumPanel);
}

// functionality button to remove panel

function renderClosingPanelBtn(panel) {
  panel.querySelector("#album-panel #hide-album").onclick = () => {
    document.body.removeChild(panel);
    albumNavBtn.className = albumNavBtn.className.replace("pointer-events-none text-red-400", "");
  }
}

// functionality button for rendering album selected chaser 

function renderChaserAlbumBtn(albumPanel) {
  document.querySelectorAll("#view-chaser-album-btn").forEach(btn => btn.onclick = () =>  {
    viewChaserAlbum(btn.dataset.name)
     renderExitChaserAlbumBtn(albumPanel);
  });
}

// update panel content to Chaser's album

function viewChaserAlbum(name) {
  const albumPanel = document.querySelector("#album-panel");
  const albumImagePath = `./image/albums/${name.toLowerCase()}/`;
  const foundAlbum = albums.chasers.find(c => c.name === name);
  albumPanel.innerHTML = `
    <div id="panel-header" class="flex items-center">
      <button id="exit-chaser-album-btn" class="p-3 rounded-lg border border-slate-400 text-xl"><i class="fa fa-angle-left"></i></button>
      <h3 id="panel-title" class="text-3xl font-bold grow text-center">${name}'s <span class="text-red-400">Album</span></h3>
    </div>
    <div id="chaser-album-wrapper" class="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-scroll">${foundAlbum.album.map(a => `
      <div id="chaser-album-item" class="grid gap-3 rounded-lg p-3 bg-red-400/10 items-start">
        <img src="${albumImagePath}${a.photos[0]?.name}.webp" class="h-[200px] w-full rounded-lg"/>
        <div id="chaser-item-info-wrapper" class="flex justify-between items-center flex-wrap">
          <h4 id="chaser-album-name" class="font-bold text-xl">${a.name}</h4>
          <p id="chaser-album-item-count" class="text-white/60">${a.photos.length} ${a.photos.length > 1 ? "Items" : "Item"}</p>
        </div>
        <button id="view-album-category-btn" class="p-2 rounded-lg bg-red-400 text-white text-lg" data-albumname="${a.name}">View</button>
      </div>
    `).join("")}</div>
  `
  panelSections.album = albumPanel.innerHTML;
  renderViewChaserAlbumListBtn(
    name,
    albumImagePath
  );
}

// display button for exit to Home Panel

function renderExitChaserAlbumBtn(album) {
  album.querySelector("#exit-chaser-album-btn").onclick = () => {
    album.innerHTML  = panelSections.home;
    renderChaserAlbumBtn(album);
    renderClosingPanelBtn(album.parentNode)
  }
}

// functionality button to display selected album photos of chaser

function renderViewChaserAlbumListBtn(name, albumImagePath) {
  const viewAlbumBtns = document.querySelectorAll("#view-album-category-btn")
    viewAlbumBtns.forEach(btn => btn.onclick = () => {
     renderChaserPhotos(btn.dataset.albumname, name, albumImagePath)
  });
}

// panel content update into lists of selected album

function renderChaserPhotos(selectedAlbum, name, albumImagePath) {
  const foundPhotos = albums.chasers.find(c => c.name === name).album.find(a => a.name === selectedAlbum).photos;
  const albumPanel = document.querySelector("#album-panel");
  albumPanel.innerHTML = `
    <div id="album-panel-header" class="flex gap-3 items-center">
      <button id="hide-chaser-album-item-btn" class="p-3 rounded-lg border border-slate-400 text-xl"><i class="fa fa-angle-left"></i></button>
      <h2 id="panel-title" class="text-2xl font-bold grow text-center">${name}'s ${selectedAlbum} <span class="text-red-400">Photos</span></h2>
    </div>
    <div id="chaser-album-photo-wrapper" class="grid gap-4 max-h-[40vh] overflow-scroll xl:grid-cols-2">${foundPhotos.map(p => `
      <div id="chaser-photo-item" class="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-red-400/10 p-3 rounded-lg">
        <img src="${albumImagePath}${p.name}.webp" class="size-[100px] rounded-lg"/>
        <div id="photo-info" class="grid gap-1">
          <h3 id="photo-name" class="text-red-400 font-bold text-xl">${p.name}</h3>
          <p id="photo-date">${dateFormat.format(new Date(p.date))}</p>
        </div>
        <button id="view-chaser-photo" class="p-2 px-3 rounded-lg text-red-400 border border-red-400">View Photo</button>
      </div>
    `).join("")}</div>
  `
  panelSections.photo = albumPanel.innerHTML;
  renderExitAlbumPhotos(albumPanel, name, albumImagePath)
}

// render the exit button back to album list of chaser

function renderExitAlbumPhotos(panel, name, albumImagePath) {
  panel.querySelector("#hide-chaser-album-item-btn").onclick = () => {
    panel.innerHTML = panelSections.album;
    renderViewChaserAlbumListBtn(name, albumImagePath)
    renderExitChaserAlbumBtn(
      panel
    )
  }
}