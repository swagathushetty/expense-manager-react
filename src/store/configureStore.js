import { createStore,combineReducers,applyMiddleware, compose } from 'redux'
import expensesReducer from '../reducers/expenses'
import filterReducer from '../reducers/filters'
import thunk from 'redux-thunk'


//we are using this line as using middleware makes the default window.__ ....__() useless
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export default()=>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        
        //this line is for redux dev tools
        //since we are using thunk middleware below line will not work
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}


