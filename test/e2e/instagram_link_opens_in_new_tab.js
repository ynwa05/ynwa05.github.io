'use strict';

const expect = require('chai').expect;
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(new firefox.Options().addArguments('-headless'))
  .build();

describe('Instagram link', function() {
  it('should open in a new tab', function(done) {
    driver.get('http://localhost:8080/')

      // click Instagram link when it is located and visible on the page
      .then(() => driver.wait(until.elementLocated(By.linkText('Instagram')), 20000))
      .then(elem => driver.wait(until.elementIsVisible(elem), 20000))
      .then(elem => elem.click())

      // wait until there are two open tabs
      .then(() => driver.wait(() => (
        driver.getAllWindowHandles().then(arr => arr.length === 2)
      ), 20000))

      // switch to newly opened tab
      .then(() => driver.switchTo().window('4294967301'))

      // get title after it is loaded to the page
      .then(() => driver.wait(until.elementLocated(By.css('title')), 20000))
      .then(() => driver.getTitle())

      // compare actual title to expected title
      .then(title => expect(title).to.equal('Matt Willson (@matt.willson) • Instagram photos and videos'))
      .then(() => driver.quit())
      .then(done)
      .catch(err => done(err));
  });
});