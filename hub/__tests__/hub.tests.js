'use strict';
const testy = require('../hub.js');


let logSpy = jest.spyOn(console, 'log').mockImplementation();

afterAll(() => {
  logSpy.mockRestore();
});

describe('should test testy/vender/driver console log', () => {

  it('checks new order console.logs', () => {
    testy.on(afterAll);
    setTimeout(() => {
      expect(logSpy).toHaveBeenCalled()
    }, 11000)
  });

  it('checks delievered console.logs', () => {
    testy.on(payload);
    setTimeout(() => {
      expect(logSpy).toHaveBeenCalled()
    }, 11000)
  });

  it('checks new order console.logs', () => {
    testy.on(payload);
    setTimeout(() => {
      expect(logSpy).toHaveBeenCalled()
    }, 11000)
  });

  it('checks delievered console.logs', () => {
    testy.on(payload);
    expect(logSpy).toHaveBeenCalled();
  });

});