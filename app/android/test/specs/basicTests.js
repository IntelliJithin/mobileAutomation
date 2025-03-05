import {$, browser} from "@wdio/globals";
import fs from "fs";

function logToFile(message) {
    fs.appendFileSync("./test-log.txt", message + "\n");
    console.log(message);
}

logToFile("Test suite started");

let anrMonitorActive = false;

async function startANRMonitor() {
    if (anrMonitorActive) return;
    anrMonitorActive = true;

    logToFile("ANR Monitor started");

    while (anrMonitorActive) {
        try{
            const waitButton = $('android=new UiSelector().resourceId("android:id/aerr_wait")');

            if (await waitButton.isDisplayed()) {
                logToFile ("ANR Detected, clicking Wait");
                const timestamp = new Date().toISOString().replace(/:/g, "-");
                await browser.saveScreenshot(`./screenshots/ANR_${timestamp}.png`);

                await waitButton.waitForClickable();
                await waitButton.click();
                await browser.pause(2000);

                logToFile("ANR cleared");
        }
    } catch (error) {
        logToFile("ANR monitor error")
    }
    await browser.pause(3000);
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

    beforeEach(async () => {
        await startANRMonitor();
    });

    afterEach(async () => {
        anrMonitorActive=false;
        logToFile("ANR monitor stopped");
    })

    it('Click Views', async() => {
        logToFile("Starting 'Click Views' test");
                
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