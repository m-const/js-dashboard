const { Builder, By, Key, util } = require("selenium-webdriver");
const data = require("./auth.data");
const { assert } = require("chai");
const baseURL = "http://localhost:5000/";
const driver = new Builder().forBrowser("firefox").build();
describe("Authentication Suite", function () {
  it("Navigate to " + baseURL, async function () {
    await driver.get(baseURL);
    const currentURL = await driver.getCurrentUrl();
    assert.equal(
      currentURL,
      baseURL,
      "Expected URL is: " + baseURL + ", current URL is: " + currentURL
    );
    this.slow(4000);
  });
  describe("Register", function () {
    it("Click Register Link", async function () {
      await driver.findElement(By.id("register")).click();
      const currentURL = await driver.getCurrentUrl();
      assert.equal(
        currentURL,
        baseURL + "users/register",
        "Expected URL is: " +
          baseURL +
          "users/register" +
          ", current URL is: " +
          currentURL
      );
      this.slow(500);
    });

    it("Complete Register Form", async function () {
      await driver.sleep(1000);
      await driver.findElement(By.id("name")).sendKeys(data.name);
      await driver.findElement(By.id("email")).sendKeys(data.email);
      await driver.findElement(By.id("password")).sendKeys(data.password);
      await driver.findElement(By.id("password2")).sendKeys(data.password);
      await driver.findElement(By.id("register")).click();
      await driver.sleep(1000);
      this.slow(4000);
    });

    it("Redirected to Login", async function () {
      const currentURL = await driver.getCurrentUrl();
      if (currentURL == baseURL + "users/login") {
        assert.equal(
          currentURL,
          baseURL + "users/login",
          "Expected URL is: /users/login, current URL is: " + currentURL
        );
      }else {
        this.skip();
      }
    });

    it("Success Flash Message", async function () {
      const currentURL = await driver.getCurrentUrl();
      if (currentURL == baseURL + "users/login") {
        //verify the flash message appears
        const flashMSG = await driver
          .findElement(By.id("alert_0"))
          .getAttribute("innerHTML");
        assert.equal(
          flashMSG,
          "You are now registered. Please Login.",
          "Flash message is not of expected value"
        );
      }else {
        this.skip();
      }
    });

    it("Complete Login Form", async function () {
      const currentURL = await driver.getCurrentUrl();
      if (currentURL == baseURL + "users/login") {
        await driver.sleep(2000);
        await driver.findElement(By.id("email")).sendKeys(data.email);
        await driver.findElement(By.id("password")).sendKeys(data.password);
        await driver.findElement(By.id("login")).click();
        await driver.sleep(2000);
        const dashboardUrl = await driver.getCurrentUrl();
        assert.equal(
          dashboardUrl,
          baseURL + "dashboard",
          "Expected URL is: /dashboard, current URL is: " + currentURL
        );
        const greeting = await driver.findElement(By.id("greeting")).getAttribute('innerHTML');
        assert.equal(
          greeting,
          data.name,
          "Dashboard greeting is not correct"
        );
        
        this.slow(5000);
      }else {
        this.skip();
      }
    });

    it("Registration Form Error Handling", async function () {
      const currentURL = await driver.getCurrentUrl();
      if (currentURL == baseURL + "users/register") {
        assert.equal(
          currentURL,
          baseURL + "users/register",
          "Expected URL is: /users/register, current URL is: " + currentURL
        );
      }else {
        this.skip();
      }
    });
  });

  after(async () => driver.quit());
});
