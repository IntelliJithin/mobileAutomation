import {$, browser} from "@wdio/globals";

async function handleANRDialogs() {
    try {
        const waitButton = $('~Wait');
        await waitButton.waitForExist({timeout: 5000, interval: 500});
        await waitButton.waitForDisplayed({timeout: 5000, interval: 500});

        console.log("Wait button detected:", await waitButton.isDisplayed());

        if (await waitButton.isDisplayed()){
            console.log("ANR detected! Clicking 'Wait'...")
            await waitButton.waitForClickable();
            await waitButton.click();
        } else{
            console.log("No ANR dialog detected");
        }
    } catch (error){
        console.log("Error handling ANR dialogs:", error);
    }
}

describe('Input text', () => {

    console.log("Test suite started...");

    it('Click Views', async() => {

        beforeEach(async () => {
            await handleANRDialogs();
        })
        try {
        await handleANRDialogs();
        const viewsElement = $('~Views');
        console.log("Checking if Views element exist...")
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
        console.log("Checking if Auto Complete element exist...")
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