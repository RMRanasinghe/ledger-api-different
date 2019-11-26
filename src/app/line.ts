/**
 * This class create objects for each line of a ledger
 */
class Line{
    public start: Date
    public end: Date
    public amount: number
    /**
     * 
     * @param start start date object
     * @param end date object for end date
     * @param amount number for total amount for the period
     */
    constructor(start:Date, end:Date, amount:number){
        this.start = start
        this.end = end
        this.amount = amount
    }
}

export default Line