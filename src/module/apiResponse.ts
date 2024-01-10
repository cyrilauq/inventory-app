export interface ApiResponse<T> {
    code: number | undefined;
    data: T | unknown;
}