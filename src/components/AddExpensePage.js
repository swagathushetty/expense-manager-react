import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense} from '../actions/expenses'


export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        //this is cannot be tested as addExpense is imported
        //we will abstract it
        // props.dispatch(addExpense(expense))
        this.props.startAddExpense(expense)

        //redirect to page without refrshing
        this.props.history.push('/')
    }
    render(){
        return (
            <div>
            <h1>Add expense</h1>
            <ExpenseForm
                onSubmit={this.onSubmit}
            />
            </div>
        )
    }
}


//we are doing this to make it testable
//we are sepearting the dispatch from components
//below works with dispatch
const mapDispatchToProps=(dispatch)=>{
    return{
        startAddExpense:(expense)=>dispatch(startAddExpense(expense))
    }

}

export default connect(undefined,mapDispatchToProps)(AddExpensePage)