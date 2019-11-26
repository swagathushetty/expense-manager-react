import React from 'react'
import { shallow } from 'enzyme'
import ExpenseDashBoard from '../../components/ExpenseDashBoardPage'

test('should render expense dashboard page ', () => {
    const wrapper = shallow(<ExpenseDashBoard />)
    expect(wrapper).toMatchSnapshot()
})