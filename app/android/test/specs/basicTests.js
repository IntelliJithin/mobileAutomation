import {$, browser} from "@wdio/globals";
import fs from "fs";

function logToFile(message) {
    fs.appendFileSync("./test-log.txt", message + "\n");
    console.log(message);
}

logToFile("Test suite started");


async function scrollUntilVisible(element) {
    const maxScrolls = 5;
    let scrolls = 0;

    while (!(await element.isDisplayed()) && scrolls < maxScrolls) {
        logToFile(`Scrolling to find element.....Attempt ${scrolls + 1}`);

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
        throw new Error("Element not found after max scroll attempts...")
    }
    
}

describe('Input text', () => {

    it('Click Views', async() => {
        logToFile("Starting 'Click Views' test");
                
        try {
        logToFile("Looking for Views element");
        const viewsElement = $('~Views');

        await scrollUntilVisible(viewsElement);    

        logToFile("Clicking views");    
        await viewsElement.click();
        } catch (error) {
            logToFile("Error clicking views: " + error);
            await browser.saveScreenshot('./screenshots/error_screenshot_views.png');
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

            await browser.saveScreenshot('./screenshots/error_Screenshot_auto_complete.png');
            throw error;
        }
        await browser.pause(5000);
    });

    after(() => {
        logToFile("Test suite finished");
    });

});