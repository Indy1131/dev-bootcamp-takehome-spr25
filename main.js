const carousel = document.querySelector(".carousel");
const back = document.querySelector("#back");
const forward = document.querySelector("#forward");

const cards = carousel.querySelectorAll(".card");
let index = 0;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.style.zIndex = cards.length - i;
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
      cards[i].style.zIndex += 1;
    } else {
      cards[i].style.zIndex = 0;
    }
  }

  cards[index].style.transform = "translateX(0px)";
  await delay(200);

  index = (index + 1) % cards.length;
  debounce = true;
}

async function retrieve() {
  if (!debounce) {
    return;
  }

  debounce = false;
  cards[index].style.transform = "translateX(300px)";
  await delay(200);

  for (let i = 0; i < cards.length; i++) {
    if (i != index) {
      cards[i].style.zIndex += 1;
    } else {
      cards[i].style.zIndex = 0;
    }
  }

  cards[index].style.transform = "translateX(0px)";
  await delay(200);

  index = (index + 1) % cards.length;
  debounce = true;
}

forward.addEventListener("click", () => discard());
back.addEventListener("click", () => retrieve());
