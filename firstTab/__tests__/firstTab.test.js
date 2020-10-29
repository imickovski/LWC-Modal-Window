import { createElement } from 'lwc';
import FirstTab from 'c/firstTab';

describe('c-first-tab', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
 
    it('Check if isModalOpen is false', () => {
        const element = createElement('c-first-tab', {
            is: FirstTab
        });
        document.body.appendChild(element);

        
        
        expect(element.isModalOpen).toBe(true);
    });
});