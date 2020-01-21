const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('my first snapshot test', async () => {
	let browser
	let page
	beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false,

        })
        page = await browser.newPage()
    })
    afterAll(async()=>{
        await browser.close()
    })
    test('homepage snapshot', async() => {
        await page.goto('http://google.com')
        const image =  await page.screenshot()
        expect(image).toMatchImageSnapshot()
    },30000)
})
