const puppeteer = require('puppeteer');

const product_url = "https://www.walmart.com/ip/PS5-DualSense-Cosmic-Red-wireless-controller/487490728";

// Stores card details in variables to make it easier to change card details and have a neat code
const firstName = 'Shay';
const lastName = 'Oyeyemi';
const streetAddress = '9344 Breamore Ct';
const phoneNum = '2406008042';
const email = 'jesuseyioyeyemi@gmail.com';
const city = 'Laurel';
const zipCode = '20723';

const cardNum = '1111111111111111';
const monthNum = '02';
const cardYr  = '2020';
const cvvNum = '222';

// Function that loads the start page

async function givePage(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    return page;
}

// Function to add a specific item to the cart

async function addToCart(page){
    await page.goto(product_url);
    await page.waitForSelector("button[class='button spin-button prod-ProductCTA--primary button--primary']");
    await page.click("button[class='button spin-button prod-ProductCTA--primary button--primary']", elem => elem.click());
    await page.waitForNavigation();
    await page.waitForSelector("button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']");
    await page.click("button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']", elem => elem.click());
    await page.waitForNavigation();
    await page.click("button[data-automation-id='new-guest-continue-button']", elem => elem.click());
    await page.waitForNavigation();
    await page.waitFor(1000);
    await page.click("button[data-automation-id='fulfillment-continue']", elem => elem.click());
}

// Function that automates the click to speed up the checkout process

async function super_click(page, className){
    try{
        page.click("button[class='" + className + "']", elem=>elem.click());
    }catch(err){
        try{
            page.$eval("button[class='" + className + "']", elem=> elem.click());
        } catch(err2){
            page.evaluate(() => document.getElementsByClassName(className)[0].click());
        }
    }
}

// Function that completes the adding to cart process

async function addToCart2(page){
    await page.goto(product_url);
    await page.waitForSelector("button[class='button spin-button prod-ProductCTA--primary button--primary']");
    await super_click(page, 'button spin-button prod-ProductCTA--primary button--primary');
    await page.waitForNavigation();
    await super_click(page, 'button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary');
    await page.waitForNavigation();
    await page.waitFor(500);
    await super_click(page, 'button m-margin-top width-full button--primary');
    await page.waitForNavigation();
    await page.waitFor(500);
    await super_click(page, 'button cxo-continue-btn button--primary');
}

// Function that fills in the billing information

async function fillBilling(page){
    await page.waitFor(1000);
    await page.type("input[id='firstName']", firstName);
    //await page.type("input[id='firstName']", 'Shay');
    await page.waitFor(100);
    await page.type("input[id='lastName']", lastName);
    //await page.type("input[id='lastName']", 'Oyeyemi');
    await page.waitFor(100);
    await page.type("input[id='addressLineOne']", streetAddress);
    //await page.type("input[id='addressLineOne']", '9344 Breamore Ct');
    await page.waitFor(100);
    await page.type('#phone', phoneNum);
    //await page.type('#phone', '2406008042');
    await page.waitFor(100);
    await page.type('#email', email);
    //await page.type('#email', 'jesuseyioyeyemi@gmail.com');
    await page.waitFor(100);
    const input = await page.$("input[id='city']");
    await input.click({clickCount: 3});
    await input.type(city);
    //await input.type('Laurel');
    await page.waitFor(100);
    const input2 = await page.$("input[id='postalCode']");
    await input2.click({clickCount: 3});
    await input2.type(zipCode);
    //await input2.type('20723');
    await page.waitFor(100);
    await super_click(page, 'button button--primary');
    //await page.$eval("button[class='button button--primary']", elem => elem.click());
}

// Function that fills the payments information

async function fillPayment(page){
    await page.waitFor(2000);
    await page.type("input[id='creditCard']", cardNum);
    await page.waitFor(100);
    await page.select('#month-chooser', monthNum);
    await page.waitFor(100);
    await page.select('#year-chooser', cardYr);
    await page.waitFor(100);
    await page.type("input[id='cvv']", cvvNum);
    await super_click(page, 'button spin-button button--primary');
}

// Function in charge of completing the order

async function submitOrder(page){
    await page.waitFor(2000);
    await super_click(page, 'button auto-submit-place-order no-margin set-full-width-button pull-right-m place-order-btn btn-block-s button--primary');
}

// Function that completes the checkout

async function checkout(){
    var page = await givePage();
    await addToCart2(page);
    await fillBilling(page);
    await fillPayment(page);
    await submitOrder(page);
}

checkout();
