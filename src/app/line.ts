class Line{
    public start: Date
    public end: Date
    public amount: number

    constructor(start:Date, end:Date, amount:number){
        this.start = start
        this.end = end
        this.amount = amount
    }
}

export default Line