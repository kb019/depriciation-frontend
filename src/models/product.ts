
export interface ProductDetails{
invoiceDetails:  InvoiceDetails;
supplierDetails: SupplierDetails;
productDetails:  ProductDetail;
}

export interface InvoiceDetails {
invoiceNumber: string;
invoiceDate:   Date|null;
}

export interface ProductDetail {
productName:  string;
purchaseDate: Date|null;
quantity:     number|null;
price:        number|null;
cgst:         number|null;
sgst:         number|null;
}

export interface SupplierDetails {
supplierName:    string;
supplierAddress: string;
}

export interface AddProductResponse extends ProductDetails{
    id: string;
    created_at: string;
    updated_at: string;
}