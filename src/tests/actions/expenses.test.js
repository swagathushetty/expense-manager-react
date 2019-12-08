import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {startAddExpense,addExpense,removeExpense,editExpense,setExpenses,startSetExpenses} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore=configureMockStore([thunk])

beforeEach((done)=>{
    const expenseData={}
    expenses.forEach(({id,description,note,amount,createdAt})=>{
        expenseData[id]={description,note,amount,createdAt}
    })
    database.ref('expenses').set(expenseData).then(()=>done())
})

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
    const action=addExpense(expenses[2])
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:expenses[2]
    })
})

test('should add expense to database adn store',()=>{
    const store = createMockStore({})

    const expenseData={
        description:'mouse',
        amount:3000,
        note:'this one is better',
        createdAt:1000
    }

    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions=store.getActions()
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
     }).then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData)
        })
       
    })


    test('should set up expense action object with data',()=>{
        const action=setExpenses(expenses)
        expect(action).toEqual({
            type:'SET_EXPENSES',
            expenses:expenses
        })
    })

    //this is asychornous
    test('should fetch the expenses from firebase',(done)=>{
        const store=createMockStore({})
        store.dispatch(startSetExpenses).then(()=>{
            const actions=store.getActions()
            expect(actions[0]).toEqual({
                type:'SET_EXPENSES',
                expenses:expenses
            })
            done()

        })
    })

