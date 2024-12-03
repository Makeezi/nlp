const puppeteer = require('puppeteer');

(async () => {

    // Launch the browser in headless mode and create a new page
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = (await browser.pages())[0];
    await page.goto('https://en.wikipedia.org/wiki/Jarkko_Nieminen');
    const extractedText = await page.$eval('*', (el) => el.innerText);

    // Normalize whitespace characters (there are weird whitespaces between words in the info boxes)
    const normalizedText = extractedText.replace(/\s+/g, ' ');

    // Extract all references to age
    console.log(normalizedText.match(/age (\d+)/g));
    await browser.close();
})();