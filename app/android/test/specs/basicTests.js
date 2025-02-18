import {$, browser} from "@wdio/globals";

describe('Input text', () => {
    it('Click Views', async() => {
        await $('~Views').click();
        await browser.pause(5000);
    });

    it('Click Auto Complete', async() => {
        await $('~Auto Complete').click();
        await browser.pause(5000);
    });

})