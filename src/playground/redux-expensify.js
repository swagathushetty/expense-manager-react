import {createStore,combineReducers} from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => {
    return{
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
           }
     };
}

//REMOVE_EXPENSE
const removeExpense=({id}={})=>{
    return {
        type:'REMOVE_EXPENSE',
        id
    }
}

//EDIT_EXPENSE
const editExpense=(id,updates)=>{
    return{
        type:"EDIT_EXPENSE",
        id,
        updates
    }
}

//SET_TEXT_FILTER
const setTextFilter=(text)=>{
    return{
        type:'SET_TEXT_FILTER',
        text
    }
}

//SORT_BY_AMOUNT
const sortByAmount=()=>{
    return{
        type:'SORT_BY_AMOUNT'
    }
}

//SORT_BY_DATE
const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE',
        
    }
}

//SET_START_DATE
const setStartDate=(date=undefined)=>{
    return{
        type:'SET_START_DATE',
        date
    }
}


//SET_END_DATE
const setEndDate = (date = undefined) => {
    return {
        type: 'SET_END_DATE',
        date
    }
}


//expenses reducer
const expensesReducerDefaultState=[]
const expensesReducer=(state=expensesReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, //spread operator
                action.expense
            ]; //old syntax state.concat(action.expense)
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>{
                return id!==action.id
            })
        case 'EDIT_EXPENSE':
                return state.map((expense)=>{
                    if(expense.id===action.id){
                      return{
                          ...expense,
                          ...action.updates
                      } 
                    }else{
                        return expense
                    }
                })
        default:
            return state

    }
}

//filters reducer
const filterReducerDefaultState={
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
}
const filterReducer=(state=filterReducerDefaultState,action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy:'amount'
            }    
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy:'date'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate:action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }                     
        default:
            return state;
    }
}

//get visble expense
const getVisibleExpense=(expenses,{text,sortBy,startDate,endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatch=typeof startDate!=='number'||expense.createdAt>=startDate
        const endDateMatch=typeof endDate!=='number'||expense.createdAt<=endDate
        const textMatch=expense.description.toLowerCase().includes(text.toLowerCase())
    
        //figure out if expenses.description as the text variable string inside of it
        return startDateMatch && endDateMatch && textMatch
    }).sort((a,b)=>{
        if(sortBy==='date'){
            return a.createdAt<b.createdAt?1:-1 //1 means a comes first,-1 ,means last
        }
        if(sortBy=='amount'){
            return a.amount<b.amount?1:-1
        }
    })
}

//store creation
const store=createStore(
    combineReducers({
        expenses:expensesReducer,
        filters:filterReducer
    })
    )

store.subscribe(()=>{
    const state=store.getState()
    const VisibleExpenses=getVisibleExpense(state.expenses,state.filters)
    console.log(VisibleExpenses)
})    

//this is passed to both reducers however we only require one i.e expenses
const expenseOne=store.dispatch(addExpense({description:'rent',amount:100,createdAt:-21000}))
const expenseTwo=store.dispatch(addExpense({ description: 'coffe', amount: 243,createdAt:-1000 }))

// //removing the first expense
// store.dispatch(removeExpense({id:expenseOne.expense.id}))

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}))

//filter tasks with words matching the argument
// store.dispatch(setTextFilter('ffe'))

store.dispatch(sortByAmount()) //amount
// store.dispatch(sortByDate())   //date

// store.dispatch(setStartDate(-2000))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))

const demoState={
    expenses:[{
        id:'sadaasf',
        description:'january rent',
        note:'this was the final payment for the address',
        amount:54500,
        createdAt:0
    }],
    filters:{
        text:'rent',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined
    }
}

