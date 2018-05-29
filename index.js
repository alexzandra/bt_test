const chromedriver = require("chromedriver");
const selenium = require("selenium-webdriver");
const fs = require("fs");
const driver = new selenium.Builder().forBrowser("chrome").build();

const By = selenium.By;
const until = selenium.until;

const locators = {
    searchForm: By.css('form'),
    searchBox: By.css('#lst-ib'),
    KRS: By.partialLinkText('krs'),
    NIP: By.partialLinkText('5542961359'),
    bushtreeTable: By.css('#main > div:nth-child(4)')
};

function findBushtree(q) {
     return driver.findElement(locators.searchBox)
        .sendKeys(q).then( () => driver.findElement(locators.searchForm).submit() );
};

function openKRS() {
   return  driver.wait(until.elementLocated(locators.KRS), 10000).then( () =>
    driver.findElement(locators.KRS).click());
};

function KRSscreenshot() {
    return driver.wait(until.elementLocated(locators.NIP), 10000).then( () =>
    driver.takeScreenshot().then((image, err) => {
        fs.writeFile("KRS.jpg", image, "base64",
            err => console.error(err));
        })
)};

function KRS() {
    driver.get("http://google.com/").then( () => 
        findBushtree("bushtree")).then( () => 
        openKRS().then( () =>
        KRSscreenshot()
    ))
};

KRS();
