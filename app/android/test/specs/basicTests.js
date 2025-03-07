import {$, browser} from "@wdio/globals";

describe('Basic test', () => {

    it('Click Content', async() => {

        try {
            const contentElemet = $('~Content');
            await browser.pause(2500);
            await browser.saveScreenshot('./screenshots/screen1.png')
            contentElemet.click();
            await browser.pause(2500);
            await browser.saveScreenshot('./screenshots/screen2.png')
        } catch (error) {

            await browser.saveScreenshot('./screenshots/error_screen.png');
            throw error;
        }

        await browser.pause(2500);
    });

});