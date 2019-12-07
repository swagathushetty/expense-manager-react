import React from 'react'
import {shallow} from 'enzyme'
import {AddExpensePage} from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let startAddExpense,history,wrapper;


//to avoid reusing the below three lines we are using beforeEach
beforeEach(()=>{
    startAddExpense = jest.fn()
     history = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />)
})

test('should render AddExpensePage correctly',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(wrapper).toMatchSnapshot();
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1])
})
