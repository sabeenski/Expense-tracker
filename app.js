// selector
const inputNumber = document.querySelector('.transaction-amount');
const inputDesc = document.querySelector('.transaction-name');
const form = document.querySelector('.form');
const historyContainer = document.querySelector('.history-container');
const historyList = document.querySelector('.history-list');
const addMoney = document.querySelector('.money-plus');
const subMoney = document.querySelector('.money-minus');
const balance = document.querySelector('.balance');
const moneyPlus = document.querySelector('.money-plus');
const moneyMinus = document.querySelector('.money-minus');

// addEventListener
form.addEventListener('submit', submitForm);
historyList.addEventListener('click', deleteList);

// function
function submitForm() {
  let income, expense;
  // for calculation in income/expense container
  if (addMoney.innerText === '0€') {
    income = 0;
  } else {
    income = parseInt(addMoney.innerText);
  }
  if (subMoney.innerText === '0€') {
    expense = 0;
  } else {
    expense = parseInt(subMoney.innerText);
  }
  const addDiv = document.createElement('div');
  const historyItem = document.createElement('li');
  const historyItemDesc = document.createElement('span');
  const historyItemAmount = document.createElement('span');

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.classList.add('trash-btn');

  addDiv.appendChild(historyItem);
  addDiv.classList.add('list');
  historyItem.appendChild(historyItemDesc);
  historyItem.appendChild(historyItemAmount);
  historyItem.appendChild(deleteBtn);

  historyItemDesc.innerText = inputDesc.value;
  historyList.appendChild(addDiv);

  // Display history container only if there is a transaction, display:none by default
  historyContainer.style.display = 'block';

  if (parseInt(inputNumber.value) > 0) {
    historyItem.classList.add('income');
    historyItemAmount.innerText = `+${inputNumber.value}`;

    // calculate in the income table
    income = `${income + parseInt(inputNumber.value)}`;
    addMoney.innerText = `${income}.00 €`;
  } else {
    historyItem.classList.add('expense');
    historyItemAmount.innerText = inputNumber.value;

    // calculate in the expense table
    expense = `${expense - parseInt(inputNumber.value)}`;
    subMoney.innerText = `${expense}.00 €`;
  }

  // Finally update the total balance

  balance.innerText = `${income - expense}.00 €`;

  inputNumber.value = '';
  inputDesc.value = '';
}

function deleteList(e) {
  // 1. Define the item that is clicked, i.e trash button which wraps the trash icon
  const item = e.target;
  // console.log('item', item);

  // 1.1. Find the amount that is in that list
  var amount = item.parentElement.children[1].innerText;
  amount = parseInt(amount);
  // console.log('amount', parseInt(amount));

  // 2. Find what is the current total income so we can minus the item in income that is deleted
  const minusInIncome = parseInt(moneyPlus.innerText);
  // console.log('minusInIncome::', minusInIncome);

  // 3. Similarly, find what is the current total expense to minus the deleted the item
  const minusInExpense = parseInt(moneyMinus.innerText);
  // console.log('minusInexp', minusInExpense);

  // 4. If the item has a trash-btn classlist .. useful when there are many icons in the list
  // console.log(item.classList);

  if (item.classList[0] === 'trash-btn') {
    // Calculate as needeed to update the income/expense container
    if (amount > 0) {
      moneyPlus.innerText = `${minusInIncome - amount}.00€`;
    } else {
      moneyMinus.innerText = `${minusInExpense + amount}.00€`;
    }

    // Finally remove that list and also update the total balance
    console.log('moneyPls', moneyPlus);
    console.log('moneymINUS', moneyMinus);

    balance.innerText = `${
      parseInt(moneyPlus.innerText) - parseInt(moneyMinus.innerText)
    }.00 €`;
    item.parentElement.remove();
  }
}
