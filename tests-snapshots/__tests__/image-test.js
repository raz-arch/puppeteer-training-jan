const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('my first snapshot test', () => {
	let browser
	let page
	beforeAll(async function() {
		browser = await puppeteer.launch({
			headless: false,
			args: ['--window-size=1366,768'],
		})
		page = await browser.newPage()
	})
	afterAll(async function() {
		await browser.close()
	})
	test('homepage snapshot', async () => {
		await page.setViewport({
			width: 1366,
			height: 768,
		})
		await page.goto('http://zero.webappsecurity.com/index.html')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot()
	}, 30000)

	test('single element snapshot', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		const navbar = await page.waitForSelector('.navbar')
		const image = await navbar.screenshot()
		expect(image).toMatchImageSnapshot()
	}, 30000)
})
