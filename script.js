const tbody = document.getElementById('transaction-table-body');
const totalEl = document.getElementById('total');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

let transactions = [];

function addTransaction(isExpense) {
  const desc = document.getElementById('description').value;
  const rawAmount = parseFloat(document.getElementById('amount').value);
  const cat = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  if (desc === '' || isNaN(rawAmount) || date === '' || cat === '') return;

  const amt = isExpense ? -Math.abs(rawAmount) : Math.abs(rawAmount);
  const type = isExpense ? 'Expense' : 'Income';

  const transaction = {
    id: Date.now(),
    description: desc,
    amount: amt,
    category: cat,
    date,
    type
  };

  transactions.push(transaction);
  updateUI();
  document.getElementById('transaction-form').reset();
}

function updateUI() {
  tbody.innerHTML = '';
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.description}</td>
      <td>${t.category}</td>
      <td>₹${Math.abs(t.amount)}</td>
      <td class="${t.type === 'Income' ? 'income' : 'expense'}">${t.type}</td>
      <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">✖</button></td>
    `;
    tbody.appendChild(row);

    if (t.amount >= 0) income += t.amount;
    else expense += t.amount;
  });

  totalEl.innerText = (income + expense).toFixed(2);
  incomeEl.innerText = income.toFixed(2);
  expenseEl.innerText = Math.abs(expense).toFixed(2);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}
