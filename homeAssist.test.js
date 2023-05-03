const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Home Assistant Smart Home Application', function () {
  let driver;

  before(async function () {
    // create a new Selenium WebDriver instance
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // close the Selenium WebDriver instance
    await driver.quit();
  });

  it('should open the Home Assistant login page', async function () {
    // navigate to the Home Assistant login page
    await driver.get('https://homeassistant.local:8123/auth/login');

    // assert that the login page title is correct
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Home Assistant');

    // assert that the login form is present
    const form = await driver.findElement(By.tagName('form'));
    assert.ok(form);
  });

  it('should log in to the Home Assistant dashboard', async function () {
    // navigate to the Home Assistant login page
    await driver.get('https://homeassistant.local:8123/auth/login');

    // fill in the login form and submit it
    const usernameField = await driver.findElement(By.id('username'));
    const passwordField = await driver.findElement(By.id('password'));
    const submitButton = await driver.findElement(By.css('.md-raised'));

    await usernameField.sendKeys('your-username');
    await passwordField.sendKeys('your-password');
    await submitButton.click();

    // assert that the user is logged in and redirected to the dashboard
    await driver.wait(until.urlContains('/states'), 5000);
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/states'));
  });

  it('should turn on a light in the Home Assistant dashboard', async function () {
    // navigate to the Home Assistant dashboard
    await driver.get('https://homeassistant.local:8123/');

    // click on the light switch
    const lightSwitch = await driver.findElement(By.css('ha-switch-entity'));
    await lightSwitch.click();

    // assert that the light is turned on
    const lightState = await driver.findElement(By.css('.state-label'));
    const lightStateText = await lightState.getText();
    assert.strictEqual(lightStateText, 'on');
  });
});
