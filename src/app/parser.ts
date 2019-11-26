import logger from "../Utils/logger";
import Lease from "./lease";
import Ledger from "./ledger";
import Line from "./line";

/**
 * This class parses the request and generate the response
 */
class Parser {
    private request: any; // this request is pre validated.
    constructor(request: Object) {
        this.request = request;
    }
    /**
     * 
     * @param callback Callback function with array or error
     */
    public getLedger(callback: (res: object[], e?: Error) => void) {
        // required feilds are tested at the validations. Do no have to do validations here.
        const lease = new Lease(this.request.start, this.request.end, this.request.frequency,
             this.request.amount, this.request.timezone); //create new lease
        //throw error if the start date is greater than end date
        if (lease.getStartDate().getTime() >= lease.getEndDate().getTime()) {
            logger.error("Bad request. Invalid start and end dates");
            callback([], new Error("Invalid start and end dates"));
        } else {
            //create new ledger
            var myLedger = new Ledger(lease);
            callback(this.createResponse(myLedger.getLedger()));
        }

    }

    /**
     * Create final array for the reponse
     * @param ledgerIter ledger iterator
     */
    private createResponse(ledgerIter: IterableIterator<Line>): object[] {
        var ledgerArray = [];
        for (const line of ledgerIter) {
            //create new object
            const lineVal = {
                Start: line.start,
                End: line.end,
                Amount: line.amount.toFixed(2)

            };
            ledgerArray.push(lineVal);
        }
        return ledgerArray;
    }
}

export default Parser;
