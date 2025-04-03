
const router = require('express').Router();
const { fetchExpenses, addExpenes, deleteExpenses } = require('../Controllers/ExpenseController');

// const router = require('express').Router();

// fetch all the expenses of user based on user_id
router.get('/', fetchExpenses);

//add Expense
router.post('/', addExpenes);

//add delete
router.delete('/:expenseId', deleteExpenses);

module.exports = router;