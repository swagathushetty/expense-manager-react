
import moment from 'moment'

//demo data to test our selector
export default  [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0 //jan1 1970
},
{
    id: '2',
    description: 'rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()//valueOf to get the value of moment() back
},
{
    id: '3',
    description: 'credit card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]
