const mocha = require('mocha');
const expect = require('chai').expect;

const compareNumbers = require('../util').compareNumbers;
const getDaysOfYear = require('../util').getDaysOfYear;
const isBooked = require('../util').isBooked;


describe('compareNumber', () => {
  it('comapreNumbers should equal 2', () => {
    expect(compareNumbers(5,3)).to.eql(2);
  });
  it('comapreNumbers should equal -2', () => {
    expect(compareNumbers(3,5)).to.eql(-2);
  });
});

describe('getDaysOfYear', () => {
  const start = '2018-07-22';
  const end   = '2018-07-28';
  const results = getDaysOfYear(start,end);
  it('should return an array', () => {
    expect(results).to.be.a('array');
  });
  it('should contain 7 items', () => {
    expect(results).to.have.length(7);
  });
});

describe('isBooked', () => {
  const array1 = [152,153,154, 155];
  const results1 = isBooked(array1);
  it('should be false', () => {
    expect(results1).to.be.false;
  });
  const array2 = [152,153,154, 155, 155];
  const results2 = isBooked(array2);
  it('should be true', () => {
    expect(results2).to.be.true;
  });
});

describe('hasGap', () => {
  const array1 = [152,153,154, 155];
  const results1 = isBooked(array1);
  it('should be false', () => {
    expect(results1).to.be.false;
  });
  const array3 = [152,153,154,155,158];
  const results3 = isBooked(array3);
  it('should be false', () => {
    expect(results3).to.be.false;
  });
});
