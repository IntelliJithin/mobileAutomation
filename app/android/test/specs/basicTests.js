import { $, browser } from "@wdio/globals";  
 
describe('Basic test', () => {  
    it('Click Content', async () => {  
        try {  
            const contentElement = await $('~Content');  
            await browser.pause(2500);  
            await browser.saveScreenshot('./screenshots/screen1.png');  
 
            if (await contentElement.isExisting()) {  
await contentElement.click();  
                console.log("Successfully clicked on 'Content' element.");  
            } else {  
                console.warn("WARNING: 'Content' element not found. Skipping click action.");  
                await browser.saveScreenshot('./screenshots/missing_element.png');  
            }  
 
            await browser.pause(2500);  
            await browser.saveScreenshot('./screenshots/screen2.png');  
 
        } catch (error) {  
            console.error("ERROR: An unexpected issue occurred:", error);  
            await browser.saveScreenshot('./screenshots/error_screen.png');  
            throw error;  
        }  
        
        await browser.pause(2500);  
    });  
});