export interface PaginatedResponse<T>{
    data:T[],
    meta:PaginationMeta
}

export interface PaginationMeta{
    page:number,
    take:number,
    itemCount:number,
    pageCount:number,
    hasPreviousPage:boolean,
    hasNextPage:boolean,
}