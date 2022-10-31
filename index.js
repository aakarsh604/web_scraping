const express = require("express");
const app = express();
require("chromedriver");
const { Builder, By, Browser } = require("selenium-webdriver");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (request, response) => {
  try {
    const data = await scrapper();
    response.send(data);
  } catch (error) {
    alert(error);
  }
});

async function scrapper() {
  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://food.grab.com/sg/en/");
    const input = await driver.findElement(By.id("location-input"));
    await input.sendKeys("Yishun");

    const query = await driver.findElement(
      By.className("ant-btn submitBtn___2roqB")
    );
    await query.click();
  } catch (err) {
    alert(err);
  }
  await driver.quit();
}

app.listen(8000, () => {
  console.log("server started on 8000");
});
