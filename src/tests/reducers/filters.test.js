import filtersReducer from '../../reducers/filters'
import moment from 'moment'
import { end } from 'worker-farm'


test('should set up default filter values',()=>{
    const state=filtersReducer(undefined,{type:'@@INIT'})

    expect(state).toEqual({
        text:'',
        sortBy:'date',
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month')
    })
})

test('should set to sortBy to amount',()=>{
    const state=filtersReducer(undefined,{type:'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date',()=>{
    const currentState={
        text:'',
        startDate:'',
        endDate:'',
        sortBy:'amount'

    }
    const action={type:'SORT_BY_DATE'};
    const state=filtersReducer(currentState,action)
    expect(state.sortBy).toBe('date')
})

test('should set text filter',()=>{
    
    const action = { 
        type: 'SET_TEXT_FILTER',
        text:'coffe'
    };
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe('coffe')
})

test('should set startDate filter', () => {
    const startDate=moment()
    const action = {
        type: 'SET_START_DATE',
        date:startDate
    };
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toEqual(startDate)
})

test('should set endDate filter', () => {
    const endDate = moment()
    const action = {
        type: 'SET_END_DATE',
        date: endDate
    };
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toEqual(endDate)
})