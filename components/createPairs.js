import { showAlert } from "./showAlert.js";

function shufleArr(array) {
  let shufleArr = [];
  while (true) {
    let a = array[Math.floor(Math.random() * array.length)];
    if (!shufleArr.includes(a)) {
      shufleArr.push(a);
    }
    if (shufleArr.length === array.length) {
      return shufleArr;
    }
  }
}

export const createPairs = (parent) => {
  const section = document.createElement("section");
  section.className = "card section-offset";

  const container = document.createElement("div");
  container.className = "container card__container";

  const btnReturn = document.createElement("button");
  btnReturn.className = "card__return";
  btnReturn.setAttribute("aria-label", "Возврат к категориям");

  const btnItem = document.createElement("button");
  btnItem.className = "card__item";
  btnItem.innerHTML = `
    <span class="card__front"></span>
          <span class="card__back"></span>
    `;
  container.append(btnReturn, btnItem);
  section.append(container);

  function flipCard() {
   
    btnItem.classList.add("card__item_flipped");
    btnItem.removeEventListener("click", flipCard);
    setTimeout(() => {
      btnItem.classList.remove("card__item_flipped");
      setTimeout(() => {
        btnItem.index++;
        if (btnItem.index === dataCards.length) {
          btnItem.querySelector(".card__front").textContent = "the end";
          showAlert("Вернемся к категориям");

          setTimeout(() => {
            btnReturn.click();
          }, 2000);
          return;
        }
        btnItem.querySelector(".card__front").textContent = dataCards[btnItem.index][0];
        btnItem.querySelector(".card__back").textContent = dataCards[btnItem.index][1];
        btnItem.addEventListener("click", flipCard);
      }, 100);
    }, 1000);
  }

  let dataCards = []

  function cardController(data) {
    dataCards = [...data]
    btnItem.index = 0
    btnItem.querySelector(".card__front").textContent = data[btnItem.index][0];
    btnItem.querySelector(".card__back").textContent = data[btnItem.index][1];

    btnItem.addEventListener("click", flipCard);
  }

  function mount(pair) {
    cardController(shufleArr(pair));
    parent.append(section);
  }
  function unmount() {
    section.remove();
    btnItem.removeEventListener("click", flipCard);
  }
  return { mount, unmount, btnReturn };
};
