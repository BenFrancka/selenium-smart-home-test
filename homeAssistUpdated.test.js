const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

//! This is a more comprehensive test suite than homeAssist.test.js

const url = 'https://homeassistant.local:8123/';
const username = 'your_username';
const password = 'your_password';
const maxLights = 10;
const validTemperatureRange = [-10, 40];

describe('Home Assistant Tests', function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    await driver.findElement(By.name('username')).sendKeys(username);
    await driver
      .findElement(By.name('password'))
      .sendKeys(password, Key.RETURN);
    await driver.wait(until.titleContains('Home Assistant'));
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Should open the Home Assistant login page and assert title and login form', async function () {
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Home Assistant');
    const loginForm = await driver.findElement(By.id('ha-login-form'));
    assert.ok(loginForm);
  });

  it('Should log in to the Home Assistant dashboard and assert redirection', async function () {
    const dashboardTitle = await driver.getTitle();
    assert.strictEqual(dashboardTitle, 'Home Assistant');
  });

  it('Should turn on a light in the Home Assistant dashboard and assert that it is turned on', async function () {
    const lightSwitch = await driver.findElement(By.className('toggle-switch'));
    await lightSwitch.click();
    const lightState = await driver
      .findElement(By.className('state-label'))
      .getText();
    assert.strictEqual(lightState, 'on');
  });

  it('Should not allow login with invalid credentials', async function () {
    await driver.findElement(By.name('username')).sendKeys('invalid_username');
    await driver
      .findElement(By.name('password'))
      .sendKeys('invalid_password', Key.RETURN);
    const errorMessage = await driver
      .findElement(By.className('error-message'))
      .getText();
    assert.strictEqual(errorMessage, 'Invalid username or password');
  });

  it('Should not allow turning on more than the maximum number of lights', async function () {
    for (let i = 0; i < maxLights; i++) {
      const lightSwitch = await driver.findElement(
        By.className('toggle-switch')
      );
      await lightSwitch.click();
    }
    const lastLightSwitch = await driver.findElement(
      By.className('toggle-switch:last-child')
    );
    await lastLightSwitch.click();
    const errorMessage = await driver
      .findElement(By.className('error-message'))
      .getText();
    assert.strictEqual(
      errorMessage,
      `Maximum number of lights (${maxLights}) has been reached`
    );
  });

  it('Should not allow setting the temperature outside the valid range', async function () {
    const temperatureSlider = await driver.findElement(
      By.className('temperature-slider')
    );
    await temperatureSlider.sendKeys(Key.ARROW_RIGHT);
    await temperatureSlider.sendKeys(Key.ARROW_RIGHT);
    await temperatureSlider.sendKeys(Key.ARROW_RIGHT);
    const temperatureValue = await driver
      .findElement(By.className('temperature-value'))
      .getText();
    assert.strictEqual(temperatureValue, `${validTemperatureRange[1]} °C`);
    const errorMessage = await driver
      .findElement(By.className('error-message'))
      .getText();
    assert.strictEqual(
      errorMessage,
      `Temperature must be between ${validTemperatureRange[0]} and ${validTemperatureRange[1]} °C`
    );
  });
});
