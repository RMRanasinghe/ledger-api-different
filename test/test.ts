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
            var expected: string[] = ["Mar 28 2020", "Apr 04 2020", "Apr 11 2020", "Apr 18 2020", "Apr 25 2020",
             "May 02 2020", "May 09 2020", "May 16 2020", "May 23 2020"]
            var myLease = new Lease((new Date("March 28, 2020")).toISOString(),(new Date("May 27, 2020")).toISOString(),"WEEKLY",555,"Africa/Abidjan")
            var myLedger = new Ledger(myLease)
            var i = 0
            for (let line of myLedger.getLedger()) { 
                //console.log(line.start + " " + line.end + " " + line.amount)
                assert.equal(new Date(expected[i]).getTime(),  line.start.getTime())
                i += 1
            }

            done()
        });
      });

      describe('Test Monthly ledger iterator', function () {

        it('Should return monthly ledger iterator with correct values', function (done) {
            var expected = ["Mar 31 2020","Apr 30 2020", "May 31 2020", "Jun 30 2020", "Jul 31 2020 ", "Aug 31 2020", "Sep 30 2020",
          "Oct 31 2020", "Nov 30 2020", "Dec 31 2020", "Jan 31 2021", "Feb 28 2021", "Mar 31 2021", "Apr 30 2021", "May 31 2021"]
            var myLease = new Lease((new Date("March 31, 2020")).toISOString(),(new Date("May 27, 2021")).toISOString(),"MONTHLY",555,"Africa/Abidjan")
            var myLedger = new Ledger(myLease)
            var i = 0
            for (let line of myLedger.getLedger()) { 
                //console.log(line.start + " " + line.end + " " + line.amount)
                assert.equal((new Date(expected[i])).getTime(),line.start.getTime())
                i += 1
            }

            done()
        });
      });

      describe('when the request contains a Invalid date', function () {

        it('should return a 400 bad request response', function (done) {
    
          var requestJson = {
            start: (new Date('October 15, 1996')).toISOString(),
            end: (new Date('October 15, 1995')).toISOString(),
            frequency: "WEEKLY",
            amount: 1200,
            timezone:"Africa/Abidjan"
          };
    
          request(server)
            .post('/')
            .send(requestJson)
            .expect(400, done);
        });
      });

      describe('Response test', function () {

        it('should return a 200 ok response. and correct response body', function (done) {
    
          var expectedResponse = [
            {
              Start: '2020-03-28T00:00:00.000Z',
              End: '2020-04-10T01:00:00.000Z',
              Amount: '1110.00'
            },
            {
              Start: '2020-04-11T01:00:00.000Z',
              End: '2020-04-11T01:00:00.000Z',
              Amount: '1110.00'
            },
            {
              Start: '2020-04-25T01:00:00.000Z',
              End: '2020-04-25T01:00:00.000Z',
              Amount: '1110.00'
            },
            {
              Start: '2020-05-09T01:00:00.000Z',
              End: '2020-05-09T01:00:00.000Z',
              Amount: '1110.00'
            },
            {
              Start: '2020-05-23T01:00:00.000Z',
              End: '2020-05-27T00:00:00.000Z',
              Amount: '396.43'
            }
          ]

          var requestJson = {
            start: (new Date('March 28, 2020Z')).toISOString(),
            end: (new Date('May 27 2020Z')).toISOString(),
            frequency: "FORTNIGHTLY",
            amount: 555,
            timezone:"Africa/Abidjan"
          };
    
          request(server)
            .post('/')
            .send(requestJson)
            .expect(200, expectedResponse, done);
        });
      });


      describe('Response test', function () {

        it('should return a 200 ok response. and correct response body', function (done) {
    
          var expectedResponse:any = [
            {
              Start: '2020-01-31T00:00:00.000Z',
              End: '2020-02-28T00:00:00.000Z',
              Amount: '2338.00'
            },
            {
              Start: '2020-02-29T00:00:00.000Z',
              End: '2020-03-30T00:00:00.000Z',
              Amount: '2338.00'
            },
            {
              Start: '2020-03-31T00:00:00.000Z',
              End: '2020-04-29T01:00:00.000Z',
              Amount: '2338.00'
            },
            {
              Start: '2020-04-30T01:00:00.000Z',
              End: '2020-05-30T01:00:00.000Z',
              Amount: '2338.00'
            },
            {
              Start: '2020-05-31T01:00:00.000Z',
              End: '2020-05-27T00:00:00.000Z',
              Amount: '3.71'
            }
          ]

          var requestJson = {
            start: (new Date('Jan 31, 2020Z')).toISOString(),
            end: (new Date('May 27 2020Z')).toISOString(),
            frequency: "MONTHLY",
            amount: 555,
            timezone:"Africa/Abidjan"
          };
    
          request(server)
            .post('/')
            .send(requestJson)
            .expect(200, expectedResponse, done);
        });
      });

});