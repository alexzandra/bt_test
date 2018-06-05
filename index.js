const chromedriver = require("chromedriver");
const selenium = require("selenium-webdriver");
const fs = require("fs");

const driver = new selenium.Builder().forBrowser("chrome").build();
const assert = require("assert");

const By = selenium.By;
const until = selenium.until;

const locators = {
    searchForm: By.css('form'),
    searchBox: By.css('#lst-ib'),
    KRS: By.partialLinkText('KRS'),
    bushtreeKRS: By.partialLinkText('0000721490'),
    nip: By.partialLinkText('5542961359'),
    KRStable: By.xpath('//*[@id="main"]/div[4]/table[1]/tbody/tr[4]/td[2]'),
    niptable: By.xpath('//*[@id="main"]/div[4]/table[1]/tbody/tr[3]/td[2]')
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
    return driver.findElement(locators.KRStable).getText().then(txt =>
    assert.equal('0000721490', txt, "Zly KRS")
    );
};

function validatenip() {
    return driver.findElement(locators.niptable).getText()
    .then(nip => {
    
    if (nip == null)
        return false;
  
    if (nip.length != 10)
        return false;
          
    for (i=0; i<10; i++) {
        if (isNaN(nip[i]))
            return false;

      sum = 6 * nip[0] +
            5 * nip[1] +
            7 * nip[2] +
            2 * nip[3] +
            3 * nip[4] +
            4 * nip[5] +
            5 * nip[6] +
            6 * nip[7] +
            7 * nip[8];
            sum %= 11;
         
            if (nip[9] != sum)
            return false;
             
            return true;
    }
    }).then(isnip => {
        if(isnip)
        console.log("NIP validated");
        else
        console.error("NIP not validated");

        assert.equal(isnip,true,"Wrong NIP");
    });
}

function printnip() {
    return driver.wait(until.elementLocated(locators.nip), 10000).then( () =>
    driver.findElement(locators.niptable).getText().then(txt => console.log("BUSHTREE nip:", txt, "\n******************************"))
)};

function KRS() {
    driver.get("http://google.com/").then( () => 
    driver.manage().window().maximize().then( () =>
        findBushtree("bushtree")).then( () => 
        openKRS().then( () =>
        KRSscreenshot().then( () =>
        KRSassert().then( () =>
        validatenip().then( () =>    
        printnip()
         ))))
        )
        )
};

KRS();
