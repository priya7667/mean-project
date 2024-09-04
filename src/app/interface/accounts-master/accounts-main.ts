


export interface BasicInformation {
    owner:String;
    accountName: string;
    phone: string;
    fax: string;
    accountType: string;
    website: string;
    parentAccount: string;
    email: string;
    transaction: string;
    rating: string;
    paymentTerm: string;
    contactNumber: string;
    nric: string;
    followUp:string;
    telesalesRemarks:string;
}
  
  export interface BillingAddress {
    country: string;
    state: string;
    city: string;
    zip: string;
    street: string;
  }

  export interface ShippingAddress
  {
    country: string;
    state: string;
    city: string;
    zip: string;
    street:string;

  }
  
  export interface DescriptionInformation {
    category: string;
  }
  
  export interface CustomInformation {
    typeOfLoan: string;
    payslipMonth: string;
    posOutDate: string;
    paySlipYear:string,
    loadAccount:string,
    grossSalary:string,
    trackingInfo:string,
    deductions:string,
    payslipType:string,
    netSalary:string
    
  }


  
  export interface Accounts {
    owner: any;
    _id?: string;
     basicInformation: BasicInformation;
     billingAddress:BillingAddress;
     shippingAddress:ShippingAddress;
     descriptionInformation: DescriptionInformation;
    customInformation: CustomInformation;


  }
  