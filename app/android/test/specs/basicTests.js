import {$, browser} from "@wdio/globals";

describe('Input text', () => {
    it('Click Views', async() => {
        try {
        const viewsElement = $('~Views');
        await viewsElement.waitForExist({timeout:50000, interval: 500});
        await viewsElement.waitForDisplayed({timeout:50000});
        await viewsElement.click();
        } catch (error) {
            await browser.saveScreenshot('./error_screenshot_views.png');
            throw error;
        }
        await browser.pause(5000);
    });

    it('Click Auto Complete', async() => {
        try{
        const autoCompleteElement = $('~Auto Complete');
        await autoCompleteElement.waitForExist({timeout:50000, interval: 500});
        await autoCompleteElement.waitForDisplayed({timeout:50000});
        await autoCompleteElement.click();
        } catch (error) {
            await browser.saveScreenshot('./error_Screenshot_auto_complete.png');
            throw error;
        }
        await browser.pause(5000);
    });

})