

export interface DepreciationRates {
    id:                   string;
    created_at:           Date;
    updated_at:           Date;
    productType:          string;
    depreciationItValues: DepreciationItValue[];
}

export interface DepreciationItValue {
    id:               string;
    created_at:       Date;
    updated_at:       Date;
    depYear:          number;
    depreciationRate: null;
}