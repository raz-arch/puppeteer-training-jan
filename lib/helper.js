module.exports = {
	click: async function(page, selector) {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			throw new Error('Could not click on selector:' + selector)
		}
	},
	typeText: async function(page, selector, keyword) {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, keyword)
		} catch (error) {
			throw new Error('Could not type into selector: ' + selector)
		}
	},
	loadUrl: async function(page, url) {
		await page.goto(url, { waitunit: 'networkidle0' })
	},
	getText: async function(page, selector) {
		try {
			await page.waitForSelector(selector)
			return page.$eval(selector, e => e.innerHTML)
		} catch (error) {
			throw new Error('Could not select text from selector: ' + selector)
		}
	},
	getCount: async function(page, selector) {
		try {
			await page.waitForSelector(selector)
			return page.$$eval(selector, elements => elements.length)
		} catch (error) {
			throw new Error('Could not return the count of the selector: ' + selector)
		}
	},
	waitForText: async function(page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.waitForFunction(
				(selector, text) =>
					document.querySelector(selector).innerText.includes(text),
				{},
				selector,
				text
			)
		} catch (error) {
			throw new Error('text: ' + text + ' not found')
		}
	},
    pressKey: async function(page, key) {
        try {
            await page.keyboard.press(key)
        } catch (error) {
            throw new Error(`Could not press key: ${key} on the keyboard`)
        }
    },
	shouldExist: async function(page, selector) {
        try {
            await page.waitForSelector(selector, { visible: true })
        } catch (error) {
            throw new Error(`Selector: ${selector} not exist`)
        }
    },
 
    shouldNotExist: async function(page, selector) {
        try {
            await page.waitFor(() => !document.querySelector(selector))
        } catch (error) {
            throw new Error(`Selector: ${selector} is visible, but should not`)
        }
    },
}
