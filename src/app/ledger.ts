import lease from './lease'
import line from './line'
import logger from '../Utils/logger'
import moment from 'moment'

/**
 * This class keeps track of ledgers of each lease
 */
class Ledger{
    private currentLease:lease //respective lease
    private remaining:number //remaining amount for internal iterators

    constructor(currentLease:lease){
        this.currentLease = currentLease
        this.remaining = currentLease.getTotalAmount()
        logger.info('created new ledger')
    }
    /**
     * generator function for weekly and fortnightly
     * @param offset 6 for weekly, 13 for fortnightly. offset between start and end
     * @param periodAmount Full amount for given period
     */
    private *getGenericLedger(offset:number, periodAmount:number):IterableIterator<line>{
        var start = moment(this.currentLease.getStartDate())
        var end = moment(start).add(offset,'days')

        while (this.remaining > periodAmount){
            //yield line object for the iterator
            yield new line(start.toDate(),end.toDate(), periodAmount)

            start = start.add(1, 'days')
            end = start.add(offset, 'days')
            this.remaining -= periodAmount
        }
        //yielding the remaining balance
        yield new line(start.toDate(), this.currentLease.getEndDate(), this.remaining)
    }

    /**
     * adjesting the dates for invalid dates such as 31- feb
     * @param date 
     * @param month 
     */
    private adjestDate(date:moment.Moment, month:number){
        //reduce one day if day is not available
        while (date.month()!= month){
            date = date.add(-1, 'days')
        }
        return date
    }

    /**
     * This public method returns the weekly ledger as a iterator
     */
    public getWeeklyLedger():IterableIterator<line>{
        var weeklyAmount = this.currentLease.getWeeklyAmount()
        return this.getGenericLedger(6, weeklyAmount)
    }

    /**
     * this public method returns the fortnight ledger as a iterator
     */
    public getFortnightLedger():IterableIterator<line>{
        var weeklyAmount = this.currentLease.getFortnightlyAmount()
        return this.getGenericLedger(13, weeklyAmount)
    }
    

    /**
     * This generator method returns monthly ledger iterator
     */
    public *getMonthlyLedger():IterableIterator<line>{
        var periodAmount = this.currentLease.getMonthlyAmount()
        var monthCount = 0

        while (this.remaining > periodAmount){
            var start = moment(this.currentLease.getStartDate()).add(monthCount, 'months')
            var end = moment(this.currentLease.getStartDate()).add(monthCount + 1, 'months')

            //perform days adjestment
            //fix invalid dates and end date as one day before the next starting date
            start = this.adjestDate(start, (this.currentLease.getStartDate().getMonth() + monthCount)%12)
            end = this.adjestDate(end, 
                (this.currentLease.getStartDate().getMonth() + monthCount + 1)%12)
                .add(-1, 'days')

            yield new line(start.toDate(),end.toDate(), periodAmount)
            this.remaining -= periodAmount
            monthCount += 1
        }


        var start = moment(this.currentLease.getStartDate()).add(monthCount, 'months')
        var end = moment(this.currentLease.getStartDate()).add(monthCount + 1, 'months')

        yield new line(start.toDate(), this.currentLease.getEndDate(), this.remaining)
    }
    
}

export default Ledger