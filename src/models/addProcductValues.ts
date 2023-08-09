export interface AddProductValues {
    invoiceDetails: {
      number: string;
      date: Date | null;
    };
    supplierDetails: {
      name: string;
      address: string;
    };
    productDetails: {
      name: string;
      date: Date | null;
      quantity: string;
      price: string;
      cgst: string;
      sgst: string;
    };
  }