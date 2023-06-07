// Store categories, total budget, and expenses in arrays
let categories = [];
let totalBudget = 0;
let expenses = [];

// Function to add a new category
function addCategory() {
    const categoryNameInput = document.getElementById("category-name");
    const categoryError = document.getElementById("category-error");

    const categoryName = categoryNameInput.value.trim();

    if (categoryName === "") {
        categoryError.textContent = "Please enter a category name";
        return;
    }

    const newCategory = {
        name: categoryName
    };

    categories.push(newCategory);
    categoryNameInput.value = "";
    categoryError.textContent = "";

    updateExpenseCategoryOptions();
}

// Function to add total budget
function addTotalBudget() {
    const totalBudgetInput = document.getElementById("total-budget");
    const budgetError = document.getElementById("budget-error");

    const budgetAmount = parseFloat(totalBudgetInput.value.trim());

    if (isNaN(budgetAmount) || budgetAmount <= 0) {
        budgetError.textContent = "Please enter a valid budget";
        return;
    }

    totalBudget = budgetAmount;
    totalBudgetInput.value = "";
    budgetError.textContent = "";

    updateExpenseTable();
}

// Function to add a new expense
function addExpense() {
    const expenseDateInput = document.getElementById("expense-date");
    const expenseCategorySelect = document.getElementById("expense-category");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseError = document.getElementById("expense-error");

    const expenseDate = expenseDateInput.value.trim();
    const expenseCategoryIndex = expenseCategorySelect.selectedIndex;
    const expenseAmount = parseFloat(expenseAmountInput.value.trim());

    if (expenseDate === "") {
        expenseError.textContent = "Please select a date";
        return;
    }

    if (expenseCategoryIndex === -1) {
        expenseError.textContent = "Please select a category";
        return;
    }

    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        expenseError.textContent = "Please enter a valid amount";
        return;
    }

    if (expenseAmount > totalBudget) {
        expenseError.textContent = "Expense amount exceeds the total budget";
        return;
    }

    const expenseCategory = categories[expenseCategoryIndex].name;
    const newExpense = {
        date: expenseDate,
        category: expenseCategory,
        amount: expenseAmount
    };

    expenses.push(newExpense);
    expenseDateInput.value = "";
    expenseAmountInput.value = "";
    expenseError.textContent = "";

    updateExpenseTable();
}

// Function to update the expense category select options
function updateExpenseCategoryOptions() {
    const expenseCategorySelect = document.getElementById("expense-category");
    expenseCategorySelect.innerHTML = "";

    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement("option");
        option.text = categories[i].name;
        expenseCategorySelect.add(option);
    }
}

// Function to update the expense table
function updateExpenseTable() {
    const expenseTableBody = document.getElementById("expense-table-body");
    expenseTableBody.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const amountCell = document.createElement("td");

        categoryCell.textContent = expenses[i].category;
        amountCell.textContent = expenses[i].amount;
        dateCell.textContent = expenses[i].date;

        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        expenseTableBody.appendChild(row);
    }
}