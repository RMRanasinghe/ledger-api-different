import logger from "../Utils/logger";
import Lease from "./lease";
import Ledger from "./ledger";
import Line from "./line";

class Parser {
    private request: any; // this request is pre validated.
    constructor(request: Object) {
        this.request = request;
    }
    public getLedger(callback: (res: object[], e?: Error) => void) {
        // required feilds are tested at the validations. Do no have to do validations here.
        const lease = new Lease(this.request.start, this.request.end, this.request.frequency,
             this.request.amount, this.request.timezone);
        if (lease.getStartDate().getTime() >= lease.getEndDate().getTime()) {
            logger.error("Bad request. Invalid start and end dates");
            callback([], new Error("Invalid start and end dates"));
        } else {
            const myLedger = new Ledger(lease);
            callback(this.createResponse(myLedger.getLedger()));
        }

    }

    private createResponse(ledgerIter: IterableIterator<Line>): object[] {
        const ledgerArray = [];
        for (const line of ledgerIter) {
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
