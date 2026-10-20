import { team, teammateName } from "./data/team.js";
import { stormShots } from "./data/storm-photo.js";
import { aboutPYSC } from "./data/aboutPYSC.js";

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
       <img src="./image/dp.jpg" class="size-[200px]"/>
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
  const previewBadge = team.other_member.filter(
    (o) => team.other_member.length <= length,
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
      <img src="./image/dp.jpg" class="size-[80px]"/>
    `,
      )
      .join("")}
    <div id="other-badge-circle" class="size-[80px] grid place-content-center bg-white/5 text-2xl  text-red-400 rounded-full">${otherTotal - length}+</div>
    </div>
    <button class="p-3 px-4 rounded-lg bg-red-400 text-xl flex gap-2 items-center">View All<i class="fa fa-angle-right"></i></button>
  `;
}

function renderOtherMember() {
  const { other_member } = team;
  otherTeammateBox.innerHTML = other_member
    .map(
      (t, i) => `
  <h2 id="regional-label" class="capitalize text-3xl text-white/60 font-light">${region[i]}</h2>
  <div id="regional-group" class="flex flex-wrap gap-3 *:basis-[500px]">
  ${t[region[i]]
          .map(
            (member) => `
    <div id="other-member" class="grid gap-3 items-start p-3 rounded-lg border border-slate-400 justify-items-center duration-500">
       <img src="./image/dp.jpg" class="size-[200px] rounded-[100%]"/>
       <h3 id="member-name" class="text-3xl text-red-400 font-bold text-center">${member.name}</h3>
       <p id="member-region" class="flex gap-2 items-center text-white/60 text-xl"><i class="fa fa-map-marker"></i>${member.area}</p>
    </div>
  `,
          )
          .join("")}</div>`,
    )
    .join("");
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

const allShot = foundChaser();
const shotGroup = document.querySelector("#storm-shot-group");

function renderShot(byName) {
  const filteredShot =
    byName === "all"
      ? allShot
      : allShot.filter((s) => s.name.toLowerCase() === byName);
  shotGroup.innerHTML = `
    ${filteredShot.length
      ? filteredShot
        .map((s) =>
          s.photos
            .map(
              (p) => `
      <div class="p-3 grid gap-5 rounded-lg border border-slate-400 grid-cols-[1fr_auto] duration-500 hover:scale-110">
        <div id="storm-card-header" class="flex justify-between items-center col-span-2">
          <div id="author-icon" class="flex gap-5 items-center">
            <img src="./image/dp.jpg" class="size-[60px] rounded-full"/>
            <p id="author-name" class="text-xl text-white/60">${s.name}</p>
          </div>
          <p id="storm-photo-date" class="text-xl">${new Date(
                p.date,
              ).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
        </div>
        <img src="${photoPath}${p.name}.webp" class="rounded-lg col-span-2 h-[300px] w-full"/>
        <h3 id="storm-photo-title" class="font-bold text-3xl text-red-400">${p.name}</h3>
        <p id="storm-location-text" class="flex gap-3 items-center text-xl text-white/60 self-start"><i class="fa fa-map-marker"></i>${p.location}</p>
        <p id="storm-direction-text" class="flex gap-3 items-center text-xl text-red-400 bg-red-400/20 p-2 px-3 rounded-full justify-self-start self-center"><i class="fa fa-compass"></i>${p.direction}</p>
        <button id="like-btn" class="text-xl p-3 px-4 rounded-full border border-red-400 flex gap-3 items-center text-red-400/40 justify-self-end"><i class="fa fa-heart"></i><span id="like-count">0</span></button>
      </div>
    `,
            )
            .join(""),
        )
        .join("")
      : `<p class="my-5 text-2xl justify-self-center grow text-center">No item found for <span class="capitalize">${byName}</span></p>`
    }
  `;
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

console.log("Success it work in GitHub")