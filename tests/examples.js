//core functions
const puppteer = require('puppeteer')
const expect = require('chai').expect

//helper functions
const config = require('../lib/config')
const helper = require('../lib/helper')

//utility functions
const utils = require('../lib/utils')

//pages
const homePage = require('../page-objects/home-page')
const loginPage = require('../page-objects/login-page')
const searchResultsPage = require('../page-objects/searchResults-page')
const feedbackPage = require('../page-objects/feedback-page')
const feedbackResultsPage = require('../page-objects/feedbackResult-page')
const forgetPasswordPage = require('../page-objects/forgotPassword-page')

describe('puppeteer-mocha tests', () => {
	let browser
	let page

	before(async function() {
		browser = await puppteer.launch({
			headless: config.headless,
			slowMo: config.slowMo,
			devtools: config.devtools,
			timeout: config.browsertimeout,
			args: ['--window-size=1366,768'],
		})
		page = await browser.newPage()
		//page.setDefaultTimeout(config.waitingtimeout)
		await page.setViewport({
			width: 1366,
			height: 768,
		})
	})

	after(async function() {
		await browser.close()
	})
	describe('Login Test', () => {
		it('should navigate to homepage', async () => {
			await helper.loadUrl(page, config.baseUrl)
			await helper.shouldExist(page, homePage.BANKING_FEATURES)
		})

		it('should click on signin button', async () => {
			await helper.click(page, homePage.SIGN_IN_BUTTON)
			await helper.shouldExist(page, loginPage.LOGIN_FORM)
		})

		it('should submit login form', async () => {
			await helper.typeText(page, loginPage.USER_NAME, utils.generateID(9))
			await helper.typeText(page, loginPage.USER_PASSWORD, utils.generateNumbers())
			await helper.click(page, loginPage.SUBMIT_BUTTON)
		})

		it('should get error message', async () => {
			await helper.waitForText(page, 'Login and/or password are wrong', 'body')
			await helper.shouldExist(page, loginPage.LOGIN_FORM)
		})
	})
	describe('Search Test', () => {
		it('should navigate to homepage', async () => {
			await helper.loadUrl(page, config.baseUrl)
			await helper.shouldExist(page, homePage.BANKING_FEATURES)
		})

		it('should submit search phrase', async () => {
			await helper.typeText(page, homePage.SEARCH_BAR, 'hello world')
			await helper.pressKey(page, 'Enter')
		})

		it('should display search results', async () => {
			await helper.waitForText(
				page,
				'Search Results',
				searchResultsPage.SEARCH_RESULTS_TITLE
			)
			await helper.waitForText(
				page,
				'No results were found for the query',
				searchResultsPage.SEARCH_RESULTS_CONTENT
			)
		})
	})
	describe('Navbar Links Test', () => {
		it('should navigate to homepage', async () => {
			await helper.loadUrl(page, config.baseUrl)
			await helper.shouldExist(page, homePage.BANKING_FEATURES)
		})

		it('should have correct number of links', async () => {
			const numberOfLinks = await helper.getCount(page, '#pages-nav > li')
			expect(numberOfLinks).to.equal(3)
		})
	})
	describe('Feedback Test', () => {
		it('should navigate to homepage', async () => {
			await helper.loadUrl(page, config.baseUrl)
			await helper.shouldExist(page, homePage.BANKING_FEATURES)
		})

		it('should click on feedback link', async () => {
			await helper.click(page, homePage.LINK_FEEDBACK)
			await helper.shouldExist(page, feedbackPage.FEEDBACK_FORM)
		})

		it('should submit feedback form', async () => {
			await helper.typeText(page, feedbackPage.FORM_NAME, 'Kaniel')
			await helper.typeText(page, feedbackPage.FORM_EMAIL, utils.generateEmail())
			await helper.typeText(page, feedbackPage.FORM_SUBJECT, 'Just Subject')
			await helper.typeText(page, feedbackPage.FORM_COMMENT, 'Just a comment')
			await helper.click(page, feedbackPage.FORM_SUBMIT_BUTTON)
		})

		it('should display success message', async () => {
			await helper.shouldExist(page, feedbackResultsPage.FEEDBACK_RESULTS_TITLE)
			await helper.waitForText(
				page,
				'Thank you for your comments',
				feedbackResultsPage.FEEDBACK_RESULTS_CONTENT
			)
		})
	})

	describe('Forgotten password', async () => {
		it('should navigate to home page', async () => {
			await helper.loadUrl(page, config.baseUrl)
			await helper.shouldExist(page, homePage.BANKING_FEATURES)
		})
		it('should navigate to login page', async () => {
			await helper.click(page, homePage.SIGN_IN_BUTTON)
			await helper.shouldExist(page, loginPage.LOGIN_FORM)
		})

		it('should navigate to forget password page', async () => {
			await helper.click(page, loginPage.FORGETPASSWORD_LINK)
			await helper.shouldExist(page, forgetPasswordPage.FGT_PSWD_TITLE)
		})
		it('should submit email', async () => {
			await helper.typeText(
				page,
				forgetPasswordPage.EMAIL_FIELD,
				utils.generateEmail()
			)
			await helper.click(page, forgetPasswordPage.SENDPASSWORD_BUTTON)
		})

		it('should display success message', async () => {
			await helper.waitForText(
				page,
				'Your password will be sent to the following email',
				'body'
			)
		})
	})
})
