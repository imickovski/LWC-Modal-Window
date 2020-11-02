import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class firstTab extends LightningElement {
    @api recordid;
    @api name;
    @api closedate;
    @api amount;
    @track isModalOpen = false;

    showToastSuccess() {
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

    
    showToastError() {
        const event = new ShowToastEvent({
            title: 'Attention',
            message: 'You must fill the form',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    submitDetails() {
        let firstLightningInput = this.template.querySelector('lightning-input').value;
        // to close modal set isModalOpen track value as false
        //Add your code in else statement to call apex method or do some processing
        if (firstLightningInput === '') {
            this.isModalOpen = true;
            this.showToastError();
        } else {
            // Code for Another Action after clicking Next
            this.isModalOpen = false;
        }
    }
}
