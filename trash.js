const chromedriver = require("chromedriver");
const fs = require("fs");
const selenium = require("selenium-webdriver")
const driver = new selenium.Builder()
    .forBrowser("chrome")
    .build();

const url = "http://google.com/";
driver.get(url);

const By = selenium.By;
const until = selenium.until;

var searchForm = driver.findElement(By.css("form"));
var searchBox = searchForm.findElement(By.css("#sb_ifc0 input[name='q']"));
searchBox.sendKeys("bushtree");

var searchCenter = driver.findElement(By.css('center'));
var searchButton = searchCenter.findElement(By.name('btnK')).click();

//  .wait(until.elementLocated
//       (By.partialLinkText("bushtree"),10000));

var waitForPage = driver.wait(until.titleIs('bushtree - Szukaj w Google'))
.then (driver.takeScreenshot().then((image, err) => {
       fs.writeFile("zrzut.png", image, "base64",
       err => console.error(err));
 })
);
