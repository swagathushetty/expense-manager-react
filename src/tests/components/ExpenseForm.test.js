import React from 'react'
import {shallow} from'enzyme'
import moment from 'moment'
import ExpenseForm  from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'


test('should render ExpenseForm',()=>{
    const wrapper=shallow(<ExpenseForm/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission',()=>{
    const wrapper = shallow(<ExpenseForm />)
   
    //snapshot before form is submitted
    expect(wrapper).toMatchSnapshot()

    //simulate form submission
    wrapper.find('form').simulate('submit',{
        preventDefault:()=>{}
    })

    //default error string length is 0
    //if we dont provide preventDefault an error will be produced
    expect(wrapper.state('error').length).toBeGreaterThan(0)

    //snapshot after form is submitted
    expect(wrapper).toMatchSnapshot()
})

//tests for checking onchange of input and textarea tag

//we are testing onDescriptionChange function in input tag
//returns state description:description
test('should set description on input change',()=>{
    const value='new description'
    const wrapper=shallow(<ExpenseForm/>)
    wrapper.find('input').at(0).simulate('change',{
        target:{value:value}
    })
    expect(wrapper.state('description')).toBe(value)
})

//we are testing onNoteChange function in textarea tag
//returns state note:note
test('should set note on textarea change change', () => {
    const value = 'this is a new note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value: value }
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
    const value = '12.34'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value: value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should NOT set amount if invalid input', () => {
    const value = '12.23.2323' //invalid no
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value: value }
    })

    //if invalid input,state should remain empty
    expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid submission',()=>{
    const onSubmitSpy=jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)

    //simulate form submission
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })

    expect(wrapper.state('error')).toBe('')

    //we didnt use expenses[0] as it constains an addtional field id
    //id is not used in the onSubmit function
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })

})

test('should set new date on date change',()=>{
    const now=moment()
    const wrapper=shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set new calender focus on date change', () => {
    const focused=true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused})
    expect(wrapper.state('calendarFocused')).toEqual(focused)
})

