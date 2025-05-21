const wrapper = document.querySelector(".picture-wrapper");
const originalBoxes = Array.from(wrapper.children); 

const nav = document.querySelector("nav");
const navCircle = document.querySelector(".nav-circles");
const getFirstChild = () => wrapper.children[0];
const getLastChild = () => wrapper.children[wrapper.children.length - 1];
[...wrapper.children].forEach(() => {
  const item = document.createElement("div");
  item.classList.add("circle-nav");

  navCircle.appendChild(item);
});

navCircle.children[0].classList.add("active");
const getActiveNavCircle = () => document.querySelector(".active");
const getNextNavCircle = () => getActiveNavCircle().nextElementSibling;
const getPrevNavCircle = () => getActiveNavCircle().previousElementSibling;

nav.addEventListener("click", (e) => {
  const target = e.target.closest("svg");
  const firstChild = getFirstChild();
  const lastChild = getLastChild();
  let currentCircle = getActiveNavCircle();
  let nextCircle = getNextNavCircle();
  let previousCircle = getPrevNavCircle();

  if (!target) return;

  if (target.classList.contains("right")) {

    wrapper.removeChild(firstChild);
    currentCircle.classList.remove("active");
    if (nextCircle) {
      nextCircle.classList.add("active");
    } else {
      navCircle.children[0].classList.add("active");
    }

    if (!wrapper.contains(firstChild)) {
      wrapper.appendChild(firstChild);
    }
  } else {
    wrapper.insertBefore(lastChild, firstChild);

    if (previousCircle) {
      currentCircle.classList.remove("active");
      previousCircle.classList.add("active");
    } else{
      navCircle.children[navCircle.children.length - 1].classList.add("active");
      currentCircle.classList.remove("active");
    }
  }
});


navCircle.addEventListener('click', (e)=>{
  const target = e.target.closest(".circle-nav");
  if (!target) return;
  const index = Array.from(navCircle.children).indexOf(target);
  const selectedBox =originalBoxes[index]
  wrapper.insertBefore(selectedBox,wrapper.children[0]);
  console.log(index)
  getActiveNavCircle().classList.remove("active");
  navCircle.children[index].classList.add("active");
 
})


