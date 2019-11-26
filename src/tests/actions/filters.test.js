import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../../actions/filters'
import moment from 'moment'

test('should set the text filter object with text value',()=>{
    const action=setTextFilter('hello boy')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text:'hello boy'
    })
})

test('should generate text filter object by default',()=>{
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text:''
    })
})

test('should generate action object sort by date',()=>{
    const action=sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should generate action object sort by amount', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})


test('should generate set start date action object',()=>{
    const action=setStartDate(moment(0))
    expect(action).toEqual({
        type:'SET_START_DATE',
        date:moment(0)
    })
})

test('should generate set end date actiom object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })  
})