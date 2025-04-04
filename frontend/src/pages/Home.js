import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerform from './ExpenseTrackerform';
import ExpenseDetails from './ExpenseDetails';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [incomeAmt, setIncomeAmt] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    useEffect(() => {
        const amount = expenses.map((item) => item.amount);
        console.log(amount);

        const income = amount.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);
        console.log('income : ', income);

        //-5000 * -1 = 5
        const exp = amount.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
        console.log('exp : ', exp);

        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if(response.status === 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body:JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if(response.status === 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
            handleSuccess(result.message); //TODO: handle success
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchExpenses()
    }, [])

    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/${expenseId}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
            const response = await fetch(url, headers);
            if(response.status === 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
            handleSuccess(result.message); //TODO: handle success
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div>
            <div className='user-section'>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
            <ExpenseTrackerform addExpenses={addExpenses}/>
            <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense} />
            <ToastContainer />
        </div>
    )
}

export default Home