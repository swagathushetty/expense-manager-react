import moment from 'moment'

//get visble expense
const getVisibleExpense = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment=moment(expense.createdAt)

        //returns true or false
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const startDateMatch=startDate ?startDate.isSameOrBefore(createdAtMoment,'day'):true;

        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        //figure out if expenses.description as the text variable string inside of it
        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1 //1 means a comes first,-1 ,means last
        }
        if (sortBy == 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
} 

export default getVisibleExpense

