import { $, browser } from "@wdio/globals";  
 
describe('Basic test', () => {  
    it('Click Content', async () => {  
        try {  
            const contentElement = await $('~Content');  
            await browser.pause(2500);  
 
            if (await contentElement.isExisting()) {  
                await contentElement.click();  
                console.log("Successfully clicked on 'Content' element.");  
            } else {  
                console.warn("WARNING: 'Content' element not found. Skipping click action.");  
            }  
 
            await browser.pause(2500);  
 
        } catch (error) {  
            console.error("ERROR: An unexpected issue occurred:", error);  
            throw error;  
        }  
        
        await browser.pause(2500);  
    });  
});