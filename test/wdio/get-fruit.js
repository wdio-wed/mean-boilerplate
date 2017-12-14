const expect = require('chai').expect;

const dataSetup = require('../script/data-setup')

describe('should list fruit information', function () {
  let fruitName;

  beforeEach(function () {
    fruitName = dataSetup();

    browser.url('/');

    //do the login
    if (browser.isExisting('#login-wrapper')) {
      browser.setValue('#username', 'han_solo')
      browser.setValue('#password', 'chewbacca')
      browser.click('#login-wrapper button');
    }

    browser.waitForExist('[ng-controller="TableController"]');
  })

  it('should have fruit details in table', function () {
    expect(browser.isExisting('td*=' + fruitName)).to.be.true;
  })
})