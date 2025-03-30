import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://192.168.105.153:3000/api",
    timeout: 10000, // Set a timeout to prevent hanging requests
    headers: {
        "Content-Type": "application/json"
    }
});

// Temporarily disable SSL verification for development (Remove in production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const postUserData = async (endpoint: string, data: any) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response;
    } catch (error: any) {
        console.error("POST request failed:", error?.message);
        return { error: true, message: error?.response?.data || "Failed to send data" };
    }
};

export const getData = async (endpoint: string) => {
    try {
        const response = await apiClient.get(endpoint);
        return response;
    } catch (error: any) {
        console.error("GET request failed:", error?.message);
        return { error: true, message: error?.response?.data || "Failed to fetch data" };
    }
};

export const updateUserData = async (endpoint: string, data: any) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response;
    } catch (error: any) {
        console.error("PUT request failed:", error?.message);
        return { error: true, message: error?.response?.data || "Failed to update data" };
    }
};

export const deleteUserData = async (endpoint: string) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response;
    } catch (error: any) {
        console.error("DELETE request failed:", error?.message);
        return { error: true, message: error?.response?.data || "Failed to delete data" };
    }
};

// Health check function
export const checkApiHealth = async () => {
    try {
        const response = await apiClient.get("/health", { timeout: 5000 });
        return { available: true, status: response.status };
    } catch (error: any) {
        console.error("API Health Check Failed:", error?.message);
        return { available: false, message: error?.response?.data || "API is unavailable" };
    }
};
