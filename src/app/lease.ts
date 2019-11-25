import logger from "../Utils/logger"
class Lease{
    private startDate: Date
    private endDate: Date
    private freqency: string
    private timezone: string
    private numberOfDays:number
    private weeklyAmount: number

    private one_day = 1000 * 60 * 60 * 24 

    constructor(start:string, end:string, frequency:string, weeklyAmount:number, timezone:string){
        this.startDate = new Date(start)
        this.endDate = new Date(end)
        this.freqency = frequency
        this.timezone = timezone
        this.numberOfDays = Math.round((this.endDate.getTime() - this.startDate.getTime()) / this.one_day) + 1
        this.weeklyAmount = weeklyAmount

        logger.info("Lease object created from" + this.startDate + " to " + this.endDate)
        
    }

    public getNumberOfDays(){
        logger.info("returned Number of days" + this.numberOfDays)
        return this.numberOfDays
    }

    public getStartDate(){
        logger.info('Returned start date' + this.startDate)
        return this.startDate
    }

    public getEndDate(){
        logger.info('returned end date' + this.endDate)
        return this.endDate
    }

    public getFrequency(){
        logger.info('returned payment frequency' + this.freqency)
        return this.freqency
    }

    public getNumberOfWeeks(){
        var numberOfWeeks = Math.ceil(this.numberOfDays/7)
        logger.info('returned number of weeks' + numberOfWeeks)
        return numberOfWeeks
    }

    public getNumberOfMonths(){
        var numberOfMonths = Math.ceil(this.getNumberOfDays()/365*12)
        logger.info('returning number of months ' + numberOfMonths)
        return numberOfMonths
    }

    public getTotalAmount(){
        var totalAmount = this.numberOfDays/7 * this.weeklyAmount
        logger.info('number of days '+ this.numberOfDays)
        logger.info('returned total amount' + totalAmount)
        return totalAmount
    }

    public getTimezone(){
        logger.info("returned timezone" + this.timezone)
        return this.timezone
    }

    public getWeeklyAmount(){
        logger.info('returning weekly amount '+ this.weeklyAmount)
        return this.weeklyAmount
    }

    public getFortnightlyAmount(){
        var fortnightlyAmount = 2 * this.weeklyAmount
        logger.info('returning fortnightly amount ' + fortnightlyAmount)
        return fortnightlyAmount
    }

    public getMonthlyAmount(){
        logger.info('returning monthly amount')
        var monthlyAmount = Math.floor(this.getTotalAmount()/this.getNumberOfMonths())
        return monthlyAmount
    }

}

export default Lease