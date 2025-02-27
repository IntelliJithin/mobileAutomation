import {$, browser} from "@wdio/globals";
import { log } from "console";
import fs from "fs";


function logToFile(message) {
    fs.appendFileSync("./test-log.txt", message + "\n");
    console.log(message);
}

logToFile("Test suite started");

async function handleANRDialogs() {
    try {
        logToFile("Checking for ANR dialog...")
        const waitButton = $('~Wait');

        if (await waitButton.isDisplayed()){
            logToFile("ANR detected! Clicking 'Wait'...")
            await waitButton.waitForClickable();
            await waitButton.click();
        } else{
            logToFile("No ANR dialog detected");
        }
    } catch (error){
        logToFile("Error handling ANR dialogs:", error.message);
    }
}

describe('Input text', () => {

    it('Click Views', async() => {
        logToFile("Starting 'Click Views' test");

        
        await handleANRDialogs();
        try {
        logToFile("Looking for Views element");
        const viewsElement = $('~Views');
        await viewsElement.waitForExist({timeout:50000});
        await viewsElement.waitForDisplayed({timeout:50000});
        logToFile("Clicking views");    
        await viewsElement.click();
        } catch (error) {
            logToFile("Error clicking views: " + error);
            await browser.saveScreenshot('./error_screenshot_views.png');
            throw error;
        }
        await browser.pause(5000);
    });

    it('Click Auto Complete', async() => {
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
            await browser.saveScreenshot('./error_Screenshot_auto_complete.png');
            throw error;
        }
        await browser.pause(5000);
    });

    after(() => {
        logToFile("Test suite finished");
    });

});