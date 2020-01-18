const puppeteer = require('puppeteer')
const chai = require('chai').expect
describe('my first puppeteer test', async () => {
	let browser
	let page
	before(async function() {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 0,
			devtools: false,
			timeout: 10000,
		})
        page = await browser.newPage()
        await page.setViewport({
            width: 800,
            height: 600,
        })
    })
	after(async function() {
        await browser.close()
    })

    it('My first step',async () => {
        await page.goto('https://dev.to')
        await page.waitForSelector('#nav-search')
    });

})
