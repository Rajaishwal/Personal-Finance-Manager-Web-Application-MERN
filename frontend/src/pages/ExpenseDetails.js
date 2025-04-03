import React from 'react'

function ExpenseDetails({ incomeAmt, expenseAmt }) {

    // console.log('incomeAmt, expenseAmt', incomeAmt, expenseAmt)
  return (
    <div>
      <div className='balance'>
        Your Balance is: {incomeAmt - expenseAmt}
      </div>

      <div className='amounts-container'>
        <h3>Income</h3>
        <span className='income-amount'>{incomeAmt}</span>

        <h3>Expense</h3>
        <span className='expense-amount'>{expenseAmt}</span>
      </div>
    </div>
  )
}

export default ExpenseDetails
