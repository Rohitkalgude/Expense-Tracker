const BalanceEl = document.getElementById("balance");
const Income = document.getElementById("income-amount");
const Expence = document.getElementById("expence-amount");
const Tranctionlist = document.getElementById("tranction-list");
const Tranctionform = document.getElementById("tranction-form");
const Description = document.getElementById("description");
const Amount = document.getElementById("amount");

let Tranctions = JSON.parse(localStorage.getItem("Tranctions")) || [];

Tranctionform.addEventListener("submit", addTranctions);

function addTranctions(e) {
  e.preventDefault();

  const description = Description.value.trim();
  const amount = parseFloat(Amount.value);

  console.log(typeof amount);

  Tranctions.push({
    id: Date.now(),
    description,
    amount,
  });

  localStorage.setItem("Tranctions", JSON.stringify(Tranctions));

  updateTranctionsList();
  updateSummary();
  Tranctionform.reset();
}

function updateTranctionsList() {
  Tranctionlist.innerHTML = "";

  const sortedTranctions = [...Tranctions].reverse();

  sortedTranctions.forEach((tranction) => {
    const listItem = CreateTranctions(tranction);
    Tranctionlist.appendChild(listItem);
  });
}

function CreateTranctions(tranction) {
  const li = document.createElement("li");
  li.classList.add("tranction");
  li.classList.add(tranction.amount > 0 ? "Income" : "Expence");
  li.innerHTML = `
      <span>${tranction.description}</span>
    <span>
      ${tranction.amount}
      <button class="delete-btn" onclick="deleteTransaction(${tranction.id})">x</button>
    </span>
  `;

  return li;
}

function updateSummary() {
  const balance = Tranctions.reduce((acc, tranction) => acc + tranction.amount, 0);
  const income = Tranctions.filter(tranction => tranction.amount > 0).reduce((acc, tranction) => acc + tranction.amount, 0);
  const expence = Tranctions.filter(tranction => tranction.amount < 0).reduce((acc, tranction) => acc + tranction.amount, 0)


  BalanceEl.textContent = formatCurrency[balance];
  Income.textContent = formatCurrency[income];
  Expence.textContent = formatCurrency[expence];
}

function deleteTransaction(id) {
  Tranctions = Tranctions.filter((tranction) => tranction.id !== id);
  localStorage.setItem("Tranctions", JSON.stringify(Tranctions));
  updateTranctionsList();
  updateSummary();
}


function formatCurrency(number){

}