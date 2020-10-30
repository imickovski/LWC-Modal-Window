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
