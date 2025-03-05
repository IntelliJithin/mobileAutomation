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
                logToFile(`ANR detected! Clicking 'Wait' (ANR #${anrCount})...`);

                const screenshotDir = "./screenshots";
                if (!fs.existsSync(screenshotDir)) {
                    fs.mkdirSync(screenshotDir, { recursive: true});
                }

                const screenshotPath = `${screenshotDir}/ANR_screenshot_${anrCount}.png`;
                await browser.saveScreenshot(screenshotPath);
                logToFile(`Screenshot saved: ${screenshotPath}`);

                await waitButton.waitForClickable();
                await waitButton.click();
                await browser.pause(10000);

                logToFile("Rechecking for ANR dialogs...")
            } else {
                logToFile("No more ANR dialogs detected");
                return;
            }

            retries--;
        }
        logToFile("Finished checking for ANRs after retries");
    }    catch (error) {
        logToFile(`Error handling ANR dialogs: ${error.message}`);
    }
}

async function scrollToElement(element, elementId) {
    let maxScrolls = 10;
    let scrolls = 0;

    while (!(await element.isDisplayed()) && scrolls < maxScrolls) {
        logToFile(`Scrolling to find element.....Attempt ${scrolls + 1}`);

        await browser.execute("mobile: scroll", {
            strategy: "accessibility id",
            selector: elementId,
            maxSwipes: 3,
        });

        await browser.pause(2000);
        scrolls++;
    }

    if (!(await element.isDisplayed())) {
        logToFile("Element found");
    } else {
        throw new Error ("Element not found after maximum scroll attempts");
    }
    
}

describe('Input text', () => {

    it('Click Views', async() => {
        logToFile("Starting 'Click Views' test");
        
        await handleANRDialogs();
        
        try {
        logToFile("Looking for Views element");
        const viewsElement = $('~Views');

        await scrollToElement(viewsElement, "Views");    

        logToFile("Clicking views");    
        await viewsElement.click();
        } catch (error) {
            logToFile("Error clicking views: " + error);

            const screenshotPath = "./screenshots/error_screenshot_views.png";
            await browser.saveScreenshot(screenshotPath);
            logToFile(`Screenshot saved: ${screenshotPath}`);

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

            const screenshotPath = "./screenshots/error_screenshot_auto_complete.png"; 
            await browser.saveScreenshot(screenshotPath);
            logToFile(`Screenshot saved: ${screenshotPath}`);

            throw error;
        }
        await browser.pause(5000);
    });

    after(() => {
        logToFile("Test suite finished");
    });

});