import {$, browser} from "@wdio/globals";

logToFile("Test suite started");


/*async function scrollUntilElementFound(locator, maxScrolls = 5) {
    let scrolls = 0;

    while (scrolls < maxScrolls) {
        logToFile(`Scrolling to find element.....Attempt ${scrolls + 1}`);

        try {
            const element = $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("${locator}"))`);
            
            if (await element.isDisplayed()){
                logToFile("ELement found")
                return element;
            }

        } catch (error) {
            logToFile(`Error during scrolling attemp ${scrolls + 1}: ${error}`);
        }

        await browser.pause(1000);
        scrolls+=1;
    }
    throw new Error(`Element not found after ${maxScrolls} scroll attempts`);
    
} */

describe('Basic test', () => {

    it('Click Content', async() => {
        const contentElemet = $('~Content');
        contentElemet.click();
    });

   /* it('Click Auto Complete', async() => {

        logToFile("Starting Auto Complete test");

        try{

        logToFile("Looking for auto complete element");

        const autoCompleteElement = $('~Auto Complete');
        await autoCompleteElement.waitForExist({timeout:50000});
        await autoCompleteElement.waitForDisplayed({timeout:50000});

        logToFile("clicking auto complete");

        await autoCompleteElement.click();

        } catch (error) {

            logToFile("Error clicking auto complete: " + error.message);

            await browser.saveScreenshot('./screenshots/error_Screenshot_auto_complete.png');
            throw error;
        }
        await browser.pause(5000);
    }); */


});