const puppteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../lib/config')
const click = require('../lib/helper').click
const typeText = require('../lib/helper').typeText
const loadUrl = require('../lib/helper').loadUrl
const waitForText = require('../lib/helper').waitForText
describe('puppeteer tests', () => {
    let browser;
    let page;

    before(async function(){
        browser = await puppteer.launch({
            headless: config.headless,
            slowMo: config.slowMo,
            devtools: config.devtools,
            timeout: config.browsertimeout,
            args: ['--window-size=1366,768',],
        })
        page = await browser.newPage()
        //page.setDefaultTimeout(config.waitingtimeout)
        await page.setViewport({
            width: 1366,
            height: 768
            
         })
    })

    after(async function(){
      await browser.close()     
    })
    
    it('verify whether the page title and url is correct', async() => {
        //TO DO
        loadUrl(page,config.baseUrl)
        await page.waitForSelector('#nav-search');
        const url = await page.url()
        const title =  await page.title()

        expect(url).to.contains("dev")
        expect(title).to.contains("Community")
    })
    it('browser reload',async () => {
        await page.reload()
        await page.waitForSelector('#page-content')

        await waitForText(page, 'body','WRITE A POST')

    });
    it('link click', async() => {
        await loadUrl(page,config.baseUrl)
        await click(page,'#write-link')
        await page.waitForSelector('.registration-rainbow')
    });

    it('Submit search text', async() => {
        await loadUrl(page,config.baseUrl)
        await typeText(page,'#nav-search','javascript')
        await page.keyboard.press('Enter');
        await page.waitForSelector('#articles-list');
    });




})
