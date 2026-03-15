const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    console.error('VITE_API_URL is not defined!');
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error ${response.status}`);
    }
    return response.json();
}

export const apiService = {
    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse<T>(response);
    },

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse<T>(response);
    },
};
