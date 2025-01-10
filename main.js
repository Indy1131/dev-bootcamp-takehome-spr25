const carousel = document.querySelector(".carousel");

const back = carousel.querySelector("#back");
const forward = carousel.querySelector("#forward");

const cards = carousel.querySelectorAll(".card");

let index = 0;
let flipped = false;

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

  card.addEventListener("click", () => {
    if (card !== cards[index]) {
      return;
    }

    flip();
  });
}
// controls.style.zIndex = cards.length;

let debounce = true;

async function discard() {
  if (!debounce) {
    return;
  }
  debounce = false;

  flipped = false;

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

  if (flipped) {
    cards[index].style.transform = "";
    flipped = false;
    await delay(200);
  }

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

async function flip() {
  if (!debounce) {
    return;
  }

  debounce = true;

  if (!flipped) {
    cards[index].style.transform = "rotateY(180deg)";
  } else {
    cards[index].style.transform = "";
  }

  await delay(200);

  flipped = !flipped;

  debounce = true;
}

forward.addEventListener("click", () => discard());
back.addEventListener("click", () => retrieve());
