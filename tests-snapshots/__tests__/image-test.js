const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('my first snapshot test', () => {
	let browser
	let page
	beforeAll(async function(){
        browser = await puppeteer.launch({
            headless: false,

        })
        page = await browser.newPage()
    })
    afterAll(async function(){
        await browser.close()
    })
    test('homepage snapshot', async() => {
        await page.goto('http://example.com')
        const image =  await page.screenshot()
        expect(image).toMatchImageSnapshot()
    },30000)

    test('single element snapshot', async() => {
        await page.goto('http://example.com')
        const h1 = await page.waitForSelector('h1');
        const image =  await h1.screenshot()
        expect(image).toMatchImageSnapshot()
    })
})
