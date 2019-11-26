import logger from "../Utils/logger"

/**
 * This class keep track of leases objects. 
 */
class Lease{
    private startDate: Date
    private endDate: Date
    private freqency: string
    private timezone: string
    private numberOfDays:number
    private weeklyAmount: number

    private one_day = 1000 * 60 * 60 * 24 

    /**
     * Create the lease object with all the required inputs
     * @param start start date
     * @param end lease end date
     * @param frequency lease frequency 'WEEKLY','FORTNIGHTLY', 'MONTHLY'
     * @param weeklyAmount weekly amount of the lease
     * @param timezone timezone of the property
     */
    constructor(start:string, end:string, frequency:string, weeklyAmount:number, timezone:string){
        this.startDate = new Date(start)
        this.endDate = new Date(end)
        this.freqency = frequency
        this.timezone = timezone
        this.numberOfDays = Math.round((this.endDate.getTime() - this.startDate.getTime()) / this.one_day) + 1
        this.weeklyAmount = weeklyAmount

        logger.info("Lease object created from" + this.startDate + " to " + this.endDate)
        
    }

    /**
     * return total lease number of days
     */
    public getNumberOfDays(){
        logger.info("returned Number of days" + this.numberOfDays)
        return this.numberOfDays
    }

    /**
     * return the start date as date object
     */
    public getStartDate(){
        logger.info('Returned start date' + this.startDate)
        return this.startDate
    }

    /**
     * returns the end date as date object
     */
    public getEndDate(){
        logger.info('returned end date' + this.endDate)
        return this.endDate
    }

    /**
     * returns the payment frequency
     */
    public getFrequency(){
        logger.info('returned payment frequency' + this.freqency)
        return this.freqency
    }

    /**
     * returns the number of weeks including last week
     */
    public getNumberOfWeeks(){
        var numberOfWeeks = Math.ceil(this.numberOfDays/7) //get ceil for accomodate partial weeks
        logger.info('returned number of weeks' + numberOfWeeks)
        return numberOfWeeks
    }

    /**
     * returns the total number of months including partial months
     */
    public getNumberOfMonths(){
        var numberOfMonths = Math.ceil(this.getNumberOfDays()/365*12)
        logger.info('returning number of months ' + numberOfMonths)
        return numberOfMonths
    }

    /**
     * returns total lease amount for the whole duration
     */
    public getTotalAmount(){
        var totalAmount = this.numberOfDays/7 * this.weeklyAmount
        logger.info('number of days '+ this.numberOfDays)
        logger.info('returned total amount' + totalAmount)
        return totalAmount
    }

    /**
     * returns the timezone
     */
    public getTimezone(){
        logger.info("returned timezone" + this.timezone)
        return this.timezone
    }

    /**
     * returns the weekly amount of the lease
     */
    public getWeeklyAmount(){
        logger.info('returning weekly amount '+ this.weeklyAmount)
        return this.weeklyAmount
    }

    /**
     * returns the fortinghtly amount of the lease
     */
    public getFortnightlyAmount(){
        var fortnightlyAmount = 2 * this.weeklyAmount
        logger.info('returning fortnightly amount ' + fortnightlyAmount)
        return fortnightlyAmount
    }

    /**
     * returns the montly amount of the lease
     */
    public getMonthlyAmount(){
        logger.info('returning monthly amount')
        var monthlyAmount = Math.floor(this.getTotalAmount()/this.getNumberOfMonths())
        return monthlyAmount
    }

}

export default Lease