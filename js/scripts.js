window.addEventListener("DOMContentLoaded", (e) => {
  var n = function () {
    const e = document.body.querySelector("#mainNav");
    e &&
      (0 === window.scrollY
        ? e.classList.remove("navbar-shrink")
        : e.classList.add("navbar-shrink"));
  };
  n(),
    document.addEventListener("scroll", n),
    document.body.querySelector("#mainNav") &&
      new bootstrap.ScrollSpy(document.body, {
        target: "#mainNav",
        offset: 74,
      });
  const t = document.body.querySelector(".navbar-toggler");
  [].slice
    .call(document.querySelectorAll("#navbarResponsive .nav-link"))
    .map(function (e) {
      e.addEventListener("click", () => {
        "none" !== window.getComputedStyle(t).display && t.click();
      });
    });
});
const observer = new IntersectionObserver((e) => {
    e.forEach((e) => {
      e.isIntersecting
        ? e.target.classList.add("show")
        : e.target.classList.remove("show");
    });
  }),
  hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((e) => observer.observe(e));

const scriptURL =
"https://script.google.com/macros/s/AKfycby8SahlP_dwf3KV4G7eoUlg4_EQx6Wzhluefe_F3Q_qfHhPRBJ6PLBkpps-qgCFP654ow/exec";
const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");
form.addEventListener("submit", (e) => {
e.preventDefault();
const data = new FormData(form)
let timestamp = new Date().toISOString();
data.append("timestamp",timestamp)

let hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'timestamp';
    hiddenInput.value = timestamp;

form.appendChild(hiddenInput);

const action = e.target.action
fetch(action, { method: "POST", body: data })
  .then((response) => {
    msg.innerHTML = "Thank you for Subscribing";
    setTimeout(() => {
      msg.innerHTML = "";
    }, 5000);
    form.reset();
    console.log("data", data);
  })
  .catch((error) => console.error("Error!", error.message, form));
});

// pop up
document.addEventListener('DOMContentLoaded', function () {
  var popup = document.getElementById('modelPopup');
  var button = document.getElementById('experienceButton');


 
});
