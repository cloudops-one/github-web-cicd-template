export interface ApiResponse<T = string> {
    data: T;
    status: number;
    statusText: string;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}