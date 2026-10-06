/* ===== Edit your events here =====
   date format: "YYYY-MM-DDTHH:MM:SS" (local time)
   category: "hardware" | "software" | "lecture"  */
const EVENTS = [
  {
    id: 1,
    title: "IoT Sensor Build Workshop",
    category: "hardware",
    date: "2026-10-24T10:00:00",
    venue: "Electronics Lab, Block B",
    short: "Wire up sensors and microcontrollers into a working prototype.",
    details: "A hands-on session where teams assemble a small IoT device and send live sensor data to a dashboard.",
    points: ["Kits provided for each team", "Basic electronics knowledge helpful", "Duration: 6 hours"]
  },
  {
    id: 2,
    title: "Full-Stack Web Dev Bootcamp",
    category: "software",
    date: "2026-11-07T09:30:00",
    venue: "Computer Lab 3",
    short: "Build and deploy a complete web app in one day.",
    details: "Learn how a frontend, a backend API and a database fit together, then deploy your project online.",
    points: ["Bring your own laptop", "Covers HTML, CSS, JavaScript and Node.js", "Duration: 7 hours"]
  },
  {
    id: 3,
    title: "AI in Industry: Guest Lecture",
    category: "lecture",
    date: "2026-11-14T15:00:00",
    venue: "Main Auditorium",
    short: "An industry speaker on how AI is used in real products.",
    details: "A talk followed by an open Q&A on career paths, tools and lessons from shipping AI systems.",
    points: ["Open to all students", "Q&A session at the end", "Duration: 2 hours"]
  },
  {
    id: 4,
    title: "Robotics Hack Day",
    category: "hardware",
    date: "2026-11-28T10:00:00",
    venue: "Robotics Lab",
    short: "Design and program a line-following robot.",
    details: "Teams build a small robot from a kit and race it on a custom track at the end of the day.",
    points: ["Teams of 2 to 4", "Kits and tools provided", "Duration: 8 hours"]
  },
  {
    id: 5,
    title: "24-Hour Software Hackathon",
    category: "software",
    date: "2026-12-12T09:00:00",
    venue: "Innovation Center",
    short: "Build a working solution to a real problem in 24 hours.",
    details: "Teams pick a problem statement, build a prototype, and pitch to a panel of judges.",
    points: ["Teams of up to 4", "Food and refreshments provided", "Prizes for top three teams"]
  }
];

const LABELS = { hardware: "Hardware Workshop", software: "Software Workshop", lecture: "Guest Lecture" };
const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (iso) => new Date(iso).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
const sorted = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));

/* ---------- Countdown ---------- */
function nextEvent() {
  const now = Date.now();
  return sorted.find((e) => new Date(e.date).getTime() > now) || null;
}
function tick() {
  const ev = nextEvent();
  if (!ev) {
    $("next-title").textContent = "No upcoming events right now";
    $("next-date").textContent = "Check back soon";
    ["days", "hours", "mins", "secs"].forEach((k) => ($("cd-" + k).textContent = "00"));
    return;
  }
  $("next-title").textContent = ev.title;
  $("next-date").textContent = fmtDate(ev.date) + " \u2022 " + ev.venue;
  let diff = Math.max(0, Math.floor((new Date(ev.date) - Date.now()) / 1000));
  $("cd-days").textContent = pad(Math.floor(diff / 86400));
  $("cd-hours").textContent = pad(Math.floor((diff % 86400) / 3600));
  $("cd-mins").textContent = pad(Math.floor((diff % 3600) / 60));
  $("cd-secs").textContent = pad(diff % 60);
}
tick();
setInterval(tick, 1000);

/* ---------- Event cards, schedule, select ---------- */
const grid = $("event-grid");
sorted.forEach((e) => {
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.dataset.category = e.category;
  card.innerHTML =
    `<span class="tag ${e.category}">${LABELS[e.category]}</span>` +
    `<h3>${e.title}</h3><p>${e.short}</p><p class="when">${fmtDate(e.date)}</p>`;
  card.addEventListener("click", () => openModal(e));
  grid.appendChild(card);

  const li = document.createElement("li");
  li.innerHTML =
    `<div class="t-date">${fmtDate(e.date)}</div>` +
    `<div class="t-title">${e.title}</div>` +
    `<div class="t-meta">${LABELS[e.category]} \u2022 ${e.venue}</div>`;
  $("timeline").appendChild(li);
});

const sel = $("reg-event");
sel.innerHTML = '<option value="">Select an event</option>' +
  sorted.map((e) => `<option value="${e.id}">${e.title}</option>`).join("");

/* ---------- Filters ---------- */
$("filters").addEventListener("click", (ev) => {
  const btn = ev.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll(".card").forEach((c) =>
    c.classList.toggle("hide", f !== "all" && c.dataset.category !== f));
});

/* ---------- Modal ---------- */
const modal = $("modal");
let lastFocus = null;
function openModal(e) {
  lastFocus = document.activeElement;
  $("m-tag").textContent = LABELS[e.category];
  $("m-tag").className = "tag " + e.category;
  $("m-title").textContent = e.title;
  $("m-meta").textContent = fmtDate(e.date) + " \u2022 " + e.venue;
  $("m-desc").textContent = e.details;
  $("m-list").innerHTML = e.points.map((p) => `<li>${p}</li>`).join("");
  $("m-register").dataset.eventId = e.id;
  modal.hidden = false;
  $("m-close").focus();
}
function closeModal() {
  modal.hidden = true;
  if (lastFocus) lastFocus.focus();
}
$("m-close").addEventListener("click", closeModal);
modal.addEventListener("click", (ev) => { if (ev.target === modal) closeModal(); });
document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && !modal.hidden) closeModal(); });
$("m-register").addEventListener("click", () => {
  sel.value = $("m-register").dataset.eventId;
  closeModal();
});

/* ---------- Forms ---------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUCCESS_MSG = "Your Response have been noted, Confirmation will be sent via E-Mail";

function setError(id, msg) {
  const el = $(id);
  const err = document.querySelector(`.error[data-for="${id}"]`);
  el.classList.toggle("invalid", !!msg);
  err.textContent = msg || "";
  return !msg;
}
function handleForm(formId, rules, successId) {
  const form = $(formId);
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    $(successId).textContent = "";
    let ok = true;
    for (const [id, check] of Object.entries(rules)) {
      if (!setError(id, check($(id).value.trim()))) ok = false;
    }
    if (!ok) return;
    $(successId).textContent = SUCCESS_MSG;
    form.reset();
  });
  form.addEventListener("input", (ev) => {
    if (ev.target.id in rules) setError(ev.target.id, "");
  });
}
const required = (label) => (v) => (v ? "" : `Enter ${label}.`);
const emailRule = (v) => (!v ? "Enter your email." : emailRe.test(v) ? "" : "Enter a valid email address.");

handleForm("register-form", {
  "reg-name": required("your full name"),
  "reg-email": emailRule,
  "reg-event": (v) => (v ? "" : "Select an event."),
  "reg-team": required("a team name"),
  "reg-members": required("at least one team member")
}, "reg-success");

handleForm("contact-form", {
  "con-name": required("your name"),
  "con-email": emailRule,
  "con-msg": required("a message")
}, "con-success");

/* ---------- Mobile nav & active link ---------- */
const nav = $("nav");
const toggle = document.querySelector(".nav-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (ev) => {
  if (ev.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
});
const links = [...nav.querySelectorAll("a")];
const secs = links.map((a) => document.querySelector(a.getAttribute("href")));
window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  let cur = 0;
  secs.forEach((s, i) => { if (s.offsetTop <= y) cur = i; });
  links.forEach((a, i) => a.classList.toggle("active", i === cur));
}, { passive: true });
