import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class firstTab extends LightningElement {
    @api recordid;
    @api name;
    @api closedate;
    @api amount;
    @track isModalOpen = false;

    showToast() {
        const event = new ShowToastEvent({
            title: 'Updated',
            message: 'Opportunity updated',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }

    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
        
    submitDetails() {
        // to close modal set isModalOpen track value as false
        //Add your code to call apex method or do some processing

        if (this.template.querySelector('lightning-input').value === '') {
            this.isModalOpen = true;
            const event = new ShowToastEvent({
                title: 'Attention',
                message: 'You must fill the form',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
        } else {
            // Code for Another Action after clicking Next
            this.isModalOpen = false;
        }
    }
}
