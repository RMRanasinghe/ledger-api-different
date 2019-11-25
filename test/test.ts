import chai, { expect } from 'chai';
import request from "supertest"
import server from "../src/index"
import lease from "../src/app/lease"
import 'mocha';
import Lease from '../src/app/lease';
import assert from "assert"
import Ledger from '../src/app/ledger';

describe('Validate Body', function () {
    describe('when the request contains a valid payload', function () {

        it('should return a 200 ok response', function (done) {
    
          var requestJson = {
            start: (new Date('October 15, 1996')).toISOString(),
            end: (new Date()).toISOString(),
            frequency: "WEEKLY",
            amount: 1200,
            timezone:"Africa/Abidjan"
          };
    
          request(server)
            .post('/')
            .send(requestJson)
            .expect(200, done);
        });
      });

    describe('when the request contains a Invalid payload', function () {

        it('should return a 400 bad request response', function (done) {
    
          var requestJson = {
            notstart: 'xxx',
          };
    
          request(server)
            .post('/')
            .send(requestJson)
            .expect(400, done);
        });
      });


      describe('Test lease object', function () {

        it('should have correct number of days', function (done) {
            var myLease = new Lease((new Date("06/30/2019")).toISOString(),(new Date("07/30/2019")).toISOString(),"WEEKLY",1200,"Africa/Abidjan")
            assert.equal(myLease.getNumberOfDays(),31)
            done()
        });
      }); 
      
      describe('Test total amount', function () {

        it('should have correct total amount calculated', function (done) {
            var myLease = new Lease((new Date("March 28, 2020")).toISOString(),(new Date("May 27, 2020")).toISOString(),"WEEKLY",555,"Africa/Abidjan")
            assert.equal(Math.abs(myLease.getTotalAmount() - 4836.43) < 0.01, true)
            done()
        });
      });

      describe('Test Weekly ledger iterator', function () {

        it('Should return weekly ledger iterator with correct values', function (done) {
            var myLease = new Lease((new Date("March 28, 2020")).toISOString(),(new Date("May 27, 2020")).toISOString(),"WEEKLY",555,"Africa/Abidjan")
            var myLedger = new Ledger(myLease)
            for (let line of myLedger.getWeeklyLedger()) { 
                console.log(line.start + " " + line.end + " " + line.amount)
            }

            done()
        });
      });

      describe('Test Monthly ledger iterator', function () {

        it('Should return monthly ledger iterator with correct values', function (done) {
            var myLease = new Lease((new Date("March 31, 2020")).toISOString(),(new Date("May 27, 2021")).toISOString(),"WEEKLY",555,"Africa/Abidjan")
            var myLedger = new Ledger(myLease)
            for (let line of myLedger.getMonthlyLedger()) { 
                console.log(line.start + " " + line.end + " " + line.amount)
            }

            done()
        });
      });
});