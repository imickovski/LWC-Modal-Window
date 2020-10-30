import { createElement } from 'lwc';
import TabsForm from 'c/tabsForm';
import { getRecord } from 'lightning/uiRecordApi';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const mockGetRecord = require('./data/getRecord.json');

const getRecordAdapter = registerLdsTestWireAdapter(getRecord);

describe('c-tabs-form', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing.
    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('Check number of lightning tabs', () => {
        const element = createElement('c-tabs-form', {
            is: TabsForm
        });
        document.body.appendChild(element);

        let lightningTabs = element.shadowRoot.querySelectorAll('lightning-tab').length

        expect(lightningTabs).toBe(2)
    });

    it('Check the label for the second lightning-tab', () => {
        const element = createElement('c-tabs-form', {
            is: TabsForm
        });
        document.body.appendChild(element);

        // Get the second Lightning Tab with utilizing power of CSS selector
        const secondLightningTab = element.shadowRoot.querySelector('lightning-tab:nth-child(2)')

        expect(secondLightningTab.label).toBe("Item Two")

    });

    it('renders Opportunity details', () => {
        const element = createElement('c-tabs-form', {
            is: TabsForm
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getRecordAdapter.emit(mockGetRecord);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return flushPromises().then(() => {
            // Select elements for validation
            const name = element.shadowRoot.querySelector('c-first-tab');
            expect(name.name).toBe(mockGetRecord.fields.Name.value);
            const closeDate = element.shadowRoot.querySelector('c-first-tab');
            expect(closeDate.closedate).toBe(mockGetRecord.fields.CloseDate.value);
            const amount = element.shadowRoot.querySelector('c-first-tab');
            expect(amount.amount).toBe(mockGetRecord.fields.Amount.value);
        });
    });
    
    it('is accessible when data is returned', () => {
        // Create element
        const element = createElement('c-tabs-form', {
            is: TabsForm
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getRecordAdapter.emit(mockGetRecord);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
