import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type {ApiError} from '../types/api';

interface UseExampleResult {
    data: string;
    loading: boolean;
    error: ApiError | null;
}

export const useExample = (): UseExampleResult => {
    const [data, setData] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                const result = await apiService.getExample();
                setData(result);
            } catch (err) {
                setError(err as ApiError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};