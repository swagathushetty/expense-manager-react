import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpenseListItem from './ExpenseListItem'


const ExpenseDasBoardPage = () => {
    return (
        <div>
            <ExpenseListFilters />
            <ExpenseList />
       </div>
    )
}

export default ExpenseDasBoardPage;
