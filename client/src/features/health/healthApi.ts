import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function getHealthStatus(): Promise<{ status: string; message: string }> {
    const res = await axios.get(`${API_URL}/api/health`);
    if (!res) throw new Error('Failed to fetch health status');
    return res.data;
}
