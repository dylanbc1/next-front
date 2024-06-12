const {By, Builder, WebElementCondition, until} = require('selenium-webdriver');
const assert = require('assert');
const { time } = require('console');


(async function test() { 
    let driver;
    try {
        console.log("Test started");
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/auth/login');

        
        let emailInput = await driver.findElement(By.xpath('//*[@id=":R4l7rpucq:-form-item"]'));
        await emailInput.sendKeys('prueba@prueba.com')

        let passwordInput = await driver.findElement(By.xpath('//*[@id=":R8l7rpucq:-form-item"]'))
        await passwordInput.sendKeys('123456')

        let loginButton = await driver.findElement(By.xpath('/html/body/div/div/div/div[2]/form/button'))
        await loginButton.click()

        await driver.wait(until.urlIs('http://localhost:3000/settings'), 10000)

        let logoutButton = await driver.findElement(By.xpath('//*[@id="radix-:r0:"]'))
        await logoutButton.click()

        let logout = await driver.findElement(By.xpath('//*[@id="radix-:r1:"]/span/div'))
        await logout.click()

        await driver.wait(until.urlIs('http://localhost:3000/auth/login'), 10000)
        let welcome = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div/p'))

        assert.equal(await welcome.getText(), 'Welcome Back')
        console.log("Test passed")
    }catch(error){
        console.error(error)
 
    }finally{
        await driver.quit();
    }
}());
    