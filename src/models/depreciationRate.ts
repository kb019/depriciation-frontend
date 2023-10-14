export interface DepreciationRate {
    id:               string;
    created_at:       Date;
    updated_at:       Date;
    depYear:          number;
    depreciationRate: null | string;
}