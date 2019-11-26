import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from'react-redux'
import {removeExpense} from '../actions/expenses'

//before we used props as argument
//we did props.expenses.amount etc
export const ExpenseListItem=({id,description,amount,createdAt})=>{
    return (
        <div>
        <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
        </Link>
           <p>{amount}-{createdAt}</p>
        </div>
    )
}

export default connect()(ExpenseListItem)