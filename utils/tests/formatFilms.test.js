const { expect} =  require('chai');
const should = require('chai').should();
const formatFilms = require('./../formatFilms');

describe('Format films', function() {

    const data1 = [];
    it('should be an empty array if data is empty', function() {
        const formattedData1 = formatFilms(data1);
        formattedData1.should.be.empty;
    });

    const data2 = [
        ['El toro 3','2016-02-03'],
        ['El toro 2','2016-02-03'],
        ['El toro','2016-02-03'],
        ['Batman','2016-02-01'],
    ]
    it('should correctly transform the films array', function() {
        const formattedData2 = formatFilms(data2);
        formattedData2.should.deep.equal(
            [
                {
                    date:'2016-02-03',
                    films:['El toro 3', 'El toro 2', 'El toro'],
                    count: 3
                },
                {
                    date:'2016-02-01',
                    films:['Batman'],
                    count: 1
                }
            ]
        )
    });
});