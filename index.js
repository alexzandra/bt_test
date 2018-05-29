const chromedriver = require("chromedriver");
const selenium = require("selenium-webdriver");
const driver = new selenium.Builder().forBrowser("chrome").build();


const By = selenium.By;
const until = selenium.until;

const locators = {
    searchForm: By.css('form'),
    searchBox: By.css('#lst-ib'),
    KRS: By.partialLinkText('krs')
};

function findBushtree(q) {
     return driver.findElement(locators.searchBox)
        .sendKeys(q).then( () => driver.findElement(locators.searchForm).submit() );
};


function openKRS() {
   return  driver.wait(until.elementLocated(locators.KRS), 20000).then( ()=>
    driver.findElement(locators.KRS).click());
};

function KRS() {
    driver.get("http://google.com/").then( ()=> findBushtree("bushtree")).then(() => openKRS());
};

KRS();
