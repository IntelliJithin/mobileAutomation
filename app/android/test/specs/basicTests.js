import {$, browser} from "@wdio/globals";
import fs from "fs";

function logToFile(message) {
    fs.appendFileSync("./test-log.txt", message + "\n");
    console.log(message);
}

logToFile("Test suite started");

async function handleANRDialogs() {
    try {
      let anrDetected = true;
      let anrCount = 1; // Counter for multiple ANRs
   
      // Loop to check for ANR dialogs and click "Wait" until no more ANRs are found
      while (anrDetected) {
        logToFile("Checking for ANR dialog...");
   
        const waitButton = $("~Wait");
        
        // If the ANR dialog appears, handle it
        if (await waitButton.isDisplayed()) {
          logToFile(`ANR detected! Clicking 'Wait' (ANR #${anrCount})...`);
   
          // Capture screenshot for each ANR dialog detected
          await browser.saveScreenshot(`./screenshots/ANR_screenshot_${anrCount}.png`);
          logToFile(`Screenshot saved: ./screenshots/ANR_screenshot_${anrCount}.png`);
   
          // Wait until the "Wait" button is clickable and click it
          await waitButton.waitForClickable();
          await waitButton.click();
          
          // Wait for the ANR dialog to disappear before continuing
          await waitButton.waitForDisplayed({ reverse: true, timeout: 10000 });  // Wait for up to 10 seconds for the dialog to disappear
   
          // Pause to allow for recovery from the ANR state
          await browser.pause(2000); // Adjust this duration as necessary
   
          anrCount++; // Increment the counter for the next ANR
        } else {
          anrDetected = false; // Exit loop if no ANR dialog is found
          logToFile("No ANR dialog detected.");
        }
      }
    } catch (error) {
      logToFile("Error handling ANR dialog: " + error.message);
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