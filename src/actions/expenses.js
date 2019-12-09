import database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        expense
    }
}

export const startAddExpense=(expenseData={})=>{
    return (dispatch)=>{
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        }=expenseData

        const expense={description,note,amount,createdAt}

      return database.ref('expenses').push(expense).then((ref)=>{
            dispatch(addExpense({
                id:ref.key, //given by firebase
                ...expense
            }))
        })

    }
}

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
}

//s
export const startRemoveExpense=({id}={})=>{
    return (dispatch)=>{
        return database.ref(`expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}))
        })
    }

}

//EDIT_EXPENSE
export const editExpense = (id, updates) => {
    return {
        type: "EDIT_EXPENSE",
        id,
        updates
    }
}

//SET_EXPENSES 
export const setExpenses=(expenses)=>({
    type:'SET_EXPENSES',
    expenses:expenses
})


//fetch the data from firebas and add to redux
export const startSetExpenses=()=>{
    return (dispatch)=>{
        return database.ref('expenses').once('value').then((snapshot)=>{
            const expenses=[]

            snapshot.forEach((childSnapshot)=>{
                expenses.push({
                    id:childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpenses(expenses))
        })
    }
}