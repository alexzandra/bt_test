const chromedriver = require("chromedriver");
const selenium = require("selenium-webdriver")
const driver = new selenium.Builder()
    .forBrowser("chrome")
    .build();
driver.get("http://google.com/");

const By = selenium.By;
const until = selenium.until;

const locators = {
    searchForm: By.css("form"),
    searchBox: By.css("#sb_ifc0 input[name='q']"),
    KRS: By.partialLinkText('KRS')
};

function findBushtree(q) {
    driver.findElement(locators.searchBox)
        .sendKeys(q);
    driver.findElement(locators.searchForm).submit();
};

function waitForKRS() {
    driver.wait(until.elementLocated(locators.KRS), 20000);
    driver.findElement(locators.KRS).click();
};

//var openKRS = driver.findElement(locators.KRS).click();


findBushtree("bushtree");
waitForKRS();
