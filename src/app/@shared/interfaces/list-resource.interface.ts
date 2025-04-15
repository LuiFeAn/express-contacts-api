

export interface IListResourceRequest<T> {
    page: number;
    limit: number;
    sort: keyof T;
    order: "asc" | "desc";
}

export interface IListResourceResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}

