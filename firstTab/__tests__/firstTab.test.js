import { createElement } from 'lwc';
import FirstTab from 'c/firstTab';

describe('c-first-tab', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // it('is Open Modal true?', () => {
    //     const element = new FirstTab();

    //     element.openModal();

    //     expect(element.isModalOpen).toBe(true);
    // });

    it('is OpenModal true', () => {
        const element = createElement('c-first-tab', {
            is: FirstTab
        });

        let isModalOpen = (element.isModalOpen);
         
        document.body.appendChild(element);

        let openModal = element.openModal = jest.fn().mockImplementation(()=>{
            element.isModalOpen = true;
            return element.isModalOpen;
        })

        // let template = element.shadowRoot.querySelector('template:nth-child(2)')

        expect(isModalOpen).toBe(openModal());
    });

    it('is Accessible', () => {
        const element = createElement('c-first-tab', {
            is: FirstTab
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
