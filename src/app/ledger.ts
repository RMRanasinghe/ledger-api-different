import lease from './lease'
import line from './line'
import logger from '../Utils/logger'
import moment from 'moment'

class Ledger{
    private currentLease:lease
    private remaining:number
    private day = 60 * 60 * 24 * 1000

    constructor(currentLease:lease){
        this.currentLease = currentLease
        this.remaining = currentLease.getTotalAmount()
    }

    private *getGenericLedger(offset:number, periodAmount:number):IterableIterator<line>{
        var start = moment(this.currentLease.getStartDate())
        var end = moment(start).add(offset,'days')

        while (this.remaining > periodAmount){
            yield new line(start.toDate(),end.toDate(), periodAmount)

            start = start.add(1, 'days')
            end = start.add(offset, 'days')
            this.remaining -= periodAmount
        }

        yield new line(start.toDate(), this.currentLease.getEndDate(), this.remaining)
    }

    private adjestDate(date:moment.Moment, month:number){
        while (date.month()!= month){
            date = date.add(-1, 'days')
        }
        return date
    }

    public getWeeklyLedger():IterableIterator<line>{
        var weeklyAmount = this.currentLease.getWeeklyAmount()
        return this.getGenericLedger(6, weeklyAmount)
    }

    public getFortnightLedger():IterableIterator<line>{
        var weeklyAmount = this.currentLease.getFortnightlyAmount()
        return this.getGenericLedger(13, weeklyAmount)
    }
    

    public *getMonthlyLedger():IterableIterator<line>{
        var periodAmount = this.currentLease.getMonthlyAmount()
        var monthCount = 0

        while (this.remaining > periodAmount){
            var start = moment(this.currentLease.getStartDate()).add(monthCount, 'months')
            var end = moment(this.currentLease.getStartDate()).add(monthCount + 1, 'months')

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