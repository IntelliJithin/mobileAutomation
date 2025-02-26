import {$, browser} from "@wdio/globals";

describe('Input text', () => {
    it('Click Views', async() => {
        const viewsElement = $('~Views');
        await viewsElement.waitForExist({timeout:10000});
        await viewsElement.waitForDisplayed({timeout:10000});
        await viewsElement.click();
    });

    it('Click Auto Complete', async() => {
        const autoCompleteElement = $('~Auto Complete');
        await autoCompleteElement.waitForExist({timeout:10000});
        await autoCompleteElement.waitForDisplayed({timeout:10000});
        await autoCompleteElement.click();
    });

})