import {createStore} from 'redux'



const incrementCount=({incrementBy=1}={})=>{ //destructuring
    return {
        type:'INCREAMENT',
        incrementBy:incrementBy
    }
}

const decrementCount=({decrementBy=1}={})=>{
    return{
        type:'DECREMENT',
        decrementBy:decrementBy
    }
}

const resetCount=()=>{
    return{
        type:'RESET'
    }
}

const setCount=()=>{
    return {
        type:'SET',
        count: 101

    }
}

//this is a reducer
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREAMENT':

            //if we have provided increment by then use that value
            //otherwise increment by 1
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count: state.count - decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }

}
 
const store=createStore(countReducer)

const unsubscribe=store.subscribe(()=>{
    console.log(store.getState())
})


// store.dispatch({
//     type: 'INCREAMENT',   
//     incrementBy:5
// })
store.dispatch(incrementCount({incrementBy:5}))

store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({decrementBy:10}))

store.dispatch(setCount())

