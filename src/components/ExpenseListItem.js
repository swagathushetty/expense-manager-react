import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from'react-redux'
import moment from 'moment'
import numeral from 'numeral'
numeral.locale('inr');

//before we used props as argument
//we did props.expenses.amount etc
export const ExpenseListItem=({id,description,amount,createdAt})=>{
    return (
        <div>
        <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
        </Link>
           <p>
            {numeral(amount/100).format('$0,0.00')}
           -
           {moment(createdAt).format('MMMM Do,YYYY')}
           </p>
        </div>
    )
}

export default connect()(ExpenseListItem)

numeral.register('locale', 'inr', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: '₹'
    }
});
