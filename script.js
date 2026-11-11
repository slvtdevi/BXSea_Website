// Scale the 1600px-wide design to fit the browser window.
function fit() {
  document.documentElement.style.setProperty(
    "--scale",
    window.innerWidth / 1600,
  );
}
fit();
window.addEventListener("resize", fit);

// ---------- Header: soft background once scrolled + highlight the section in view ----------
const header = document.getElementById("header");
const links = [...header.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll(".sec")];

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 4);
  const mid = window.innerHeight / 2;
  let current = null;
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top <= mid && r.bottom > mid) current = s.id;
  }
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current),
  );
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Contact pop-up ----------
const modal = document.getElementById("contact-modal");
const form = document.getElementById("contact-form");
const sent = document.getElementById("contact-sent");
const errorBox = document.getElementById("form-error");
let lastFocus = null;

function openContact() {
  lastFocus = document.activeElement;
  form.hidden = false;
  sent.hidden = true;
  errorBox.hidden = true;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  form.elements.name.focus();
}

function closeContact() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

document
  .querySelectorAll("[data-open-contact]")
  .forEach((b) => b.addEventListener("click", openContact));
document
  .querySelectorAll("[data-close-contact]")
  .forEach((b) => b.addEventListener("click", closeContact));
modal.addEventListener("mousedown", (e) => {
  if (e.target === modal) closeContact();
});

document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeContact();
  // keep keyboard focus inside the pop-up
  if (e.key === "Tab") {
    const f = [...modal.querySelectorAll("button, input, textarea")].filter(
      (el) => !el.closest("[hidden]"),
    );
    const first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email } = form.elements;
  name.setAttribute("aria-invalid", !name.value.trim());
  email.setAttribute(
    "aria-invalid",
    !email.validity.valid || !email.value.trim(),
  );

  if (!name.value.trim()) return showError("Please enter your name.", name);
  if (!email.value.trim() || !email.validity.valid)
    return showError("Please enter a valid email address.", email);

  // No server is connected yet: this only shows a confirmation.
  // To actually receive messages, point the form at a service like Formspree.
  document.getElementById("sent-name").textContent = name.value.trim();
  form.reset();
  form.hidden = true;
  sent.hidden = false;
  sent.querySelector("button").focus();
});

function showError(msg, field) {
  errorBox.textContent = msg;
  errorBox.hidden = false;
  field.focus();
}

// ---------- Animals & event cards: tap to pop on touch screens ----------
const poppers = [...document.querySelectorAll(".pop, .event")];
poppers.forEach((el) => {
  el.addEventListener("click", () => {
    const on = !el.classList.contains("tapped");
    poppers.forEach((p) => p.classList.remove("tapped"));
    if (on) el.classList.add("tapped");
  });
  el.addEventListener("mouseleave", () => el.classList.remove("tapped"));
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".pop, .event"))
    poppers.forEach((p) => p.classList.remove("tapped"));
});

// ---------- 20 Journeys: tap a dot to open it on touch screens ----------
const stops = [...document.querySelectorAll(".jstop")];
stops.forEach((st) => {
  const btn = st.querySelector(".hit");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const on = !st.classList.contains("open");
    stops.forEach((o) => {
      o.classList.remove("open");
      o.querySelector(".hit").setAttribute("aria-expanded", "false");
    });
    if (on) {
      st.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".jstop"))
    stops.forEach((o) => {
      o.classList.remove("open");
      o.querySelector(".hit").setAttribute("aria-expanded", "false");
    });
});
