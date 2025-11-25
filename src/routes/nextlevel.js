const { chromium } = require('playwright-extra');
// const fs = require('fs');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

chromium.use(StealthPlugin());

async function scrapeNextLevel() {
    const browser = await chromium.launch({
        headless: true
    });
    const page = await browser.newPage();
    const nextMonday = getNextMonday();

    await page.goto(`https://zaimov.nextlevelclub.bg/calendar?day=${nextMonday}+%u0433`);

    // Accept cookies
    await page.click('#c-p-bn');

    const targetDate = formatBulgarianDate(addDays(new Date(), 6));

    // fs.writeFileSync('log', targetDate, 'utf8');

    const headerLinks = page.locator('thead tr td a.scheduler-go-to-day');
    const headerCount = await headerLinks.count();
    let colIndex = -1;
    for (let i = 0; i < headerCount; i++) {
        const metaDate = await headerLinks.nth(i).getAttribute('meta:date');
        if (metaDate?.trim() === targetDate) {
            colIndex = i;
            break;
        }
    }
    if (colIndex === -1) {
        throw new Error(`No header column found with meta:date "${targetDate}"`);
    }

    const targetCell = page.locator('tbody tr').first().locator('td').nth(colIndex);

    const targetEvent = targetCell.locator(
        'div.event:has(span.eventlength:has-text("14:00-14:50"))'
    );
    await targetEvent.click();

    await page.click('#calendar-register-for-class-0');

    await page.fill('#Login', 'alexandrovata.alex@abv.bg'); 
    await page.fill('#Password', 'hkndcxou');

    await page.click('#SubmitCredentials');


    await page.click('text=Регистрирайте се »');

    // await new Promise(resolve => setTimeout(resolve, 6000000));

    // const domHtml = await page.content();
    // fs.writeFileSync('rendered.html', domHtml, 'utf8');
    // const title = await page.title();

    await browser.close();
    return { title, source_code: domHtml };
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function formatBulgarianDate(date) {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy} г.`;
}

function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);

  const day = nextMonday.getDate();
  const month = nextMonday.getMonth() + 1;
  const year = nextMonday.getFullYear();

  return `${day}.${month}.${year}`;
}

module.exports = { scrapeNextLevel };
