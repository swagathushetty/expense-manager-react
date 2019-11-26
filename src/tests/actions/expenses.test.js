import {addExpense,removeExpense,editExpense} from '../../actions/expenses'


test('should setup remove expense remove action object',()=>{
    const action=removeExpense({id:'124abc'})
    expect(action).toEqual({  //for objects/array use toEqual
        type:'REMOVE_EXPENSE',
        id:'124abc'
    })
})


test('should set up edit expense action object ',()=>{
    const action=editExpense('12dsa',{note:'new not value'})
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:'12dsa',
        updates:{
            note:'new not value'
        }
    })
})

test('should set up add expense action object with provided values',()=>{
    const expenseData={
        description:'rent',
        amount:109500,
        createdAt:10000,
        note:'last month rent'
    }
    const action=addExpense(expenseData)
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String) //since id is dynammic we add this
        }
    })
})

test('should setup add expense object with default values',()=>{
    const action=addExpense()
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:{
        id:expect.any(String),
        description : '',
        note :'',
        amount : 0,
        createdAt : 0
    }})
})