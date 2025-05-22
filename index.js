let index = 0;
let startTimer;

const wrapper = document.querySelector(".picture-wrapper");
const wrapperChildren = wrapper.children;
const originalBoxes = Array.from(wrapper.children);
const nav = document.querySelector("nav");
const navCircle = document.querySelector(".nav-circles");

[...wrapperChildren].forEach(() => {
  const item = document.createElement("div");
  item.classList.add("circle-nav");
  navCircle.appendChild(item);
});

navCircle.children[0].classList.add("active");
const getActiveNavCircle = () => document.querySelector(".active");
const getNextNavCircle = () => getActiveNavCircle().nextElementSibling;
const getPrevNavCircle = () => getActiveNavCircle().previousElementSibling;
// ....
nav.addEventListener("click", (e) => {
  const target = e.target.closest("svg");
  resetTimer();

  if (!target) return;

  if (target.classList.contains("right")) {
    swipeRight();
  } else {
    swipeLeft();
  }
});

navCircle.addEventListener("click", (e) => {
  resetTimer();
  const target = e.target.closest(".circle-nav");
  if (!target) return;
  const navIndex = Array.from(navCircle.children).indexOf(target);
  const selectedBox = originalBoxes[navIndex];
  addClassToAll("hide");
  selectedBox.classList.remove("hide");
  index = navIndex;
  console.log(navIndex);
  getActiveNavCircle().classList.remove("active");
  navCircle.children[navIndex].classList.add("active");
});

const stepTracker = [{}];

function removeClassFromAll(classNm) {
  document
    .querySelectorAll(`.${classNm}`)
    .forEach((element) => element.classList.remove(classNm));
}

function addClassToAll(classNm) {
  originalBoxes.forEach((element) => element.classList.add(classNm));
}

function swipeRight() {

  const currentFrame = wrapper.children[index];
  let currentCircle = getActiveNavCircle();
  let nextCircle = getNextNavCircle();

  currentFrame.classList.add("hide");
  currentCircle.classList.remove("active");

  if (nextCircle) {
    nextCircle.classList.add("active");
  } else {
    navCircle.children[0].classList.add("active");
  }
  if (index === wrapperChildren.length - 1) {
    index = 0;
    removeClassFromAll("hide");
  } else {
    index++;
    wrapper.children[index].classList.remove("hide");
  }
}

function swipeLeft() {
  let currentCircle = getActiveNavCircle();
  let previousCircle = getPrevNavCircle();

  index--;

  if (index < 0) {
    index = wrapperChildren.length - 1;
    addClassToAll("hide");
    wrapperChildren[index].classList.remove("hide");
  } else {
    wrapperChildren[index].classList.remove("hide");
  }

  if (previousCircle) {
    currentCircle.classList.remove("active");
    previousCircle.classList.add("active");
  } else {
    navCircle.children[navCircle.children.length - 1].classList.add("active");
    currentCircle.classList.remove("active");
  }
}
function resetTimer() {
  clearInterval(startTimer);

  startTimer = setInterval(() => {
    swipeRight();
  }, 5000);
}
resetTimer();
