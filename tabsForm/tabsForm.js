import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
const FIELDS = [NAME_FIELD, CLOSEDATE_FIELD, AMOUNT_FIELD];

export default class tabsForm extends LightningElement {
    @api recordId;
    @track isModalOpen = false;
    // APEX Wire Method to Property
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    opportunities;

    get name() {
        return this.opportunities.data.fields.Name.value;
    }

    get amount() {
        return this.opportunities.data.fields.Amount.value;
    }

    get closeDate() {
        return this.opportunities.data.fields.CloseDate.value;
    }

}

