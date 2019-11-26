# ledger-rest-api

## Install

npm install

## Run command
npm start

## Usage

E.g.: curl -d '{"start":"1996-10-14T14:00:00.000Z", "end":"1997-10-14T14:00:00.000Z", "frequency":"WEEKLY","amount":1200, "timezone":"Africa/Abidjan"}' -H "Content-Type: application/json" -X POST http://localhost:3000

## Run integration and unit tests

npm test

## Review logs

Log files are located at ./log/* 

error.log - error log
combination.log - all the logs


## Source structure

### src/
```
src - main source code
├── Utils - Utilities
│   ├── logger.ts - logger utility
│   └── validations.ts - Input JSON validation logic
├── app
│   ├── lease.ts - lease class 
│   ├── ledger.ts - class for keeping generated ledger
│   ├── line.ts - class for keeping line items
│   └── parser.ts - parse input and output JSON
└── index.ts - main access point/ server
```

### test
```
test
└── test.ts - main Integration/ unit test suit\
```

## Remarks

* Assume property, request, response timezone should be same
* Amount rounded for nearest cent
* tested for node v v12.13.1 npm 6.12

