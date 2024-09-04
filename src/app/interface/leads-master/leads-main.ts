export interface User {
  _id: string;
  name: string;
}
export interface BasicInformation {
  lastName: string;
  leadStatus: string;
  firstName: string;
  attitude: string;
  jobTitle: string;
  leadSource: string;
  companyName: string;
  industry: string;
  mobileNo: string;
  dateOfBirth: string;
  secondMobileNo: string;
  workPhoneNo: string;
  email: string;
  workFax: string;
  secondEmail: string;
  website: string;
  nric: string;
  reason: string;
  telesalesRemarks: string;
  payslipType: string;
  followUp: string;
  contactNumber: string;
  inquiryDate: string;
}

export interface AdditionalInformation {
  country: string;
  state: string;
  city: string;
  zip: string;
  street: string;
}

export interface DescriptionInformation {
  description: string;
}

export interface CustomInformation {
  typeOfLoan: string;
  payslipMonth: string;
  posOutDate: string;
  grossSalary: string;
  loanAmount: string;
  deductions: string;
  trackingInfo: string;
  netSalary: string;
  payslipYear: string;
}
export interface OwnerHistoryEntry {
  previousOwner: User;
  newOwner: User;
  changedBy: User;
  changeDate: Date;
}
export interface Lead {
  _id?: string;
  owner: string | { _id: string, name: string };
  ownerHistory: OwnerHistoryEntry[];
  basicInformation: BasicInformation;
  additionalInformation: AdditionalInformation;
  descriptionInformation: DescriptionInformation;
  customInformation: CustomInformation;
}
