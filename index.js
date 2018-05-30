const chromedriver = require("chromedriver");
const selenium = require("selenium-webdriver");
const fs = require("fs");
const driver = new selenium.Builder().forBrowser("chrome").build();

const By = selenium.By;
const until = selenium.until;

const locators = {
    searchForm: By.css('form'),
    searchBox: By.css('#lst-ib'),
    KRS: By.partialLinkText('KRS'),
    bushtreeKRS: By.partialLinkText('0000721490'),
    NIP: By.partialLinkText('5542961359'),
    NIPtable: By.xpath('//*[@id="main"]/div[4]/table[1]/tbody/tr[3]/td[2]')
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
    return driver.wait(until.elementLocated(locators.bushtreeKRS), 10000).then( () =>
    driver.takeScreenshot().then((image, err) => {
        fs.writeFile("KRS.jpg", image, "base64",
            err => console.error(err));
        }))
};

function printNIP() {
    return driver.wait(until.elementLocated(locators.NIP), 10000).then( () =>
    driver.findElement(locators.NIPtable).getText().then(txt => console.log("BUSHTREE NIP:", txt))
)};

function KRS() {
    driver.get("http://google.com/").then( () => 
        findBushtree("bushtree")).then( () => 
        openKRS().then( () =>
        KRSscreenshot().then( () =>
        printNIP()
         )))
};

KRS();
