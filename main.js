const carousel = document.querySelector(".carousel");
const back = document.querySelector("#back");
const forward = document.querySelector("#forward");

const cards = carousel.querySelectorAll(".card");

let index = 0;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mod(a, b) {
  let res = a % b;
  if (res < 0) {
    return b + a;
  }

  return res;
}

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.style.zIndex = cards.length - i - 1;
  card.style.rotate = `${Math.random() * 6 - 3}deg`;
}

let debounce = true;

async function discard() {
  if (!debounce) {
    return;
  }
  debounce = false;

  cards[index].style.transform = "translateX(-300px)";
  await delay(200);

  for (let i = 0; i < cards.length; i++) {
    if (i != index) {
      cards[i].style.zIndex = parseInt(cards[i].style.zIndex) + 1;
    } else {
      cards[i].style.zIndex = 0;
    }
  }

  cards[index].style.transform = "translateX(0px)";
  await delay(200);

  index = mod(index + 1, cards.length);
  debounce = true;
}

async function retrieve() {
  if (!debounce) {
    return;
  }
  debounce = false;

  index = mod(index - 1, cards.length);
  cards[index].style.transform = "translateX(300px)";
  await delay(200);

  for (let i = 0; i < cards.length; i++) {
    if (i != index) {
      cards[i].style.zIndex = parseInt(cards[i].style.zIndex) - 1;
    } else {
      console.log("chick");
      cards[i].style.zIndex = cards.length - 1;
    }
  }

  cards[index].style.transform = "translateX(0px)";

  await delay(200);

  debounce = true;
}

forward.addEventListener("click", () => discard());
back.addEventListener("click", () => retrieve());
