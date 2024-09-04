export interface OpportunitiesData {
    basicInformation: {
      opportunityName: string;
      account: string;
      category: string;
      contact: string;
      amount: number;
      closeDate: string | Date;
      stage: string;
      probability: number;
      submitDateInternal: string | Date;
      submissionAmount: number;
      submissionDateHQ: string | Date;
      disbursementAmount: number;
      disbursementDateHQ: string | Date;
      companyType: string;
      posBackDate: string | Date;
      dateApplicationCancelled: string | Date;
      approvalDate: string | Date;
      adminRemarks: string;
      commRcvdDate: string | Date;
      nric: string;
      commPayDate: string | Date;
      typeOfLoan: string;
      chewqueNo: string;
      financeRemarks: string;
    };
    additionalInformation: {
      leadSource: string;
      nextStep: string;
    };
    descriptionInformation: {
      description: string;
    };
    customInformation: {
      posOutDate: string | Date;
      payslipType: string;
      posOutLoanAmount: number;
      contactNumber: string;
      posTrackingInfo: string;
      inquiryDate: string | Date;
    };
    _id: string;
    owner: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: number;
  }