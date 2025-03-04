import {$, browser} from "@wdio/globals";
import fs from "fs";

let anrCount = 0;



function logToFile(message) {
    fs.appendFileSync("./test-log.txt", message + "\n");
    console.log(message);
}

logToFile("Test suite started");

async function handleANRDialogs() {
    try {
        logToFile("Checking for ANR dialogs");

        let retries = 5;
        while (retries > 0) {
            const waitButton = $('android=new UiSelector().resourceId("android:id/aerr_wait")');

            if (await waitButton.isDisplayed()) {
                anrCount++;
                logToFile("ANR detected! Clicking 'Wait' (ANR #${anrCount})...");

                await waitButton.waitForClickable();
                await waitButton.click();
                await browser.pause(5000);
            } else {
                logToFile("No more ANR dialogs detected");
                return;
            }

            retries--;
        }
        logToFile("Finished checking for ANRs after retries");
    }    catch (error) {
        logToFile("Error handling ANR dialogs...")
    }
}

async function scrollUntilVisible(element) {
    let maxScrolls = 10;
    let scrolls = 0;

    while (!(await element.isDisplayed()) && scrolls < maxScrolls) {
        logToFile('Scrolling to find element.....Attempt ${scrolls + 1}');

        await driver.touchPerform ([
            { action: "press", options: {x:500, y: 1500} },
            { action: "moveTo", options: {x:500, y: 500} },
            { action: "release" },
        ]);

        await browser.pause(1000);
        scrolls++;
    }

    if (await element.isDisplayed()) {
        logToFile("Element is now visible");
    } else {
        logToFile("Element not found after max scroll attempts");
    }
    
}

describe('Input text', () => {

    it('Click Views', async() => {
        logToFile("Starting 'Click Views' test");
        
        await handleANRDialogs();
        
        try {
        logToFile("Looking for Views element");
        const viewsElement = $('~Views');

        await scrollUntilVisible(viewsElement);    

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

        await handleANRDialogs();

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