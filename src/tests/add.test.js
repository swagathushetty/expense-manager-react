const add=(a,b)=>{
    return a+b+1
}
const generateGreeting=(name)=>{
    return `Hello ${name}!`
}



test('should generate greeting from name',()=>{
    
    const result=generateGreeting('swagath')

    expect(result).toBe('Hello swagath!')
})