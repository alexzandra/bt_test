const chromedriver = require("chromedriver");
const selenium = require("selenium-webdriver");
const fs = require("fs");

const driver = new selenium.Builder().forBrowser("chrome").build();
const assert = require('assert').strict;

const By = selenium.By;
const until = selenium.until;

const locators = {
    searchForm: By.css('form'),
    searchBox: By.css('#lst-ib'),
    KRS: By.partialLinkText('KRS'),
    bushtreeKRS: By.partialLinkText('0000721490'),
    NIP: By.partialLinkText('5542961359'),
    KRStable: By.xpath('//*[@id="main"]/div[4]/table[1]/tbody/tr[4]/td[2]'),
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
            err => console.error("\n******************************\nKRS.jpg", err));
    }).then ( () => 
    driver.findElement(locators.KRStable).getText().then(txt => console.log("BUSHTREE KRS:", txt)
    )))
};

function KRSassert() {
    assert.strictEqual('0000721490', KRStable, "assertion KRS passed successfully")};

function printNIP() {
    return driver.wait(until.elementLocated(locators.NIP), 10000).then( () =>
    driver.findElement(locators.NIPtable).getText().then(txt => console.log("BUSHTREE NIP:", txt, "\n******************************"))
)};


const NIP = driver.findElement(locators.NIPtable).getText();
function validateNIP(NIP) {
    if (NIP == null)
        return false;
  
    if (NIP.length != 10)
        return false;
    
    var reg = /^[0-9]{10}$/;
    if(reg.test(NIP) == false) {
        return false}
    else
    {
        var digits = (""+NIP).split("");
        var checksum = (6*parseInt(digits[0]) +
                        5*parseInt(digits[1]) + 
                        7*parseInt(digits[2]) + 
                        2*parseInt(digits[3]) + 
                        3*parseInt(digits[4]) + 
                        4*parseInt(digits[5]) + 
                        5*parseInt(digits[6]) + 
                        6*parseInt(digits[7]) + 
                        7*parseInt(digits[8])
                        )%11;
         
        return (parseInt(digits[9])==checksum);
                    
    }
        };

function KRS() {
    driver.get("http://google.com/").then( () => 
    driver.manage().window().maximize().then( () =>
        findBushtree("bushtree")).then( () => 
        openKRS().then( () =>
        KRSscreenshot().then( () =>
    //    KRSassert().then( () =>
        validateNIP().then( () =>    
        printNIP()
         )))))
        //)
};

KRS();
